package com.knight.app;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@MapperScan(value = "com.knight.app.mapper") // 批量扫描接口并装配到容器中
@SpringBootApplication
public class AppApplication {

	public static void main(String[] args) {
		SpringApplication.run(AppApplication.class, args);
	}
//写文档，增加mybatis和jpa的描写
	// 增加安全性功能
	//创建类图
	//写完TODO的内容

}
