package com.knight.app.config;

import com.knight.app.component.StaffLoginHandlerInterceptor;
import com.knight.app.component.UserLoginHandlerInterceptor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

//使用WebMvcConfigurerAdapter可以来扩展SpringMVC的功能
//@EnableWebMvc   不要接管SpringMVC
@Configuration
public class MyMvcConfig extends WebMvcConfigurerAdapter {

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
       // super.addViewControllers(registry);
        //浏览器发送 /atguigu 请求来到 success
        registry.addViewController("/").setViewName("success");
    }

    //所有的WebMvcConfigurerAdapter组件都会一起起作用
    @Bean //将组件注册在容器
    public WebMvcConfigurerAdapter webMvcConfigurerAdapter(){
        WebMvcConfigurerAdapter adapter = new WebMvcConfigurerAdapter() {
//            @Override
//            public void addViewControllers(ViewControllerRegistry registry) {
//                registry.addViewController("/").setViewName("/user/homepage");
//                registry.addViewController("/user").setViewName("/user/homepage");
//                registry.addViewController("/staff").setViewName("/staff/homepage");
//                registry.addViewController("/user/account").setViewName("/user/homepage");
//            }

            //注册拦截器
            @Override
            public void addInterceptors(InterceptorRegistry registry) {
                //super.addInterceptors(registry);
                //静态资源；  *.css , *.js
                //SpringBoot已经做好了静态资源映射
                registry.addInterceptor(new UserLoginHandlerInterceptor()).addPathPatterns("/user/account");
//                        .excludePathPatterns("/user/register","/user/homepage","/user/login");
                registry.addInterceptor(new StaffLoginHandlerInterceptor()).addPathPatterns("/staff/employee");
//                        .excludePathPatterns("/staff/homepage","/staff/login");

            }
        };
        return adapter;
    }
}
