# 베이스 이미지
FROM nginx:stable-alpine

# wait-for 스크립트 복사
COPY wait-for.sh ./
RUN chmod 755 ./wait-for.sh
RUN sed -i 's/\r$//' ./wait-for.sh


# nc(netcat) 커맨드 설치
RUN apk add netcat-openbsd



######################################################
#FROM adoptopenjdk/openjdk11
#WORKDIR usr/src/app
#ARG JAR_FILE=build/libs/GoGetter-0.0.1-SNAPSHOT.jar
#COPY ${JAR_FILE} app.jar
#ENTRYPOINT ["java","-jar","/usr/src/app/app.jar"]
