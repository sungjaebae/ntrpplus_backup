import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
  await makeAnswer()
  await makeQuestion()
  await makeResult()
  await makeBobAndAlice()
}
async function makeResult() {
  const result_ids = Array.from({ length: 8 }, (v, k) => k + 1)
  const contents = [
    '테니스에 흥미를 느껴 이제 막 시작했어요!',
    '통통 튀는 테니스공,, 언제 어떻게 쳐야하는지도 아직 감이 안잡혀요ㅜㅜ',
    '아직 테니스에 대한 경험이 부족하고 공을 넘기기에 급급해요.',
    '어떤 자세로 치는지 알고 있지만 아직 익숙하지 않아요',
    '조금씩 상대와 랠리를 할 수 있어요',
    '랠리를 할 때 백핸드로 날아오는 공을 안정적으로 치지 못해요',
    '경기를 할 때, 기본 위치에는 익숙하지만 자주 정위치에서 벗어나요',
    '느린 속도의 랠리를 지속할 수 있으나 커버할 수 있는 거리가 짧아요',
    '복식 경기를 할 때, 처음 위치에서 그대로 있어요',
    '일반적인 속도의 공에 대해 꾸준히 랠리를 할 수 있어요',
    '복식을 할 때 대부분, 한명은 전위, 한명은 후위의 형태에요',
    '후위에 있다가 지시를 들을 경우 네트로 대쉬를 하긴 하지만, 제대로 실행하지는 못하는 상태에요',
    '일반적은 속도의 공에 대해 방향 조절을 하면서 꾸준히 칠 수 있어요',
    '코트 커버 범위가 넓어요',
    '복식에서는 기회가 있으면 네트로 나가요',
    '일반적인 공에 대하여 원하는 방향과 깊이로 믿을만한 스트로크를 보여줘요',
    '아직까지 뛰어난 확률 테니스를 구사하지는 못해요',
    '아직까지는 랠리에서인내심이 부족해서 점수를 잃는 경우가 있어요',
    '공의 스피드와 회전을 효과적으로 이용하여 공의 깊이를 잘 조절해요',
    '어려운 공에 대해서 가끔 멋진 샷으로 응수할 수 있어요.',
    '일반적인 속도의 공에 대해서는 공격적으로 받아쳐요',
    '의도적으로 다양한 스타일의 게임을 펼쳐요.',
    '좀 더 빠르게 공을 치며, 약한 부분의 커버에 능합니다',
    '상대방에 따라서 게임 운영방식을 변화시키기 시작하며, 복식에서는 주로 공격적인 네트 플레이를 펼쳐요',
    '상황에 대한 예측력이 뛰어나며, 자신의 페이스를 조절하기 시작합니다.',
    '대부분, 멋진 샷을 구사하고, 게임에서 큰 비중을 차지해요',
    '상대방에 따라 게임 운영을 바꿀 수 있으며, 이 등급의 선수는 게임으로 말하자면 확률 테니스를 해요',
    '복식에서 탄탄한 팀웍을 자랑해요',
  ]
  const scores = [1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5]
  const character_names = [
    '테니스공 테도르',
    '테니스공 테도르',
    '테생아 테도르',
    '테린이 테도르',
    '테소년 테도르',
    '테학생 테도르',
    '테학원생 테도르',
    '테교수 테도르',
  ]
  const character_descriptions = [
    `나는 테니스공이 아니야!
    테도르는 연두색 털 색상으로 테니스공으로 오해 받곤 해요.
    그러면서 테니스에 관심이 생긴 테도르!
    테도르도 테니스를 즐길 수 있을 때가 올까요?`,
    `나는 테니스공이 아니야!
    테도르는 연두색 털 색상으로 테니스공으로 오해 받곤 해요.
    그러면서 테니스에 관심이 생긴 테도르!
    테도르도 테니스를 즐길 수 있을 때가 올까요?`,
    `나도 테니스를 잘 하고 싶어!
    어린 시절엔 두 다리로 설 힘이 없었던 테도르!
    테니스채를 쥘 수 있는 것만이 작은 위안이었습니다.
    테도르는 언제쯤 상대방과 게임할 수 있을까요?`,
    `나도 게임에서 이기고 싶어!
    테니스공을 받아 치는 순간 만큼은 몸을 일으킬 수 있게 된 테도르!
    하지만 상대방과의 게임을 이기기에는 아직도 한참 부족한데요,
    테도르에게 각성이 필요할 지도 모르겠어요, 테도르를 응원해주세요!`,
    `난 한발짝 더 나아갈 테야!
    열심히 근력운동을 한 덕분에 두 손으로 자유롭게 테니스채를 휘두르는 테도르!
    어렸을 때부터 테니스공을 갖고 놀아서 그런지
    뛰어난 센스로 빠르게 성장하고 있는 테도르. 곧 경기장에서 볼 지도 몰라요!`,
    `프로 선수가 코 앞이야!
    테도르는 엄청난 수련을 걸쳐 결국 테니스장에서 일인자가 되었지요!
    현재는 투핸드 기술을 양손으로 능수능란하게 하여 포핸드라고 불리는 테도르!
    테도르와 함께 테니스를 향한 열정을 불태워 보아요!`,
    `테니스에 대해 어떻게 생각하지?
    테도르는 테니스장에서 코치로 불리고 있어요.
    테니스에 대해 깨달음을 얻어, 많은 사람들에게 가르쳐주곤 하거든요.
    테도르는 모든 사람들이 테니스를 즐기는 것이 꿈이랍니다!`,
    `테니스를 할 수 있어서 정말 행복해!
    테도르는 테니스장을 벗어나 테니스 대회에서까지 각종 상을 휩쓸었어요.
    이제는 모두가 테도르를 인정하고 있어요!
    테도르에게 이제는 테니스가 없는 삶은 상상할 수 없어요!`,
  ]
  for (let i = 0; i < result_ids.length; i++) {
    const result = await prisma.result.upsert({
      where: { result_id: result_ids[i] },
      update: {},
      create: {
        content: contents[i],
        score: scores[i],
        character_name: character_names[i],
        character_description: character_descriptions[i],
      },
    })
  }
}
async function makeQuestion() {
  const question_ids = Array.from({ length: 29 }, (v, k) => k + 1)
  const contents = [
    '포핸드 그립 잡는 법을 알고 있어요',
    '포핸드 기본 자세를 어느 정도 알고 있나요?',
    '비슷한 실력의 상대와 랠리를 평균 몇 회 정도 하나요?',
    '원하는 방향으로 포핸드를 칠 때 성공률은 어떻게 되나요?',
    '포핸드로 아래 기술 중 70% 이상 성공 시킬 수 있는 항목을 골라주세요(중복 허용, 없으면 넘어가주세요)',
    '아래 선택지 중 성공률 70% 인 항목을 골라주세요(중복 허용, 없으면 넘어가주세요)',
    '아래 상황에서 안정적으로 칠 수 있는 항목을 골라주세요(성공률 70%)(중복 허용, 없으면 넘어가주세요)',
    '백핸드 그립 잡는 법을 알고 있어요',
    '백핸드 기본 자세를 어느 정도 알고 있나요?',
    '비슷한 실력의 상대와 랠리를 평균 몇 회 정도 하나요?',
    '원하는 방향으로 백핸드를 칠 때 성공률은 어떻게 되나요?',
    '백핸드로 아래 기술 중 70% 이상 성공 시킬 수 있는 항목을 골라주세요(중복 허용, 없으면 넘어가주세요)',
    '아래 선택지 중 성공률 70% 인 항목을 골라주세요(중복 허용, 없으면 넘어가주세요)',
    '아래 상황에서 안정적으로 칠 수 있는 항목을 골라주세요(성공률 70%)(중복 허용, 없으면 넘어가주세요)',
    '서브를 할 때 그립을 알고 있어요',
    '서브 기본 자세를 어느 정도 알고 있나요?',
    '세컨 서브의 성공률이 어떻게 되나요?',
    '퍼스트서브 성공률이 어떻게 되나요?',
    '비슷한 상대와 경기를 할 때, 리턴 성공률이 어떻게 되나요?',
    '퍼스트 서브를 할 때, 원하는 방향으로 넣으려 하나요?',
    '비슷한 상대의 서브를 리턴할 때, 원하는 방향으로 리턴을 하나요? 그렇다면 성공률은 어떻게 되나요?',
    '경기에서 세컨 서브를 할 때, 원하는 방향으로 넣으려 하나요? 그렇다면 성공률은 어떻게 되나요?',
    '포핸드 발리 자세를 몰라요',
    '포핸드 발리 그립을 어떻게 잡는지 몰라요',
    '포핸드 발리로 공을 칠 때, 제대로 못 맞춰요',
    '백핸드 발리 자세를 몰라요',
    '백핸드 발리 그립을 어떻게 잡는지 몰라요',
    '복식 경기를 할 때, 네트에 서 있는 것이 익숙하지 않아요',
    '백핸드 쪽으로 오는 발리도 포핸드로 치고는 해요',
  ]
  const types = [
    'forehand',
    'forehand',
    'forehand',
    'forehand',
    'forehand',
    'forehand',
    'forehand',
    'backhand',
    'backhand',
    'backhand',
    'backhand',
    'backhand',
    'backhand',
    'backhand',
    'servenreturn',
    'servenreturn',
    'servenreturn',
    'servenreturn',
    'servenreturn',
    'servenreturn',
    'servenreturn',
    'servenreturn',
    'volley',
    'volley',
    'volley',
    'volley',
    'volley',
    'volley',
    'volley',
  ]
  const type_idxs = [
    1, 2, 3, 4, 5, 6, 7, 1, 2, 3, 4, 5, 6, 7, 1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7,
  ]
  const scores = [
    0.3, 0.2, 0.5, 0.3, 0.2, 0.3, 0.2, 0.3, 0.2, 0.5, 0.3, 0.2, 0.3, 0.2, 0.2, 0.2, 0.1, 0.3, 0.2,
    0.3, 0.2, 0.0, 0.3, 0.2, 0.2, 0.2, 0.1, 0.3, 0.2,
  ]
  const yns = [
    'N',
    'N',
    'N',
    'N',
    'Y',
    'Y',
    'Y',
    'N',
    'N',
    'N',
    'N',
    'Y',
    'Y',
    'Y',
    'N',
    'N',
    'N',
    'N',
    'N',
    'N',
    'N',
    'N',
    'N',
    'N',
    'N',
    'N',
    'N',
    'N',
    'N',
  ]
  for (let i = 0; i < question_ids.length; i++) {
    const question = await prisma.question.upsert({
      where: { question_id: question_ids[i] },
      update: {},
      create: {
        content: contents[i],
        type: types[i],
        type_idx: type_idxs[i],
        score: scores[i],
        yn: yns[i],
      },
    })
  }
}
async function makeAnswer() {
  const answer_ids = Array.from({ length: 68 }, (v, k) => k + 1)
  const contents = [
    '    어떻게 잡는지 알고 있어요',
    '배운적이 없어서 막 잡고 있어요',
    '배운 적이 없어서 몰라요',
    '자세를 알고 있지만 칠 때 엉성해요',
    '일정한 자세로 쳐요',
    '10번 이상',
    '6번 이상',
    '4번 이상',
    '4번 미만',
    '90% 이상',
    '70% 이상',
    '70% 미만',
    '로브',
    '슬라이스',
    '드롭',
    '의도적으로 상대 베이스 라인 근처로 깊숙하게  공을 보내려 해요',
    '높은 공을 원하는 곳으로 칠 수 있어요',
    '베이스 라인 근처로 깊숙이 떨어지는 공을 원하는 곳으로 쳐요',
    '사이드로 빠지는 공을 상대 베이스 라인으로 보낼 수 있어요',
    '짧게 오는 공을 상대 베이스 라인으로 깊이 보낼 수 있어요',
    '어떻게 잡는지 알고 있어요',
    '배운적이 없어서 막 잡고 있어요',
    '배운 적이 없어서 몰라요',
    '자세를 알고 있지만 칠 때 엉성해요',
    '일정한 자세로 쳐요',
    '10번 이상',
    '6번 이상',
    '4번 이상',
    '4번 미만',
    '90% 이상',
    '70% 이상',
    '70% 미만',
    '로브',
    '슬라이스',
    '드롭',
    '의도적으로 상대 베이스 라인 근처로 깊숙하게  공을 보내려 해요',
    '높은 공을 원하는 곳으로 칠 수 있어요',
    '베이스 라인 근처로 깊숙이 떨어지는 공을 원하는 곳으로 쳐요',
    '사이드로 빠지는 공을 상대 베이스 라인으로 보낼 수 있어요',
    '짧게 오는 공을 상대 베이스 라인으로 깊이 보낼 수 있어요',
    '네',
    '아니오',
    '네',
    '아니오',
    '네',
    '아니오',
    '네',
    '아니오',
    '네',
    '아니오',
    '네',
    '아니오',
    '네',
    '아니오',
    '네',
    '아니오',
    '네',
    '아니오',
    '네',
    '아니오',
    '네',
    '아니오',
    '네',
    '아니오',
    '네',
    '아니오',
    '네',
    '아니오',
  ]
  const q_a_ids = [
    1, 2, 1, 2, 3, 1, 2, 3, 4, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 1, 2, 1, 2, 3, 1, 2, 3, 4, 1, 2, 3,
    1, 2, 3, 1, 2, 3, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2,
    1, 2, 1, 2,
  ]
  const scores = [
    0.2, 0.0, 0.0, 0.3, 0.8, 0.8, 0.5, 0.3, 0.0, 0.5, 0.2, 0.0, 0.1, 0.1, 0.1, 0.2, 0.2, 0.1, 0.3,
    0.2, 0.2, 0.0, 0.0, 0.3, 0.8, 0.8, 0.5, 0.3, 0.0, 0.5, 0.2, 0.0, 0.1, 0.1, 0.1, 0.2, 0.2, 0.1,
    0.3, 0.2, 0.1, 0.0, 0.1, 0.0, 0.1, 0.0, 0.1, 0.0, 0.1, 0.0, 0.1, 0.0, 0.1, 0.0, 0.1, 0.0, 0.1,
    0.0, 0.1, 0.0, 0.1, 0.0, 0.1, 0.0, 0.1, 0.0, 0.1, 0.0,
  ]
  const type_idxs = [
    1, 1, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 6, 7, 7, 1, 1, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4,
    5, 5, 5, 6, 6, 6, 7, 7, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5,
    6, 6, 7, 7,
  ]
  const types = [
    'forehand',
    'forehand',
    'forehand',
    'forehand',
    'forehand',
    'forehand',
    'forehand',
    'forehand',
    'forehand',
    'forehand',
    'forehand',
    'forehand',
    'forehand',
    'forehand',
    'forehand',
    'forehand',
    'forehand',
    'forehand',
    'forehand',
    'forehand',
    'backhand',
    'backhand',
    'backhand',
    'backhand',
    'backhand',
    'backhand',
    'backhand',
    'backhand',
    'backhand',
    'backhand',
    'backhand',
    'backhand',
    'backhand',
    'backhand',
    'backhand',
    'backhand',
    'backhand',
    'backhand',
    'backhand',
    'backhand',
    'servenreturn',
    'servenreturn',
    'servenreturn',
    'servenreturn',
    'servenreturn',
    'servenreturn',
    'servenreturn',
    'servenreturn',
    'servenreturn',
    'servenreturn',
    'servenreturn',
    'servenreturn',
    'servenreturn',
    'servenreturn',
    'volley',
    'volley',
    'volley',
    'volley',
    'volley',
    'volley',
    'volley',
    'volley',
    'volley',
    'volley',
    'volley',
    'volley',
    'volley',
    'volley',
  ]
  for (let i = 0; i < answer_ids.length; i++) {
    const answer = await prisma.answer.upsert({
      where: { answer_id: answer_ids[i] },
      update: {},
      create: {
        content: contents[i],
        q_a_id: q_a_ids[i],
        score: scores[i],
        type_idx: type_idxs[i],
        type: types[i],
      },
    })
  }
}
async function makeBobAndAlice() {
  const player = await prisma.user.upsert({
    where: { id: '04ac978c-2b93-4007-8691-9da35fb8dd72' },
    update: {},
    create: {
      nickname: '시드 데이터 플레이어',
      id: '04ac978c-2b93-4007-8691-9da35fb8dd72',
    },
  })
  const panel = await prisma.user.upsert({
    where: { id: '5ed7c0bb-c808-4482-b7b0-1236fe707324' },
    update: {},
    create: {
      nickname: '시드 데이터 패널',
      id: '5ed7c0bb-c808-4482-b7b0-1236fe707324',
    },
  })
  const testResult = await prisma.testResult.upsert({
    where: { id: '25a80f8f-9b2a-440d-8f4b-2f9f18280c24' },
    update: {},
    create: { playerId: player.id, panelId: panel.id, id: '25a80f8f-9b2a-440d-8f4b-2f9f18280c24' },
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
