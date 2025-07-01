// package com.example.crowdfunding.config;

// import com.example.crowdfunding.model.Community;
// import com.example.crowdfunding.model.User;
// import com.example.crowdfunding.repository.CommunityRepository;
// import com.example.crowdfunding.repository.UserRepository;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.boot.CommandLineRunner;
// import org.springframework.stereotype.Component;

// @Component
// public class DataInitializer implements CommandLineRunner {

//     @Autowired
//     private UserRepository userRepository;

//     @Autowired
//     private CommunityRepository communityRepository;

//     @Override
//     public void run(String... args) throws Exception {
//         // Check if data already exists
//         if (userRepository.count() == 0) {
//             initializeData();
//         }
//     }

//     private void initializeData() {
//         // Create sample users
//         User user1 = new User();
//         user1.setUsername("admin");
//         user1.setEmail("admin@cofund.com");
//         user1.setPassword("password123"); // In real app, this should be hashed
//         user1 = userRepository.save(user1);

//         User user2 = new User();
//         user2.setUsername("jean.martin");
//         user2.setEmail("jean.martin@cofund.com");
//         user2.setPassword("password123");
//         user2 = userRepository.save(user2);

//         User user3 = new User();
//         user3.setUsername("marie.dubois");
//         user3.setEmail("marie.dubois@cofund.com");
//         user3.setPassword("password123");
//         user3 = userRepository.save(user3);

//         // Create sample communities
//         Community community1 = new Community();
//         community1.setName("Tech Innovators");
//         community1.setDescription("Une communauté dédiée aux innovations technologiques et aux startups");
//         community1.setCreator(user1);
//         community1.getMembers().add(user1);
//         community1.getMembers().add(user2);
//         community1.setTotalContributions(2500.0);
//         communityRepository.save(community1);

//         Community community2 = new Community();
//         community2.setName("Développeurs Web");
//         community2.setDescription("Partagez vos projets web et collaborez avec d'autres développeurs");
//         community2.setCreator(user2);
//         community2.getMembers().add(user2);
//         community2.getMembers().add(user3);
//         community2.setTotalContributions(1200.0);
//         communityRepository.save(community2);

//         Community community3 = new Community();
//         community3.setName("Design & UX");
//         community3.setDescription("La communauté des designers et experts en expérience utilisateur");
//         community3.setCreator(user3);
//         community3.getMembers().add(user3);
//         community3.getMembers().add(user1);
//         community3.setTotalContributions(800.0);
//         communityRepository.save(community3);

//         Community community4 = new Community();
//         community4.setName("Entrepreneurs");
//         community4.setDescription("Connectez-vous avec d'autres entrepreneurs et partagez vos expériences");
//         community4.setCreator(user1);
//         community4.getMembers().add(user1);
//         community4.setTotalContributions(3200.0);
//         communityRepository.save(community4);

//         System.out.println("Sample data initialized successfully!");
//     }
// }