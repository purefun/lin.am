---
title: Java 上手指南
topic: Java
date: 2021-06-29
published: false
---

## 安装 JDK

- x86: https://adoptopenjdk.net/releases.html
- arm64: https://www.azul.com/downloads/?os=macos&architecture=arm-64-bit&package=jdk

检查安装：

`$ java -version`

类似输出：

```
openjdk version "11.0.11" 2021-04-20 LTS
OpenJDK Runtime Environment Zulu11.48+21-CA (build 11.0.11+9-LTS)
OpenJDK 64-Bit Server VM Zulu11.48+21-CA (build 11.0.11+9-LTS, mixed mode)
```

设置 `JAVA_HOME` 环境变量：

`$ export JAVA_HOME=$(/usr/libexec/java_home)`

检查 `JAVA_HOME`：

`$ echo $JAVA_HOME`

类似输出：

`/Library/Java/JavaVirtualMachines/zulu-11.jdk/Contents/Home`

## 运行 Hello World

代码 `Hello.java`：

```java
public class Hello {
  public static void main(String[] args) {
    System.out.println("Hello World");
  }
}
```

编译：

`$ javac Hello.java`

默认情况下，`javac` 会在同目录下生成 `Hello.class` 文件。

运行：

`$ java Hello`

输出：

`Hello World`

## 构建工具

当前主要有三个 Java 项目的构建工具：Ant, Maven 和 Gradle。Ant 在早起被广泛采用，
但只提供编译过程。Gradle 较 Maven 是一个新的构建工具。还未被广泛使接受。Maven 是
目前最主流的选择。

### 安装 Maven

`$ brew install maven`

检查 Maven 命令：

`mvn -v`

类似输出：

```
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

```sh
mvn archetype:generate \
  -D interactiveMode=false \
  -D archetypeArtifactId=maven-archetype-quickstart \
  -D archetypeVersion=1.4 \
  -D groupId=com.example \
  -D artifactId=quickstart \
  -D package=com.example.quickstart
```

### 打包运行

```sh
$ mvn pacakge
```

```sh
$ java -cp target/quickstart-1.0-SNAPSHOT.jar com.example.quickstart.App
```

上述直接使用 java 命令运行在代码有依赖的情况下将无法找到相应的依赖。在 `pom.xml`
中加入 `exec.mainClass`：

```xml {5}
<properties>
  <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
  <maven.compiler.source>1.8</maven.compiler.source>
  <maven.compiler.target>1.8</maven.compiler.target>
  <exec.mainClass>com.letstalkdata.iscream.Application</exec.mainClass>
</properties>
```
通过 Maven 运行程序：

```sh
$ mvn compile exec:java
```

### SNAPSHOT

Maven 把依赖的 jar 包都缓存到 `$HOME/.m2/repository/` 目录下。如果 `pom.xml` 中
的依赖的版本号以 `-SNAPSHOT` 结尾，那么每一次 `mvn install/pacakge/deploy` 都会
从远程仓库中拉取该依赖。

## Spring

在 Java 体系中，Spring 使用极广。在 Web 服务应用方面几乎是不二之选。Spring Core
是整个 Spring 的核心，在此基础上提供了：

1. Spring Boot
2. Spring Framework
3. Spring Data
4. Spring Cloud
5. Spring Cloud Data Flow
6. Spring Security
7. Spring Session
8. Spring Integration
9. Spring HATEOAS
10. Spring REST Docs
11. Spring Batch
12. Spring AMQP
13. Spring CredHub
14. Spring Flo
15. Spring for Apache Kafka
16. Spring LDAP
17. Spring Roo
18. Spring Shell
19. Spring Statemachine
20. Spring Vault
21. Spring Web Flow
22. Spring Web Services

### Spring Core

#### 依赖注入

Spring Core 提供了两种依赖注入方式：XML 和 Annotation。Spring 3 开始提供的
Annotation 已经成为依赖注入配置的主要方式。

XML:
