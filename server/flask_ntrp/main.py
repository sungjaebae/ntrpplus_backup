import os
from flask import Flask, url_for, render_template, request
from middleware import PrefixMiddleware
from db import get_db

app = Flask(__name__, instance_relative_config=True)
app.debug = True
app.wsgi_app = PrefixMiddleware(app.wsgi_app, prefix='/ntrp')
app.config.from_mapping(
    SECRET_KEY='dev',
    DATABASE=os.path.join(app.instance_path, 'ntrpplus_flask.sqlite'),
)

@app.route('/')
def index():
    return render_template('test/index.html')


@app.route('/test')
def test():
    db = get_db()
    questions = db.execute(
        'SELECT *'
        ' FROM question q'
    ).fetchall()
    backhands = {}
    forehands = {}
    servenreturns = {}
    volleys = {}

    for question in questions:
        if question['type'] == 'forehand':
            forehands[question['type_idx']] = {
                'question': question['content'], 'duplicate': question['yn'], 'answer': []}
        if question['type'] == 'backhand':
            backhands[question['type_idx']] = {
                'question': question['content'], 'duplicate': question['yn'], 'answer': []}
        if question['type'] == 'servenreturn':
            servenreturns[question['type_idx']] = {
                'question': question['content'], 'duplicate': question['yn'], 'answer': []}
        if question['type'] == 'volley':
            volleys[question['type_idx']] = {
                'question': question['content'], 'duplicate': question['yn'], 'answer': []}

    answers = db.execute(
        'SELECT *'
        ' FROM answer a'
    )

    for answer in answers:
        if answer['type'] == 'forehand':
            forehands[answer['type_idx']]['answer'].append(
                {'id': answer['q_a_id'], 'answer': answer['content']})
        if answer['type'] == 'backhand':
            backhands[answer['type_idx']]['answer'].append(
                {'id': answer['q_a_id'], 'answer': answer['content']})
        if answer['type'] == 'servenreturn':
            servenreturns[answer['type_idx']]['answer'].append(
                {'id': answer['q_a_id'], 'answer': answer['content']})
        if answer['type'] == 'volley':
            volleys[answer['type_idx']]['answer'].append(
                {'id': answer['q_a_id'], 'answer': answer['content']})

    return render_template('test/test.html', backhands=backhands, forehands=forehands, servenreturns=servenreturns, volleys=volleys)


@app.route('/result', methods=['POST', 'GET'])
def result():
    if request.method == 'POST':
        result = {}
        questions = {}
        db = get_db()
        querys = db.execute(
            'SELECT *'
            ' FROM answer a'
        ).fetchall()
        for query in querys:
            questions[f"{query['type']}_{query['type_idx']}_{query['q_a_id']}"] = query['score']
        result = request.form
        backhand_answers = []
        forehand_answers = []
        servenreturn_answers = []
        volley_answers = []

        for q in request.form.lists():
            if q[0].startswith('forehand'):
                forehand_answers.append(q)
            if q[0].startswith('backhand'):
                backhand_answers.append(q)
            if q[0].startswith('servenreturn'):
                servenreturn_answers.append(q)
            if q[0].startswith('volley'):
                volley_answers.append(q)

        forehand_result = 1.0
        backhand_result = 1.0
        servenreturn_result = 1.0
        volley_result = 1.0

        # 포핸드 검사 결과 측정
        forehand_steps = {2: 2, 5: 3.5, 6: 4, 7: 4.5}
        for idx in range(len(forehand_answers)):
            for i in forehand_answers[idx][1]:
                question_key = f'{forehand_answers[idx][0]}_{i}'
                forehand_result += questions[question_key]

            if (idx + 1) in forehand_steps and forehand_steps[idx + 1] > forehand_result:
                break
            if (idx + 1) in forehand_steps and forehand_steps[idx + 1] < forehand_result:
                forehand_result = forehand_steps[idx + 1]

        # 백핸드 검사 결과 측정
        backhand_steps = {2: 2, 5: 3.5, 6: 4, 7: 4.5}
        for idx in range(len(backhand_answers)):
            for i in backhand_answers[idx][1]:
                question_key = f'{backhand_answers[idx][0]}_{i}'
                backhand_result += questions[question_key]

            if (idx + 1) in backhand_steps and backhand_steps[idx + 1] > backhand_result:
                break
            if (idx + 1) in backhand_steps and backhand_steps[idx + 1] < backhand_result:
                backhand_result = backhand_steps[idx + 1]

        # # 서브앤리턴 검사 결과 측정
        servenreturn_steps = {2: 2, 5: 3, 7: 3.8, 8: 4.5}
        for idx in range(len(servenreturn_answers)):
            for i in servenreturn_answers[idx][1]:
                question_key = f'{servenreturn_answers[idx][0]}_{i}'
                servenreturn_result += questions[question_key]

            if (idx + 1) in servenreturn_steps and servenreturn_steps[idx + 1] > servenreturn_result:
                break
            if (idx + 1) in servenreturn_steps and servenreturn_steps[idx + 1] < servenreturn_result:
                servenreturn_result = servenreturn_steps[idx + 1]

        # # 발리 검사 결과 측정
        # volley_steps = {2: 1.5, 5: 2, 7: 2.5,
        #                 10: 3, 12: 3.5, 14: 4, 16: 4.5, 18: 5}
        # for idx in range(len(volley_answers)):
        #     if questions[volley_answers[idx][0]][0] == volley_answers[idx][1]:
        #         volley_result += questions[volley_answers[idx][0]][1]
        #     if (idx + 1) in volley_steps and volley_steps[idx + 1] > volley_result:
        #         break
        #     if (idx + 1) in volley_steps and volley_steps[idx + 1] < volley_result:
        #         volley_result = volley_steps[idx + 1]

        ntrp = round(((forehand_result + backhand_result +
                     servenreturn_result + volley_result) / 4), 2)
        result_query_condition = 1
        result_image_file = 'result_1.png'
        kakao_share_image_file = 'ntrpplus_kakao_share_1.png'
        if ntrp > 1.5 and ntrp <= 2.0:
            result_query_condition = 1.5
            result_image_file = 'result_1.png'
            kakao_share_image_file = 'ntrpplus_kakao_share_1.png'
        if ntrp > 2.0 and ntrp <= 2.5:
            result_query_condition = 2
            result_image_file = 'result_2.png'
            kakao_share_image_file = 'ntrpplus_kakao_share_2.png'
        if ntrp > 2.5 and ntrp <= 3.0:
            result_query_condition = 2.5
            result_image_file = 'result_3.png'
            kakao_share_image_file = 'ntrpplus_kakao_share_3.png'
        if ntrp > 3.0 and ntrp <= 3.5:
            result_query_condition = 3
            result_image_file = 'result_4.png'
            kakao_share_image_file = 'ntrpplus_kakao_share_4.png'
        if ntrp > 3.5 and ntrp <= 4.0:
            result_query_condition = 3.5
            result_image_file = 'result_5.png'
            kakao_share_image_file = 'ntrpplus_kakao_share_5.png'
        if ntrp > 4.0 and ntrp <= 4.5:
            result_query_condition = 4
            result_image_file = 'result_6.png'
            kakao_share_image_file = 'ntrpplus_kakao_share_6.png'
        if ntrp > 4.5 and ntrp <= 5.0:
            result_query_condition = 4.5
            result_image_file = 'result_7.png'
            kakao_share_image_file = 'ntrpplus_kakao_share_7.png'

        query = db.execute(
            'SELECT *'
            ' FROM result r'
            f' WHERE score = {result_query_condition}'
        ).fetchone()

        result = {'forehand': round(forehand_result, 1), 'backhand': round(backhand_result, 1),
                  'servenreturn': round(servenreturn_result, 1), 'volley': round(volley_result, 1),
                  'ntrp': ntrp, 'ntrp_content': query[0], 'character_name': query[3], 'character_description': query[4], 'kakao_share_image': kakao_share_image_file, 'resultimage': result_image_file}

        return render_template('test/result.html', result=result)


if __name__ == '__main__':
    app.run('0.0.0.0', 80)
