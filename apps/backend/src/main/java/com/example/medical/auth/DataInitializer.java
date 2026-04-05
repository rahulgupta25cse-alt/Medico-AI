package com.example.medical.auth;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(DataInitializer.class);
    private final AuthService authService;
    private final UserRepository userRepository;

    public DataInitializer(AuthService authService, UserRepository userRepository) {
        this.authService = authService;
        this.userRepository = userRepository;
    }

    @Override
    public void run(String... args) {
        if (userRepository.count() == 0) {
            logger.info("Database is empty. Creating default user...");
            authService.register(
                "demo.clinician@hospital.com",
                "SecurePass123!",
                UserRole.CLINICIAN
            );
            logger.info("Default user 'demo.clinician@hospital.com' created with password 'SecurePass123!'");
        } else {
            logger.info("Users already exist in database. Skipping data initialization.");
        }
    }
}
