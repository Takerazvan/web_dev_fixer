package com.webdevfix;

import com.webdevfix.model.PenComponent;
import com.webdevfix.model.Role;
import com.webdevfix.model.User;
import com.webdevfix.service.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.ArrayList;

@SpringBootApplication
public class WebdevfixApplication {

	public static void main(String[] args) {
		SpringApplication.run(WebdevfixApplication.class, args);
	}

	@Bean
	public CommandLineRunner demoData(UserService userService) {
		return args -> {
			User mockUser = User.builder()
					.first_name("Razvan")
					.last_name("T")
					.email("razv@gmail.com")
					.password("password")

					.penComponents(new ArrayList<>())

					.build();

			userService.createUser(mockUser);
		};
	}
}
