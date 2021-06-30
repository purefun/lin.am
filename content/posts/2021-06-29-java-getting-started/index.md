---
title: Java 上手指南
topic: Java
date: 2021-06-29
published: true
---

## 安装 JDK

- x86: [adoptopenjdk.net](https://adoptopenjdk.net/releases.html)
- arm64: [azul.com](https://www.azul.com/downloads/?os=macos&architecture=arm-64-bit&package=jdk)

检查安装：

```sh title="shell"
java -version
```

类似输出：

```
openjdk version "11.0.11" 2021-04-20 LTS
OpenJDK Runtime Environment Zulu11.48+21-CA (build 11.0.11+9-LTS)
OpenJDK 64-Bit Server VM Zulu11.48+21-CA (build 11.0.11+9-LTS, mixed mode)
```

设置 `JAVA_HOME` 环境变量：

```sh title="shell"
export JAVA_HOME=$(/usr/libexec/java_home)
```

检查 `JAVA_HOME`：

```sh title="shell"
echo $JAVA_HOME
```

类似输出：

```sh title="stdout"
/Library/Java/JavaVirtualMachines/zulu-11.jdk/Contents/Home
```

## 运行 Hello World

```java title="Hello.java"
public class Hello {
  public static void main(String[] args) {
    System.out.println("Hello World");
  }
}
```

编译：

```sh title="shell"
javac Hello.java
```

默认情况下，`javac` 会在同目录下生成 `Hello.class` 文件。

运行：`$ java Hello`

```txt title="stdout"
Hello World
```

## 构建工具

当前主要有三个 Java 项目的构建工具：Ant, Maven 和 Gradle。Ant 在早起被广泛采用，
但只提供编译过程。Gradle 较 Maven 是一个新的构建工具。还未被广泛使接受。Maven 是
目前最主流的选择。

### 安装 Maven

```sh title="shell"
brew install maven
```

检查 Maven 命令：

```sh title="shell"
mvn -v
```

类似输出：

```sh title="stdout"
Apache Maven 3.8.1 (05c21c65bdfed0f71a2f2ada8b84da59348c4c5d)
Maven home: /usr/local/Cellar/maven/3.8.1/libexec
Java version: 11.0.11, vendor: Azul Systems, Inc., runtime: /Library/Java/JavaVirtualMachines/zulu-11.jdk/Contents/Home
Default locale: en_US, platform encoding: UTF-8
OS name: "mac os x", version: "11.4", arch: "aarch64", family: "mac"
```

### 创建项目

通过执行 `archetype:generate` 命令以交互式地输入必要的参数：

1. archetype number
  archetype 是 Maven 的模版概念，默认是 1797:
  `org.apache.maven.archetypes: maven-archetype-quickstart (An archetype which contains a sample Maven project.)`

2. archetype version

3. groupId: com.example

4. artifactId: quickstart

5. version: 1.0-SNAPSHOT

6. package: com.example.quickstart

执行后将生成文件目录：

```
quickstart
├── pom.xml
└── src
    ├── main
    │   └── java
    │       └── com
    │           └── example
    │               └── quickstart
    │                   └── App.java
    └── test
        └── java
            └── com
                └── example
                    └── quickstart
                        └── AppTest.java

11 directories, 3 files
```

非交互式命令生成项目：

```sh title="shell"
mvn archetype:generate \
  -D interactiveMode=false \
  -D archetypeArtifactId=maven-archetype-quickstart \
  -D archetypeVersion=1.4 \
  -D groupId=com.example \
  -D artifactId=quickstart \
  -D package=com.example.quickstart
```

### 打包运行

```sh title="shell"
mvn pacakge
```

```sh title="shell"
java -cp target/quickstart-1.0-SNAPSHOT.jar com.example.quickstart.App
```

上述直接使用 java 命令运行在代码有依赖的情况下将无法找到相应的依赖。在 `pom.xml`
中加入 `exec.mainClass`：

```xml {5} title="pom.xml"
<properties>
  <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
  <maven.compiler.source>1.8</maven.compiler.source>
  <maven.compiler.target>1.8</maven.compiler.target>
  <exec.mainClass>com.example.quickstart.App</exec.mainClass>
</properties>
```
通过 Maven 运行程序：

```sh title="shell"
mvn compile exec:java
```

### SNAPSHOT

Maven 把依赖的 jar 包都缓存到 `$HOME/.m2/repository/` 目录下。如果 `pom.xml` 中
的依赖的版本号以 `-SNAPSHOT` 结尾，那么每一次 `mvn install/pacakge/deploy` 都会
从远程仓库中拉取该依赖。

## Spring

在 Java 体系中，Spring 使用极广。在 Web 服务应用方面几乎是不二之选。Spring Core
是整个 Spring 的核心，在此基础上提供了：

1. Spring Boot
2. Spring Data
3. Spring Cloud
4. Spring Cloud Data Flow
5. Spring Security
6. Spring Session
7. Spring Integration
8. Spring HATEOAS
9. Spring REST Docs
10. Spring Batch
11. Spring AMQP
12. Spring CredHub
13. Spring Flo
14. Spring for Apache Kafka
15. Spring LDAP
16. Spring Roo
17. Spring Shell
18. Spring Statemachine
19. Spring Vault
20. Spring Web Flow
21. Spring Web Services

### Spring Core

#### 依赖注入

Spring Core 提供了两种依赖注入方式：XML 和 注解(Annotation)。Spring 3 开始提供的
注解已经成为依赖注入配置的主要方式。

注解注入方式使用 `@Component` 或 `@Service` 实现类的注册，`@Autowired` 完成属性的赋值。

`Autowired` 可以用在属性、setter 和构造函数中。

```java
// property

@Component
public class FooService {
    @Autowired
    private FooFormatter fooFormatter;
}

// setter

@Component
public class FooService {
    private FooFormatter fooFormatter;
    @Autowired
    public void setFooFormatter(FooFormatter fooFormatter) {
        this.fooFormatter = fooFormatter;
    }
}

// constructor

@Component
public class FooService {
    private FooFormatter fooFormatter;
    @Autowired
    public FooService(FooFormatter fooFormatter) {
        this.fooFormatter = fooFormatter;
    }
}
```

相关注解所在的 Artifacts:
- spring-context: @Component, @Service, @ComponentScan
- spring-beans: @Autowired

<details>
  <summary>XML 依赖注入代码</summary>

```txt {10-11,13}
quickstart
├── pom.xml
└── src
    └── main
        ├── java
        │   └── com
        │       └── example
        │           └── quickstart
        │               ├── App.java
        │               ├── HelloPrinter.java
        │               └── HelloService.java
        └── resources
            └── application-context.xml

7 directories, 5 files
```

```xml {5-8} title="application-context.xml"
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">
  <bean id="helloService" class="com.example.quickstart.HelloService" />
  <bean id="helloPrinter" class="com.example.quickstart.HelloPrinter">
    <property name="helloService" ref="helloService" />
  </bean>
</beans>
```

```java {6-14} title="HelloPrinter.java"
package com.example.quickstart;


public class HelloPrinter {

  // the property is mapped in xml
  private HelloService helloService;

  public HelloService getHelloService() {
    return helloService;
  }

  public void setHelloService(HelloService helloService) {
    this.helloService = helloService;
  }

  public void printHello() {
    System.out.println(helloService.hello());
  }
}
```

```java title="HelloService.java"
package com.example.quickstart;

public class HelloService {

  public String hello() {
    return "Hello World!";
  }
}
```

```xml {6,10-15} title="pom.xml"
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
  <!-- ... -->
  <properties>
    <!-- ... -->
    <exec.mainClass>com.example.quickstart.App</exec.mainClass>
  </properties>

  <dependencies>
    <!-- https://mvnrepository.com/artifact/org.springframework/spring-context -->
    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-context</artifactId>
      <version>5.3.8</version>
    </dependency>
  </dependencies>

</project>

```

```java {8-9} title="App.java"
package com.example.quickstart;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class App {
  public static void main(String[] args) {
    ClassPathXmlApplicationContext ctx = new ClassPathXmlApplicationContext("application-context.xml");
    HelloPrinter printer = ctx.getBean(HelloPrinter.class);
    printer.printHello();
  }
}
```
</details>

<details>
  <summary>注解依赖注入代码</summary>

  使用 `@Component` 或 `@Service` 实现类的注册，`@Autowired` 完成属性的赋值。它们所在的
  Artifacts 分别是 `spring-context` 和 `spring-beans` 中。

  ```txt {10-11}
  quickstart
  ├── pom.xml
  └── src
      └── main
          └── java
              └── com
                  └── example
                      └── quickstart
                          ├── App.java
                          ├── HelloPrinter.java
                          └── HelloService.java

  5 directories, 4 files
  ```

  ```java {6,9} title="HelloPrinter.java"
  package com.example.quickstart;

  import org.springframework.beans.factory.annotation.Autowired;
  import org.springframework.stereotype.Component;

  @Component
  public class HelloPrinter {

    @Autowired
    private HelloService helloService;

    public void printHello() {
      System.out.println(helloService.hello());
    }
  }
  ```

  ```java {5} title="HelloService.java"
  package com.example.quickstart;

  import org.springframework.stereotype.Service;

  @Service
  public class HelloService {

    public String hello() {
      return "Hello World!";
    }
  }
  ```

  ```xml {6,10-22} title="pom.xml"
  <project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <!-- ... -->
    <properties>
      <!-- ... -->
      <exec.mainClass>com.example.quickstart.App</exec.mainClass>
    </properties>

    <dependencies>
      <!-- https://mvnrepository.com/artifact/org.springframework/spring-context -->
      <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-context</artifactId>
        <version>5.3.8</version>
      </dependency>

      <!-- https://mvnrepository.com/artifact/org.springframework/spring-beans -->
      <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-beans</artifactId>
        <version>5.3.8</version>
      </dependency>

    </dependencies>


  </project>
  ```

  ```java {7,10-11} title="App.java"
  package com.example.quickstart;

  import org.springframework.context.ApplicationContext;
  import org.springframework.context.annotation.AnnotationConfigApplicationContext;
  import org.springframework.context.annotation.ComponentScan;

  @ComponentScan
  public class App {
    public static void main(String[] args) {
      ApplicationContext ctx = new AnnotationConfigApplicationContext(App.class);
      HelloPrinter printer = ctx.getBean(HelloPrinter.class);
      printer.printHello();
    }
  }
  ```

</details>

### Spring Boot

Spring Boot 简化了 Spring 项目的初始搭建和开发过程。Spring Boot 项目需从一个或多
个 starter。一个最基本的 starter，在入口类添加 `@SpringBootApplication`。

`@SpringBootApplication` 是一个快捷注解，由以下三个注解组成：

  1. @Configuration
  2. @EnableAutoConfiguration
  3. @ComponentScan

Spring Boot 可通过 Maven 插件启动程序 `mvn spring-boot:run`：

```xml
<plugin>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-maven-plugin</artifactId>
</plugin>
```

<details>
  <summary>Spring Boot 最小示例</summary>

  ```sh title="shell"
  mvn archetype:generate \
    -D interactiveMode=false \
    -D archetypeArtifactId=maven-archetype-quickstart \
    -D archetypeVersion=1.4 \
    -D groupId=com.example \
    -D artifactId=quickstart \
    -D package=com.example.quickstart
  ```

  ```xml {3-4,13-15} title="pom.xml"
  <dependencies>
    <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter</artifactId>
      <version>2.5.2</version>
    </dependency>
  <dependencies>

  <build>
    <pluginManagement>
      <plugins>
        <plugin>
          <groupId>org.springframework.boot</groupId>
          <artifactId>spring-boot-maven-plugin</artifactId>
          <version>2.5.2</version>
        </plugin>
      </plugins>
    </pluginManagement>
  </build>
  ```

  ```java {5} title="App.java"
  package com.example.quickstart;

  import org.springframework.boot.autoconfigure.SpringBootApplication;

  @SpringBootApplication
  public class App {

    public static void main(String[] args) {
      System.out.println("Hello Spring Boot");
    }
  }
  ```

  编译执行：

  ```sh title="shell"
  mvn spring-boot:run
  ```

  结果输出：

  ```txt {28} title="stdout"
  [INFO] Scanning for projects...
  [INFO]
  [INFO] -----------------------< com.example:quickstart >-----------------------
  [INFO] Building quickstart 1.0-SNAPSHOT
  [INFO] --------------------------------[ jar ]---------------------------------
  [INFO]
  [INFO] >>> spring-boot-maven-plugin:2.5.2:run (default-cli) > test-compile @ quickstart >>>
  [INFO]
  [INFO] --- maven-resources-plugin:3.0.2:resources (default-resources) @ quickstart ---
  [INFO] Using 'UTF-8' encoding to copy filtered resources.
  [INFO] skip non existing resourceDirectory /Users/Nil/Playground/java-practice/quickstart/src/main/resources
  [INFO]
  [INFO] --- maven-compiler-plugin:3.8.0:compile (default-compile) @ quickstart ---
  [INFO] Nothing to compile - all classes are up to date
  [INFO]
  [INFO] --- maven-resources-plugin:3.0.2:testResources (default-testResources) @ quickstart ---
  [INFO] Using 'UTF-8' encoding to copy filtered resources.
  [INFO] skip non existing resourceDirectory /Users/Nil/Playground/java-practice/quickstart/src/test/resources
  [INFO]
  [INFO] --- maven-compiler-plugin:3.8.0:testCompile (default-testCompile) @ quickstart ---
  [INFO] Nothing to compile - all classes are up to date
  [INFO]
  [INFO] <<< spring-boot-maven-plugin:2.5.2:run (default-cli) < test-compile @ quickstart <<<
  [INFO]
  [INFO]
  [INFO] --- spring-boot-maven-plugin:2.5.2:run (default-cli) @ quickstart ---
  [INFO] Attaching agents: []
  Hello Spring Boot
  [INFO] ------------------------------------------------------------------------
  [INFO] BUILD SUCCESS
  [INFO] ------------------------------------------------------------------------
  [INFO] Total time:  0.617 s
  [INFO] Finished at: 2021-06-30T11:03:32+08:00
  [INFO] ------------------------------------------------------------------------
  ```

</details>

<details>
  <summary>Official Spring Boot starters</summary>

   1. spring-boot-starter
   2. spring-boot-starter-activemq
   3. spring-boot-starter-actuator
   4. spring-boot-starter-amqp
   5. spring-boot-starter-aop
   6. spring-boot-starter-artemis
   7. spring-boot-starter-batch
   8. spring-boot-starter-cache
   9. spring-boot-starter-data-cassandra
  10. spring-boot-starter-data-cassandra-reactive
  11. spring-boot-starter-data-couchbase
  12. spring-boot-starter-data-couchbase-reactive
  13. spring-boot-starter-data-elasticsearch
  14. spring-boot-starter-data-jdbc
  15. spring-boot-starter-data-jpa
  16. spring-boot-starter-data-ldap
  17. spring-boot-starter-data-mongodb
  18. spring-boot-starter-data-mongodb-reactive
  19. spring-boot-starter-data-neo4j
  20. spring-boot-starter-data-r2dbc
  21. spring-boot-starter-data-redis
  22. spring-boot-starter-data-redis-reactive
  23. spring-boot-starter-data-rest
  24. spring-boot-starter-freemarker
  25. spring-boot-starter-groovy-templates
  26. spring-boot-starter-hateoas
  27. spring-boot-starter-integration
  28. spring-boot-starter-jdbc
  29. spring-boot-starter-jersey
  30. spring-boot-starter-jetty
  31. spring-boot-starter-jooq
  32. spring-boot-starter-json
  33. spring-boot-starter-jta-atomikos
  34. spring-boot-starter-log4j2
  35. spring-boot-starter-logging
  36. spring-boot-starter-mail
  37. spring-boot-starter-mustache
  38. spring-boot-starter-oauth2-client
  39. spring-boot-starter-oauth2-resource-server
  40. spring-boot-starter-parent
  41. spring-boot-starter-quartz
  42. spring-boot-starter-reactor-netty
  43. spring-boot-starter-rsocket
  44. spring-boot-starter-security
  45. spring-boot-starter-test
  46. spring-boot-starter-thymeleaf
  47. spring-boot-starter-tomcat
  48. spring-boot-starter-undertow
  49. spring-boot-starter-validation
  50. spring-boot-starter-web
  51. spring-boot-starter-web-services
  52. spring-boot-starter-webflux
  53. spring-boot-starter-websocket

</details>

### Spring Boot CLI

[Spring Boot CLI][1] 通过命令行完成 https://start.spring.io 的项目初始构建。

```sh title="shell"
spring init \
  -g com.example \
  -a quickstart \
  -d web \
  -x quickstart
```

具体参数见 `spring help init`。

### Spring Boot Web

在 Spring Boot 之上运行 Web 服务提供 HTTP 接口，配置过程简单许多，只要使用
`spring-boot-starter-web` 即可。

<details>
  <summary>spring-boot-starter-web 示例</summary>

  ```sh title="shell"
  mvn archetype:generate \
    -D interactiveMode=false \
    -D archetypeArtifactId=maven-archetype-quickstart \
    -D archetypeVersion=1.4 \
    -D groupId=com.example \
    -D artifactId=quickstart \
    -D package=com.example.quickstart
  ```

  ```xml {3-4,13-15} title="pom.xml"
  <dependencies>
    <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-web</artifactId>
      <version>2.5.2</version>
    </dependency>
  <dependencies>

  <build>
    <pluginManagement>
      <plugins>
        <plugin>
          <groupId>org.springframework.boot</groupId>
          <artifactId>spring-boot-maven-plugin</artifactId>
          <version>2.5.2</version>
        </plugin>
      </plugins>
    </pluginManagement>
  </build>
  ```

  ```java {6,10} title="App.java"
  package com.example.quickstart;

  import org.springframework.boot.SpringApplication;
  import org.springframework.boot.autoconfigure.SpringBootApplication;

  @SpringBootApplication
  public class App {

    public static void main(String[] args) {
      SpringApplication.run(App.class, args);
    }
  }
  ```

  ```java {6,9} title="HelloController.java"
  package com.example.quickstart.rest;

  import org.springframework.web.bind.annotation.RequestMapping;
  import org.springframework.web.bind.annotation.RestController;

  @RestController
  public class HelloController {

    @RequestMapping(value = "/")
    public String Hello() {
      return "Hello Web!";
    }
  }
  ```

  启动服务：

  ```sh title="shell"
  mvn spring-boot:run
  ```

  输出：

  ```txt title="stdout"
  [INFO] Scanning for projects...
  [INFO]
  [INFO] -----------------------< com.example:quickstart >-----------------------
  [INFO] Building quickstart 1.0-SNAPSHOT
  [INFO] --------------------------------[ jar ]---------------------------------
  [INFO]
  [INFO] >>> spring-boot-maven-plugin:2.5.2:run (default-cli) > test-compile @ quickstart >>>
  [INFO]
  [INFO] --- maven-resources-plugin:3.0.2:resources (default-resources) @ quickstart ---
  [INFO] Using 'UTF-8' encoding to copy filtered resources.
  [INFO] skip non existing resourceDirectory /Users/Nil/Playground/java-practice/quickstart/src/main/resources
  [INFO]
  [INFO] --- maven-compiler-plugin:3.8.0:compile (default-compile) @ quickstart ---
  [INFO] Nothing to compile - all classes are up to date
  [INFO]
  [INFO] --- maven-resources-plugin:3.0.2:testResources (default-testResources) @ quickstart ---
  [INFO] Using 'UTF-8' encoding to copy filtered resources.
  [INFO] skip non existing resourceDirectory /Users/Nil/Playground/java-practice/quickstart/src/test/resources
  [INFO]
  [INFO] --- maven-compiler-plugin:3.8.0:testCompile (default-testCompile) @ quickstart ---
  [INFO] Nothing to compile - all classes are up to date
  [INFO]
  [INFO] <<< spring-boot-maven-plugin:2.5.2:run (default-cli) < test-compile @ quickstart <<<
  [INFO]
  [INFO]
  [INFO] --- spring-boot-maven-plugin:2.5.2:run (default-cli) @ quickstart ---
  [INFO] Attaching agents: []

    .   ____          _            __ _ _
   /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
  ( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
   \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
    '  |____| .__|_| |_|_| |_\__, | / / / /
   =========|_|==============|___/=/_/_/_/
   :: Spring Boot ::                (v2.5.2)

  2021-06-30 11:51:45.226  INFO 829 --- [           main] com.example.quickstart.App               : Starting App using Java 11.0.11 on genki.local with PID 829 (/Users/Nil/Playground/java-practice/quickstart/target/classes started by Nil in /Users/Nil/Playground/java-practice/quickstart)
  2021-06-30 11:51:45.227  INFO 829 --- [           main] com.example.quickstart.App               : No active profile set, falling back to default profiles: default
  2021-06-30 11:51:45.511  INFO 829 --- [           main] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat initialized with port(s): 8080 (http)
  2021-06-30 11:51:45.515  INFO 829 --- [           main] o.apache.catalina.core.StandardService   : Starting service [Tomcat]
  2021-06-30 11:51:45.515  INFO 829 --- [           main] org.apache.catalina.core.StandardEngine  : Starting Servlet engine: [Apache Tomcat/9.0.48]
  2021-06-30 11:51:45.538  INFO 829 --- [           main] o.a.c.c.C.[Tomcat].[localhost].[/]       : Initializing Spring embedded WebApplicationContext
  2021-06-30 11:51:45.538  INFO 829 --- [           main] w.s.c.ServletWebServerApplicationContext : Root WebApplicationContext: initialization completed in 296 ms
  2021-06-30 11:51:45.655  INFO 829 --- [           main] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat started on port(s): 8080 (http) with context path ''
  2021-06-30 11:51:45.660  INFO 829 --- [           main] com.example.quickstart.App               : Started App in 0.818 seconds (JVM running for 0.962)
  2021-06-30 11:51:58.675  INFO 829 --- [nio-8080-exec-1] o.a.c.c.C.[Tomcat].[localhost].[/]       : Initializing Spring DispatcherServlet 'dispatcherServlet'
  2021-06-30 11:51:58.676  INFO 829 --- [nio-8080-exec-1] o.s.web.servlet.DispatcherServlet        : Initializing Servlet 'dispatcherServlet'
  2021-06-30 11:51:58.676  INFO 829 --- [nio-8080-exec-1] o.s.web.servlet.DispatcherServlet        : Completed initialization in 0 ms
  ```

  请求服务：

  ```sh title="shell"
  curl http://localhost:8080
  ```

</details>

## Web 容器比较

| Name                 | Jetty                                          | Apache Tomcat              |
|----------------------|------------------------------------------------|----------------------------|
| Release year         | 1995                                           | 1999                       |
| Purveyor             | Eclipse Foundation                             | Apache Software Foundation |
| License              | Apache License 2.0, Eclipse Public License 1.0 | Apache License 2.0         |
| High profile clients | Yahoo, Google, Apache Geronimo                 | Spring, JBoss, Jenkins CI  |
| Website              | https://www.eclipse.org/jetty/                 | http://tomcat.apache.org/  |
| Logo                 | Jetty command prompt                           | An adult male cat          |
| Market share         | 8-12%                                          | Greater than 50%           |
| Industry perception  | Performance focused                            | Specification focused      |

[Tomcat vs. Jetty: How these Java application servers compare and differ](https://www.theserverside.com/video/Tomcat-vs-Jetty-How-these-application-servers-compare)


[1]: https://docs.spring.io/spring-boot/docs/current/reference/html/cli.html
