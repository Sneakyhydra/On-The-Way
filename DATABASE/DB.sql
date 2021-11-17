-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 17, 2021 at 06:52 AM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.0.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `student_counselling`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `admin_id` bigint(20) NOT NULL,
  `admin_name` varchar(255) NOT NULL,
  `admin_gender` enum('Male','Female','Other') NOT NULL,
  `admin_phone` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`admin_id`, `admin_name`, `admin_gender`, `admin_phone`) VALUES
(3, 'Developer', 'Other', '1234567890'),
(10, 'anshul', 'Male', '6261805796'),
(13, 'anshulshukla', 'Male', '6261805796');

-- --------------------------------------------------------

--
-- Table structure for table `answers`
--

CREATE TABLE `answers` (
  `ans_id` bigint(20) NOT NULL,
  `ques_id` bigint(20) NOT NULL,
  `ans_no` int(11) NOT NULL,
  `ans_desc` varchar(500) NOT NULL,
  `response` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `answers`
--

INSERT INTO `answers` (`ans_id`, `ques_id`, `ans_no`, `ans_desc`, `response`) VALUES
(1, 1, 1, 'I focus mostly on academics and keep other activities at bare minimum.', 'You are doing well in academics but you should also explore other fields by participating in sports and educational events.'),
(2, 1, 2, 'I devote balanced time for studies and for other extra-curricular activities.', 'You are managing your time efficiently, keep that up.'),
(3, 1, 3, 'I spend most of my time on entertainment and study just before deadline.', 'Try removing distractions like social media apps and games from your mobile, it will give you more time to study.'),
(4, 1, 4, 'I am addicted to playing games, watching movies and social media and can’t focus on academics.', 'You are doing high dopamine producing activities which makes you addicted to them, you should stop doing these activities for about 21 days, it will bring your dopamine levels back to normal then you will be able to focus on studies.'),
(5, 2, 1, 'I am an extrovert having many friends and actively participate in social events.', 'You actively participate in social events which is very good, try not to involve yourself with bad company and maintain healthy relations.'),
(6, 2, 2, 'I make friends easily and participate in social events only when necessary.', 'You have a balanced social status and good communication skills. Keep it up and you will have no problem with your peers.'),
(7, 2, 3, 'I am a bit shy but I try to make friends.', 'It’s good that you are trying to socialize, work on improving your communication skills and confidence and you will be fine. '),
(8, 2, 4, 'I am an introvert and I mostly stay indoors either studying or playing games.', 'You should go outside and socialize a little more. Participating in events and meeting new people also improves your overall personality.'),
(9, 3, 1, 'I feel happy and relaxed as I keep my work up to date.', 'You are managing your work and assignments excellently. It will lead to a good mental health and you will enjoy your life in all aspects.'),
(10, 3, 2, 'I sometimes feel anxious and nervous as I manage to finish my pending work just before deadline.', 'Try putting more time in understanding the concepts clearly so that you can finish your academic work in less time thus improving your mental health. Also develop a habit of prioritizing your assignments and doing them before any other activity.'),
(11, 3, 3, 'I am mostly in stress and pressure because I can’t keep up with the assignments given.', 'Try putting more time in understanding the concepts clearly so that you can finish your academic work in less time thus improving your mental health. Also develop a habit of prioritizing your assignments and doing them before any other activity.'),
(12, 3, 4, 'I feel very troubled and depressed because my work keeps piling up.', 'You have a habit of procrastination that’s why your work keeps piling up. Keep your phone away from yourself whenever you receive an assignment and prioritize completing it first.'),
(13, 4, 1, 'I plan to do a job in a good core company.', 'So you plan to find a job in a good company, then you must focus on keeping your grades up and highly develop your skills in the field of your work.'),
(14, 4, 2, 'I am planning to go for higher studies after completing bachelors’ degree.', 'So you are planning to go for higher studies after bachelor’s degree, then you should focus on keeping your grades up while parallelly studying for the entrance exam of the field you wish to study in master’s degree.'),
(15, 4, 3, 'I am planning to build my own startup.', 'If you are planning to build your own startup, you should master your field of expertise and find a group of like-minded people to have a solid foundation for your own company. Also making connections with people already in the same business will help you'),
(16, 4, 4, 'I am planning to try for a government job', 'If you wish to go for a government job then you should start studying for that job parallelly with your college academics. Start as early as possible to make sure you clear the exam and land the desired job.'),
(17, 4, 5, 'I have not decided yet, I am still exploring more options.', 'Its ok if you have not yet decided your plans for your future, exploring yourself and your interests is an important phase of your life in which no one should rush. Find your passion and follow it with all you’ve got.'),
(18, 5, 1, 'Yes', 'Good, you should keep exploring and learning different techs.'),
(19, 5, 2, 'No', 'You should explore more fields and techs to find a good match for you.');

-- --------------------------------------------------------

--
-- Table structure for table `counsellors`
--

CREATE TABLE `counsellors` (
  `coun_id` bigint(20) NOT NULL,
  `coun_name` varchar(255) NOT NULL,
  `coun_gender` enum('Male','Female','Other') NOT NULL,
  `coun_phone` varchar(30) NOT NULL,
  `coun_dept` enum('B.Tech','M.Tech','B.Des','M.Des','P.hd') NOT NULL,
  `coun_status` enum('Approved','Pending','Rejected') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `counsellors`
--

INSERT INTO `counsellors` (`coun_id`, `coun_name`, `coun_gender`, `coun_phone`, `coun_dept`, `coun_status`) VALUES
(1, 'Abc', 'Female', '1234567890', 'M.Tech', 'Approved'),
(5, 'sparsh kumar', 'Male', '8122334455', 'B.Tech', 'Approved'),
(6, 'test', 'Female', '1234567890', 'M.Tech', 'Rejected'),
(8, 'hjkafai', 'Female', '1234567890', 'M.Tech', 'Rejected'),
(9, 'Anshul', 'Male', '0626180579', 'B.Tech', 'Approved'),
(19, 't1', 'Female', '1234567890', 'B.Tech', 'Approved'),
(22, 'Gautam Chauhan', 'Male', '8123456790', 'P.hd', 'Pending');

-- --------------------------------------------------------

--
-- Table structure for table `coun_feedback`
--

CREATE TABLE `coun_feedback` (
  `feed_id` bigint(20) NOT NULL,
  `coun_id` bigint(20) NOT NULL,
  `feed_desc` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `coun_feedback`
--

INSERT INTO `coun_feedback` (`feed_id`, `coun_id`, `feed_desc`) VALUES
(3, 1, 'This is a good website');

-- --------------------------------------------------------

--
-- Table structure for table `logins`
--

CREATE TABLE `logins` (
  `user_id` bigint(20) NOT NULL,
  `user_email` varchar(255) NOT NULL,
  `user_password` varchar(255) NOT NULL,
  `role` enum('counsellor','student','admin') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `logins`
--

INSERT INTO `logins` (`user_id`, `user_email`, `user_password`, `role`) VALUES
(1, 'abc@gmail.com', '$2a$10$VKvYDdiasoUwto0Txnv6d.dFD9t6rNqIZoZWf4fytgt3zEkX9Gl4a', 'counsellor'),
(2, 'dr@gmail.com', '$2a$10$xrbkhFwBrYsdZpAYieYx.OS02E4wGSc667UsRvZXcvkIwAy0VHC6W', 'student'),
(3, 'dev@gmail.com', '$2a$10$8YC8p.emgpmz28/sgVpeOe6ssIavu0BqKEC3etJigpQL2do4g.nhK', 'admin'),
(4, 'vansh123@gmail.com', '$2a$10$a19gtHCdeNPt689z1VwFK.Gwk96iaRK640rS3Aj/UrlBt/08y4gIG', 'student'),
(5, 'sparsh123@gmail.com', '$2a$10$GC2x4sXKz37UQBk/P6L1bezFlOuCarUBJPqsYewejLBuKZHKypr5W', 'counsellor'),
(6, 'test2@gmail.com', '$2a$10$pL07jsMxiNFlkIDQFJJJlOcG54u8/L2ZcMRdRJXquPIRP5s43crFa', 'counsellor'),
(8, 'askfbjk@mail.com', '$2a$10$M1/tEpGvp8.xMe/xQ7jVauEVprfoUyYg7JBMwHEJsMMv4CDfMHF2m', 'counsellor'),
(9, '20bcs035@iiitdmj.ac.in', '$2a$10$ukaAlf6zW9KElZw3uWm5Ief0xBa9WvVTr3gOlo4SPpgVz2UCBHM/6', 'counsellor'),
(10, 'anshulshukla628@gmail.com', '$2a$10$KHnP0zmXh16pb6SdSXG6RepF6WV63Iw0zdvtrhbdoGxjpXpINrUge', 'admin'),
(11, 'gg@gamil.com', '$2a$10$6e2Kj1sqFFRikVW5VpJJZeyC2hHTFIrWtjX7MR5KVE93dY.xA8fQa', 'student'),
(12, 'yash@gmail.com', '$2a$10$IJW8sUbpUFABTGu3fViVxOJZkCqiMSpFR9tx2LGbo3EYzJTw2bHk.', 'student'),
(13, 'gg@gmail.com', '$2a$10$k5PUPEcu08GNmjh5luFURu0GADuI79eqNvNCscmu9niDvuY/IrYg.', 'admin'),
(14, 'virat18@gmail.com', '$2a$10$EoUTtjLIFH85iuMdgjuCMeIdXRJ/p6IT0ouNTm9omuOHCmKTROMBq', 'student'),
(18, 'pam123@gmail.com', '$2a$10$C./D0cVheMi0bOJMG4jiWOK/c/2ah8/JxdPKgZ6HF0Eybxdf16HLO', 'student'),
(19, 't1@gail.com', '$2a$10$f5GwpRlIsRNPXeuEQjZnae2RoubAZpAJGPemmZAaC8jWhq1KkrVbS', 'counsellor'),
(20, 'aljfl@mail.cm', '$2a$10$/XScRjQ3fe2eYH.Rclt0xOV6OzeuE8ThUgbS7Pr2y6tiNf8vDtIz.', 'student'),
(21, 'akbsafk@abc.sab', '$2a$10$s2.Zq72AtHh.YQ9v8wZy0.hXiS70Sl9q.WY8IL8oV0iQ7Fn700yWa', 'student'),
(22, 'gautam123@gmail.com', '$2a$10$pMjcp2/FLHUuyh4m8ipO0uZjtGO6y6upoyh9CXUyG41rUiaZlAS5i', 'counsellor'),
(23, 'dhruasfsa@gmail.com', '$2a$10$67OnvaxM5zOMbY7yug1wReBqNmulGGJIJK.m3U33D8hCP1dqrm4r2', 'student'),
(24, 'abc123@gmail.com', '$2a$10$A2Qb6njRmDMZZOLXCBV/kuCrTAZsTG9W4zlyxpdfyE4PCsklNRvuG', 'student');

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `mess_id` bigint(20) NOT NULL,
  `stud_id` bigint(20) NOT NULL,
  `coun_id` bigint(20) NOT NULL,
  `from_role` enum('student','counsellor') NOT NULL,
  `mess_desc` varchar(300) NOT NULL,
  `mess_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`mess_id`, `stud_id`, `coun_id`, `from_role`, `mess_desc`, `mess_date`) VALUES
(1, 2, 1, 'counsellor', 'hello\nare u there?', '2021-11-12 08:29:27'),
(2, 2, 1, 'counsellor', '1', '2021-11-12 08:29:36'),
(3, 2, 1, 'counsellor', '2', '2021-11-12 08:29:39'),
(4, 2, 1, 'counsellor', '3', '2021-11-12 08:29:41'),
(5, 2, 1, 'student', 'a\n\n', '2021-11-15 12:53:13'),
(6, 2, 9, 'student', 'hi', '2021-11-16 06:25:53'),
(7, 2, 9, 'student', 'a\nb\nc', '2021-11-16 06:25:59'),
(8, 2, 1, 'student', 'hello', '2021-11-16 09:29:12'),
(9, 2, 1, 'counsellor', 'how are you', '2021-11-16 09:29:20'),
(10, 2, 1, 'student', 'i am fine', '2021-11-16 09:29:27'),
(11, 2, 1, 'counsellor', '1\n2\n3', '2021-11-16 09:29:43'),
(12, 2, 1, 'counsellor', 'hello', '2021-11-16 10:04:25'),
(13, 2, 1, 'counsellor', 'how are you', '2021-11-16 10:05:14'),
(14, 2, 1, 'student', 'i am fine', '2021-11-16 10:06:03'),
(15, 24, 1, 'counsellor', 'hello', '2021-11-16 10:45:16');

-- --------------------------------------------------------

--
-- Table structure for table `questions`
--

CREATE TABLE `questions` (
  `ques_id` bigint(20) NOT NULL,
  `ques_desc` varchar(500) NOT NULL,
  `ques_no` int(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `questions`
--

INSERT INTO `questions` (`ques_id`, `ques_desc`, `ques_no`) VALUES
(1, 'How good is your time management with respect to academics and other activities?', 1),
(2, 'How much do you socialize with people around you?', 2),
(3, 'How would you describe your mental state with respect to academics?', 3),
(4, 'What are your plans after completing Bachelor’s degree?', 4),
(5, 'Are you learning something by yourself other than college?', 5);

-- --------------------------------------------------------

--
-- Table structure for table `response`
--

CREATE TABLE `response` (
  `res_id` bigint(20) NOT NULL,
  `stud_id` bigint(20) NOT NULL,
  `res_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `response`
--

INSERT INTO `response` (`res_id`, `stud_id`, `res_date`) VALUES
(1, 2, '2021-11-15 12:51:07'),
(2, 2, '2021-11-16 06:25:14'),
(3, 4, '2021-11-16 09:50:41'),
(4, 23, '2021-11-16 10:38:20'),
(5, 24, '2021-11-16 10:42:53');

-- --------------------------------------------------------

--
-- Table structure for table `response_list`
--

CREATE TABLE `response_list` (
  `rl_id` bigint(20) NOT NULL,
  `res_id` bigint(20) NOT NULL,
  `ques_id` bigint(20) NOT NULL,
  `ans_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `response_list`
--

INSERT INTO `response_list` (`rl_id`, `res_id`, `ques_id`, `ans_id`) VALUES
(1, 1, 1, 1),
(2, 1, 2, 5),
(3, 1, 3, 9),
(4, 1, 4, 13),
(5, 1, 5, 18),
(6, 2, 1, 4),
(7, 2, 2, 8),
(8, 2, 3, 12),
(9, 2, 4, 17),
(10, 2, 5, 19),
(11, 3, 1, 3),
(12, 3, 2, 6),
(13, 3, 3, 11),
(14, 3, 4, 17),
(15, 3, 5, 18),
(16, 4, 1, 3),
(17, 4, 2, 6),
(18, 4, 3, 10),
(19, 4, 4, 16),
(20, 4, 5, 18),
(21, 5, 1, 2),
(22, 5, 2, 7),
(23, 5, 3, 9),
(24, 5, 4, 16),
(25, 5, 5, 18);

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `stud_id` bigint(20) NOT NULL,
  `stud_name` varchar(255) NOT NULL,
  `roll_no` varchar(30) NOT NULL,
  `stud_gender` enum('Male','Female','Other') NOT NULL,
  `stud_phone` varchar(30) NOT NULL,
  `stud_dept` enum('B.Tech','M.Tech','B.Des','M.Des','P.hd') NOT NULL,
  `stud_branch` enum('CSE','ECE','Des','ME','NS') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`stud_id`, `stud_name`, `roll_no`, `stud_gender`, `stud_phone`, `stud_dept`, `stud_branch`) VALUES
(2, 'Dr', '20BCS001', 'Male', '1234567890', 'B.Tech', 'CSE'),
(4, 'Vansh Sharma ', '20bcs22x', 'Male', '8122334457', 'B.Tech', 'CSE'),
(11, 'Flash', '20bcs035', 'Male', '6261805796', 'B.Tech', 'CSE'),
(12, 'yash', '20bcs036', 'Male', '6261805796', 'P.hd', 'CSE'),
(14, 'Virat Kohli', '203817', 'Male', '1234567890', 'B.Tech', 'CSE'),
(18, 'Please accept me', '767678', 'Male', '7886756454', 'B.Tech', 'CSE'),
(20, 'asdfk', 'anflajnfkaj', 'Female', '1234567890', 'M.Tech', 'ECE'),
(21, 'dev@gmail.com', 'sakfba', 'Female', '1234567890', 'M.Tech', 'ECE'),
(23, 'dhruv123', '20BCS075', 'Male', '6268086918', 'B.Tech', 'ECE'),
(24, 'dhruv1', '20BCS002', 'Female', '1234567890', 'M.Tech', 'ECE');

-- --------------------------------------------------------

--
-- Table structure for table `stud_feedback`
--

CREATE TABLE `stud_feedback` (
  `feed_id` bigint(20) NOT NULL,
  `stud_id` bigint(20) NOT NULL,
  `feed_desc` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `stud_feedback`
--

INSERT INTO `stud_feedback` (`feed_id`, `stud_id`, `feed_desc`) VALUES
(5, 24, 'chat works');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`admin_id`) USING BTREE;

--
-- Indexes for table `answers`
--
ALTER TABLE `answers`
  ADD PRIMARY KEY (`ans_id`),
  ADD KEY `fk_ques_id_ans` (`ques_id`) USING BTREE;

--
-- Indexes for table `counsellors`
--
ALTER TABLE `counsellors`
  ADD PRIMARY KEY (`coun_id`) USING BTREE;

--
-- Indexes for table `coun_feedback`
--
ALTER TABLE `coun_feedback`
  ADD PRIMARY KEY (`feed_id`),
  ADD KEY `fk_coun_id_feed` (`coun_id`);

--
-- Indexes for table `logins`
--
ALTER TABLE `logins`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `user_email` (`user_email`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`mess_id`),
  ADD KEY `stud_id` (`stud_id`),
  ADD KEY `coun_id` (`coun_id`);

--
-- Indexes for table `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`ques_id`);

--
-- Indexes for table `response`
--
ALTER TABLE `response`
  ADD PRIMARY KEY (`res_id`),
  ADD KEY `fk_stud_id_res` (`stud_id`);

--
-- Indexes for table `response_list`
--
ALTER TABLE `response_list`
  ADD PRIMARY KEY (`rl_id`),
  ADD KEY `fk_res_id_reslist` (`res_id`),
  ADD KEY `fk_ques_id_reslist` (`ques_id`),
  ADD KEY `fk_ans_id_reslist` (`ans_id`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`stud_id`) USING BTREE;

--
-- Indexes for table `stud_feedback`
--
ALTER TABLE `stud_feedback`
  ADD PRIMARY KEY (`feed_id`),
  ADD KEY `stud_id_feedback` (`stud_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `answers`
--
ALTER TABLE `answers`
  MODIFY `ans_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `coun_feedback`
--
ALTER TABLE `coun_feedback`
  MODIFY `feed_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `logins`
--
ALTER TABLE `logins`
  MODIFY `user_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `mess_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `questions`
--
ALTER TABLE `questions`
  MODIFY `ques_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `response`
--
ALTER TABLE `response`
  MODIFY `res_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `response_list`
--
ALTER TABLE `response_list`
  MODIFY `rl_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `stud_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `stud_feedback`
--
ALTER TABLE `stud_feedback`
  MODIFY `feed_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `admins`
--
ALTER TABLE `admins`
  ADD CONSTRAINT `fk_admin_id_admins` FOREIGN KEY (`admin_id`) REFERENCES `logins` (`user_id`);

--
-- Constraints for table `answers`
--
ALTER TABLE `answers`
  ADD CONSTRAINT `fk_ques_id` FOREIGN KEY (`ques_id`) REFERENCES `questions` (`ques_id`);

--
-- Constraints for table `counsellors`
--
ALTER TABLE `counsellors`
  ADD CONSTRAINT `fk_coun_id` FOREIGN KEY (`coun_id`) REFERENCES `logins` (`user_id`);

--
-- Constraints for table `coun_feedback`
--
ALTER TABLE `coun_feedback`
  ADD CONSTRAINT `fk_coun_id_feed` FOREIGN KEY (`coun_id`) REFERENCES `counsellors` (`coun_id`);

--
-- Constraints for table `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`stud_id`) REFERENCES `students` (`stud_id`),
  ADD CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`coun_id`) REFERENCES `counsellors` (`coun_id`);

--
-- Constraints for table `response`
--
ALTER TABLE `response`
  ADD CONSTRAINT `fk_stud_id_res` FOREIGN KEY (`stud_id`) REFERENCES `students` (`stud_id`);

--
-- Constraints for table `response_list`
--
ALTER TABLE `response_list`
  ADD CONSTRAINT `fk_ans_id_reslist` FOREIGN KEY (`ans_id`) REFERENCES `answers` (`ans_id`),
  ADD CONSTRAINT `fk_ques_id_reslist` FOREIGN KEY (`ques_id`) REFERENCES `questions` (`ques_id`),
  ADD CONSTRAINT `fk_res_id_reslist` FOREIGN KEY (`res_id`) REFERENCES `response` (`res_id`);

--
-- Constraints for table `students`
--
ALTER TABLE `students`
  ADD CONSTRAINT `fk_stud_id_students` FOREIGN KEY (`stud_id`) REFERENCES `logins` (`user_id`);

--
-- Constraints for table `stud_feedback`
--
ALTER TABLE `stud_feedback`
  ADD CONSTRAINT `stud_id_feedback` FOREIGN KEY (`stud_id`) REFERENCES `students` (`stud_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
