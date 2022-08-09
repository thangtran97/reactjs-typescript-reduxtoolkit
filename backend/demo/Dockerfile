FROM openjdk:8u342-slim as TEMP_BUILD_IMAGE
ENV APP_HOME=/usr/app
WORKDIR $APP_HOME
COPY . .
RUN chmod +x ./mvnw
RUN ./mvnw package -DskipTests

FROM openjdk:8u342-jre-slim
ENV APP_HOME=/usr/app
ENV ARTIFACT_NAME=demo-0.0.1-SNAPSHOT.jar
COPY --from=TEMP_BUILD_IMAGE $APP_HOME/target/$ARTIFACT_NAME app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
