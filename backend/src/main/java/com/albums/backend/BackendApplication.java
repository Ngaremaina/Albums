package com.albums.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import io.github.cdimascio.dotenv.Dotenv;

@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {
		Dotenv dotenv = Dotenv.load();

		// Optionally print to check if values are loaded
		System.out.println("SPRING_DATASOURCE_URL: " + dotenv.get("SPRING_DATASOURCE_URL"));

		SpringApplication.run(BackendApplication.class, args);
	}
}

