package com.knight.app;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.support.SpringBootServletInitializer;

@MapperScan(value = "com.knight.app.mapper") // 批量扫描接口并装配到容器中
@SpringBootApplication
public class AppApplication{

	public static void main(String[] args) {
		SpringApplication.run(AppApplication.class, args);
	}

//	@Override
//	protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
//		return builder.sources(AppApplication.class);
//	}
//
//	public static void main(String[] args) {
//		new SpringApplicationBuilder(AppApplication.class).web(true).run(args);
//	}

}
