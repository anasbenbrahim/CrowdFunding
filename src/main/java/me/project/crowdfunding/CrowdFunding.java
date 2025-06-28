package me.project.crowdfunding;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
@EntityScan(basePackages = "me.project.crowdfunding.Entity")
public class CrowdFunding {

	public static void main(String[] args) {
		SpringApplication.run(CrowdFunding.class, args);
	}

}
