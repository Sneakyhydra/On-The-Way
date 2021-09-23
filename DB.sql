-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 23, 2021 at 03:45 PM
-- Server version: 10.4.20-MariaDB
-- PHP Version: 8.0.9

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
  `id` bigint(20) NOT NULL,
  `admin_id` bigint(20) NOT NULL,
  `admin_name` varchar(255) NOT NULL,
  `admin_gender` enum('Male','Female','Other') NOT NULL,
  `admin_phone` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `answers`
--

CREATE TABLE `answers` (
  `ans_id` bigint(20) NOT NULL,
  `ques_id` bigint(20) NOT NULL,
  `ans_no` int(11) NOT NULL,
  `ans_desc` varchar(255) NOT NULL,
  `response` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `cat_id` bigint(20) NOT NULL,
  `category` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`cat_id`, `category`) VALUES
(1, 'academics'),
(2, 'stress');

-- --------------------------------------------------------

--
-- Table structure for table `counsellors`
--

CREATE TABLE `counsellors` (
  `id` bigint(20) NOT NULL,
  `coun_id` bigint(20) NOT NULL,
  `coun_name` varchar(255) NOT NULL,
  `coun_gender` enum('Male','Female','Other') NOT NULL,
  `coun_phone` varchar(30) NOT NULL,
  `coun_type` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `counsel_req`
--

CREATE TABLE `counsel_req` (
  `req_id` bigint(20) NOT NULL,
  `stud_id` bigint(20) NOT NULL,
  `coun_id` bigint(20) NOT NULL,
  `res_id` bigint(20) NOT NULL,
  `coun_type` varchar(255) NOT NULL,
  `req_desc` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `coun_feedback`
--

CREATE TABLE `coun_feedback` (
  `coun_id` bigint(20) NOT NULL,
  `feed_desc` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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

-- --------------------------------------------------------

--
-- Table structure for table `questions`
--

CREATE TABLE `questions` (
  `ques_id` bigint(20) NOT NULL,
  `quiz_id` bigint(20) NOT NULL,
  `ques_no` int(11) NOT NULL,
  `ques_desc` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `quizes`
--

CREATE TABLE `quizes` (
  `quiz_id` bigint(20) NOT NULL,
  `quiz_name` varchar(255) NOT NULL,
  `quiz_type` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `response`
--

CREATE TABLE `response` (
  `res_id` bigint(20) NOT NULL,
  `quiz_id` bigint(20) NOT NULL,
  `stud_id` bigint(20) NOT NULL,
  `res_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `response_list`
--

CREATE TABLE `response_list` (
  `res_id` bigint(20) NOT NULL,
  `ques_id` bigint(20) NOT NULL,
  `ans_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `id` bigint(20) NOT NULL,
  `stud_id` bigint(20) NOT NULL,
  `stud_name` varchar(255) NOT NULL,
  `roll_no` varchar(30) NOT NULL,
  `stud_gender` enum('Male','Female','Other') NOT NULL,
  `stud_phone` varchar(30) NOT NULL,
  `stud_dept` enum('B.Tech','M.Tech','B.Des','M.Des','P.hd') NOT NULL,
  `stud_branch` enum('CSE','ECE','Des','ME','NS') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `stud_feedback`
--

CREATE TABLE `stud_feedback` (
  `stud_id` bigint(20) NOT NULL,
  `feed_desc` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_admin_id_admins` (`admin_id`);

--
-- Indexes for table `answers`
--
ALTER TABLE `answers`
  ADD PRIMARY KEY (`ans_id`),
  ADD KEY `fk_ques_id_ans` (`ques_id`) USING BTREE;

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`cat_id`),
  ADD UNIQUE KEY `category` (`category`);

--
-- Indexes for table `counsellors`
--
ALTER TABLE `counsellors`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_coun_id_coun` (`coun_id`) USING BTREE,
  ADD KEY `fk_coun_type_coun` (`coun_type`) USING BTREE;

--
-- Indexes for table `counsel_req`
--
ALTER TABLE `counsel_req`
  ADD PRIMARY KEY (`req_id`),
  ADD KEY `fk_stud_id_req` (`stud_id`),
  ADD KEY `fk_coun_id_req` (`coun_id`),
  ADD KEY `fk_res_id_req` (`res_id`),
  ADD KEY `fk_coun_type_req` (`coun_type`);

--
-- Indexes for table `coun_feedback`
--
ALTER TABLE `coun_feedback`
  ADD KEY `fk_coun_id_feed` (`coun_id`);

--
-- Indexes for table `logins`
--
ALTER TABLE `logins`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `user_email` (`user_email`);

--
-- Indexes for table `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`ques_id`),
  ADD KEY `fk_quiz_id_ques` (`quiz_id`) USING BTREE;

--
-- Indexes for table `quizes`
--
ALTER TABLE `quizes`
  ADD PRIMARY KEY (`quiz_id`),
  ADD KEY `fk_quiz_type_quiz` (`quiz_type`) USING BTREE;

--
-- Indexes for table `response`
--
ALTER TABLE `response`
  ADD PRIMARY KEY (`res_id`),
  ADD KEY `fk_stud_id_res` (`stud_id`),
  ADD KEY `fk_quiz_id_res` (`quiz_id`);

--
-- Indexes for table `response_list`
--
ALTER TABLE `response_list`
  ADD KEY `fk_res_id_reslist` (`res_id`),
  ADD KEY `fk_ques_id_reslist` (`ques_id`),
  ADD KEY `fk_ans_id_reslist` (`ans_id`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_stud_id_stud` (`stud_id`) USING BTREE;

--
-- Indexes for table `stud_feedback`
--
ALTER TABLE `stud_feedback`
  ADD KEY `fk_stud_id_feed` (`stud_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `answers`
--
ALTER TABLE `answers`
  MODIFY `ans_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `cat_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `counsellors`
--
ALTER TABLE `counsellors`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `counsel_req`
--
ALTER TABLE `counsel_req`
  MODIFY `req_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `logins`
--
ALTER TABLE `logins`
  MODIFY `user_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `questions`
--
ALTER TABLE `questions`
  MODIFY `ques_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `quizes`
--
ALTER TABLE `quizes`
  MODIFY `quiz_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `response`
--
ALTER TABLE `response`
  MODIFY `res_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

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
  ADD CONSTRAINT `fk_coun_id` FOREIGN KEY (`coun_id`) REFERENCES `logins` (`user_id`),
  ADD CONSTRAINT `fk_coun_type` FOREIGN KEY (`coun_type`) REFERENCES `categories` (`category`);

--
-- Constraints for table `counsel_req`
--
ALTER TABLE `counsel_req`
  ADD CONSTRAINT `fk_coun_id_req` FOREIGN KEY (`coun_id`) REFERENCES `counsellors` (`coun_id`),
  ADD CONSTRAINT `fk_coun_type_req` FOREIGN KEY (`coun_type`) REFERENCES `categories` (`category`),
  ADD CONSTRAINT `fk_res_id_req` FOREIGN KEY (`res_id`) REFERENCES `response` (`res_id`),
  ADD CONSTRAINT `fk_stud_id_req` FOREIGN KEY (`stud_id`) REFERENCES `students` (`stud_id`);

--
-- Constraints for table `coun_feedback`
--
ALTER TABLE `coun_feedback`
  ADD CONSTRAINT `fk_coun_id_feed` FOREIGN KEY (`coun_id`) REFERENCES `counsellors` (`coun_id`);

--
-- Constraints for table `questions`
--
ALTER TABLE `questions`
  ADD CONSTRAINT `fk_quiz_id` FOREIGN KEY (`quiz_id`) REFERENCES `quizes` (`quiz_id`);

--
-- Constraints for table `quizes`
--
ALTER TABLE `quizes`
  ADD CONSTRAINT `fk_quiz_type` FOREIGN KEY (`quiz_type`) REFERENCES `categories` (`category`);

--
-- Constraints for table `response`
--
ALTER TABLE `response`
  ADD CONSTRAINT `fk_quiz_id_res` FOREIGN KEY (`quiz_id`) REFERENCES `quizes` (`quiz_id`),
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
  ADD CONSTRAINT `fk_stud_id` FOREIGN KEY (`stud_id`) REFERENCES `logins` (`user_id`);

--
-- Constraints for table `stud_feedback`
--
ALTER TABLE `stud_feedback`
  ADD CONSTRAINT `fk_stud_id_feed` FOREIGN KEY (`stud_id`) REFERENCES `students` (`stud_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
