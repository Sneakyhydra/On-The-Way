-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 02, 2021 at 01:48 PM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.0.11

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
(3, 'Developer', 'Male', '1234567890'),
(7, 'aasdgaksf', 'Other', '123214'),
(10, 'Manu', 'Male', '1234567890'),
(13, 'C', 'Female', '564564846351'),
(18, 'safskl', 'Male', '1234567890');

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
(18, 5, 1, 'My friend circle has really good, helpful, fun and like-minded people who supports me whenever I need them.', 'a'),
(19, 5, 2, 'B', 'b'),
(20, 5, 3, 'C', 'c'),
(21, 5, 4, 'D', 'd');

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
(2, 'Abc', 'Female', '1234567890', 'M.Tech', 'Approved'),
(4, 'askfhkj', 'Male', '123123', 'M.Des', 'Rejected'),
(6, 'ajfhakj', 'Female', '1241', 'M.Tech', 'Approved'),
(9, 'Manu', 'Male', '1234567890', 'B.Tech', 'Approved'),
(12, 'B', 'Male', '4643413232', 'M.Des', 'Approved'),
(17, 'asdafajl', 'Other', '1234567890', 'M.Des', 'Rejected'),
(19, 'coun', 'Male', '1234567890', 'B.Tech', 'Approved');

-- --------------------------------------------------------

--
-- Table structure for table `coun_feedback`
--

CREATE TABLE `coun_feedback` (
  `feed_id` bigint(20) NOT NULL,
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

--
-- Dumping data for table `logins`
--

INSERT INTO `logins` (`user_id`, `user_email`, `user_password`, `role`) VALUES
(1, 'dhruvrishishwar2@gmail.com', '$2a$10$cc7yBuZQOS56aXbPwe0gEeE/hGKYK1jbVbm/Uxh9bhvS24DMjBmAy', 'student'),
(2, 'abc@gmail.com', '$2a$10$7yNoPWBNM39EmntpKU2hxehe7pX4moIl3xgo2S1FOKYJD0QdaA.3G', 'counsellor'),
(3, 'dev@gmail.com', '$2a$10$AS21r0mFRZHLrBTijGhhBOs/dfCW1mSPR9I3ZdlP1VcM4gsoj1kkK', 'admin'),
(4, 'akdlfh@gmail.com', '$2a$10$V2dx.wPE7ec0kYjMmTrQU.hcu95/cek1SMxOUZ0M6m5UEhLidC2Wm', 'counsellor'),
(5, 'kdsfk@gmail.com', '$2a$10$BssCQ.oes9vGXlh3eipNfe/yx7GLLbys/.QQtjI9B5hsVZV7QVAJi', 'student'),
(6, 'jdkfha@gmail.com', '$2a$10$DJwTh0oVJR3.tKMr9cQ5henfNYGrBszJPnNeWUSUlTxgbCamG2C4a', 'counsellor'),
(7, 'jdafhlj@gmail.com', '$2a$10$ZfURstiOyM7IeaCR76XWSeJR8BbtsLAk.EusOwl93EqQvJKkan0EW', 'admin'),
(8, 'dhruvrishishwar@gmail.com', '$2a$10$j/ohYEwWy/ra.rhP0DHWZe9lMh9.JW3SKfUgFwM5Gw8ep2Ob.sASm', 'student'),
(9, 'rishishwarmanu1@gmail.com', '$2a$10$f.QcnmiiOkFQbirX/97eY.qmZCOezqx0peEWRvYnro24RVgEzZDXu', 'counsellor'),
(10, 'rishishwarmanu21@gmail.com', '$2a$10$syjQI5eW5I2S0i5JRB8Yf.LP.0SHzPLR/O0cxxT/V6eL.tOCefNCa', 'admin'),
(12, 'b@mail.com', '$2a$10$BLqMaeBO8HTN/7CD8TMBFu86nwRigciYi.I..YWdKI4krdg4q7gLG', 'counsellor'),
(13, 'c@mail.com', '$2a$10$EimHAc6ZQjL8tWgqnFE11eTv5rFGzDBlT31pLmvA8zrIb95fYHtie', 'admin'),
(14, 'dhruv@gmail.com', '$2a$10$yWEG3oHPVwmB/K.iREh54OpbCqaAtaYajMA03BDZTUQPDUQyzn6pu', 'student'),
(15, 'a@mail.com', '$2a$10$smK.BUeRx/DpyzSRHugkd.HMOcbMj1hDVeYkaDs9340.GOLq3FxEG', 'student'),
(16, 'akfjbasj@mail.com', '$2a$10$M3MTUlMb5WGVDfZZiSE5AOVdDAGYu28uSQogHAr6.C85KOp6P/rvS', 'student'),
(17, 'anfaljsfn@mail.com', '$2a$10$uzEDmIvS9LlvddFtWXzbfeWkqXGH0.YfCTEaw6mESDqlcNU0lPU6.', 'counsellor'),
(18, 'lafnasjl@mail.com', '$2a$10$v0s1VLL.7nk9CkQI4PdtZu26iz53AqUVbFIewZB9wUKjS2Qt/8iMa', 'admin'),
(19, 'a@gmail.com', '$2a$10$fB1WgyneNhm5ECQw9LevzOd.AZWZtCYjxvzcZ5GGH8qs4rwctdjAK', 'counsellor'),
(20, 'abc@mail.com', '$2a$10$fA0JCGzkSZ1QNnQX.XjZjOFKyxbFEuSytve.oQgd12FUSQNH/oS3i', 'student');

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
(4, 1, 2, 'student', 'I am dhruv', '2021-11-01 07:56:27'),
(5, 1, 2, 'student', 'hi', '2021-11-01 07:56:27'),
(6, 1, 2, 'student', 'hi', '2021-11-01 07:56:27'),
(9, 1, 2, 'counsellor', 'hi', '2021-11-01 07:56:29'),
(10, 1, 2, 'student', 'first', '2021-11-01 16:57:42'),
(11, 1, 2, 'student', 'hello', '2021-11-01 16:58:06'),
(12, 1, 2, 'student', 'are u there?', '2021-11-01 16:58:11'),
(13, 1, 2, 'student', 'ams', '2021-11-01 16:58:34'),
(14, 1, 9, 'student', 'hi', '2021-11-01 17:02:28'),
(15, 1, 4, 'student', 'hello', '2021-11-01 17:02:39'),
(16, 1, 2, 'student', 'helo', '2021-11-01 17:03:01'),
(17, 1, 9, 'student', 'hi', '2021-11-01 17:03:13'),
(18, 1, 2, 'student', 'abc', '2021-11-01 17:03:26'),
(19, 1, 4, 'student', 'abc', '2021-11-01 17:03:30'),
(20, 1, 9, 'student', 'abc', '2021-11-01 17:03:34'),
(21, 1, 2, 'counsellor', 'hi dhruv', '2021-11-01 17:20:43'),
(22, 1, 2, 'student', 'i need ur help', '2021-11-01 20:36:19'),
(23, 1, 2, 'counsellor', 'no problem', '2021-11-01 20:37:21'),
(24, 1, 2, 'counsellor', 'i will help u', '2021-11-01 20:37:32'),
(25, 1, 2, 'student', 'i want', '2021-11-01 20:44:11'),
(27, 1, 2, 'student', 'hi', '2021-11-01 20:46:22'),
(28, 1, 2, 'counsellor', 'hi', '2021-11-01 20:46:24'),
(29, 1, 2, 'student', 'hello', '2021-11-01 21:13:20'),
(30, 1, 2, 'student', 'hi', '2021-11-01 21:13:25'),
(31, 1, 2, 'student', 'how are you?', '2021-11-01 21:13:30'),
(32, 1, 2, 'counsellor', 'i am fine thank you', '2021-11-01 21:13:35'),
(33, 1, 2, 'student', 'abc', '2021-11-01 21:15:00'),
(34, 1, 2, 'student', 'sadjk', '2021-11-01 21:15:43'),
(35, 1, 2, 'student', 'askfjaskf', '2021-11-01 21:15:45'),
(36, 1, 2, 'counsellor', 'hello', '2021-11-01 21:27:22'),
(37, 1, 2, 'counsellor', 'are u there', '2021-11-01 21:29:53'),
(38, 1, 2, 'counsellor', 'abc', '2021-11-01 21:50:06'),
(39, 1, 2, 'student', 'hello', '2021-11-01 21:50:22'),
(40, 1, 2, 'counsellor', 'hello', '2021-11-01 21:51:11'),
(41, 1, 2, 'counsellor', 'sadjka', '2021-11-01 21:51:47'),
(42, 1, 2, 'student', 'sakflaks', '2021-11-01 21:51:51'),
(43, 1, 2, 'counsellor', 'ksadkjas', '2021-11-01 21:52:21'),
(44, 1, 2, 'student', 'skagfkasfa', '2021-11-01 21:52:25'),
(45, 1, 2, 'counsellor', 'no', '2021-11-01 21:52:55'),
(46, 1, 2, 'student', 'hehe', '2021-11-01 21:53:03'),
(47, 1, 2, 'student', 'hi', '2021-11-01 22:23:14'),
(48, 1, 2, 'counsellor', 'ih', '2021-11-01 22:23:20'),
(49, 1, 2, 'counsellor', 'sajdna', '2021-11-01 22:23:33'),
(50, 1, 2, 'student', 'asljfna', '2021-11-01 22:24:26'),
(51, 1, 2, 'counsellor', 'safljsa', '2021-11-01 22:24:37'),
(52, 1, 2, 'student', 'hi', '2021-11-01 22:27:35'),
(53, 1, 2, 'counsellor', 'i am here', '2021-11-01 22:27:44'),
(54, 1, 2, 'counsellor', 'how are you', '2021-11-01 22:32:16'),
(55, 1, 2, 'student', 'i am fine', '2021-11-01 22:32:23'),
(56, 1, 2, 'student', 'hehe', '2021-11-01 22:38:20'),
(57, 1, 2, 'counsellor', 'my god', '2021-11-01 22:38:28'),
(58, 1, 2, 'counsellor', 'its working', '2021-11-01 22:38:33'),
(59, 1, 19, 'counsellor', 'hey', '2021-11-01 22:41:33'),
(60, 1, 19, 'counsellor', 'how are you', '2021-11-01 22:41:37'),
(61, 1, 19, 'student', 'i am fine thank u', '2021-11-01 22:41:49'),
(62, 1, 2, 'counsellor', 'u talking to someone else?', '2021-11-01 22:41:58'),
(63, 1, 19, 'counsellor', 'nice', '2021-11-01 22:42:03'),
(64, 1, 2, 'student', 'no', '2021-11-01 22:42:10'),
(65, 1, 2, 'student', 'its faster now', '2021-11-01 22:43:15'),
(66, 1, 2, 'counsellor', 'ikr', '2021-11-01 22:43:21'),
(67, 1, 2, 'counsellor', 'hey are there any errors?', '2021-11-01 22:44:35'),
(68, 1, 2, 'student', 'i dont think so', '2021-11-01 22:44:42'),
(69, 1, 2, 'student', 'i love this', '2021-11-01 22:45:00'),
(70, 1, 2, 'counsellor', 'dont get distracted', '2021-11-01 22:45:08'),
(71, 14, 2, 'counsellor', 'hi', '2021-11-01 23:07:51'),
(72, 8, 2, 'counsellor', 'hi', '2021-11-01 23:07:58'),
(73, 1, 2, 'counsellor', 'hi', '2021-11-01 23:43:02'),
(74, 1, 2, 'counsellor', 'an', '2021-11-01 23:44:51'),
(75, 1, 2, 'counsellor', 'pasd', '2021-11-01 23:44:53'),
(76, 1, 2, 'counsellor', 'ajksfksj', '2021-11-01 23:44:55'),
(77, 1, 2, 'counsellor', 'salkfhsjak', '2021-11-01 23:44:57'),
(78, 1, 2, 'counsellor', 'bg', '2021-11-01 23:45:58'),
(79, 1, 2, 'counsellor', 'asdh', '2021-11-01 23:46:11'),
(80, 1, 2, 'counsellor', 'helo there', '2021-11-01 23:47:56'),
(81, 15, 2, 'counsellor', 'a', '2021-11-01 23:48:04'),
(82, 14, 2, 'counsellor', 'safs', '2021-11-01 23:48:08'),
(83, 8, 2, 'counsellor', 'safds', '2021-11-01 23:48:12'),
(84, 1, 2, 'student', 'basd', '2021-11-01 23:49:53'),
(85, 1, 2, 'student', 'qiwghkj', '2021-11-01 23:49:56'),
(86, 1, 2, 'student', 'safhdsbaf', '2021-11-01 23:50:32'),
(87, 1, 2, 'student', 'dsaflhsdbfla', '2021-11-01 23:50:33'),
(88, 1, 4, 'student', 'afs', '2021-11-01 23:50:45'),
(89, 1, 9, 'student', 'asfa', '2021-11-01 23:50:48'),
(90, 1, 2, 'student', 'sajdbajf', '2021-11-01 23:50:54'),
(91, 1, 2, 'counsellor', 'askdbfks', '2021-11-01 23:51:05'),
(92, 1, 2, 'counsellor', 'hjvjh', '2021-11-01 23:51:08'),
(93, 1, 2, 'student', 'sjafbks', '2021-11-01 23:51:13'),
(94, 1, 2, 'student', 'jasdbfa', '2021-11-01 23:52:10'),
(95, 1, 2, 'counsellor', 'asdfb', '2021-11-01 23:52:18'),
(96, 1, 2, 'counsellor', 'aks', '2021-11-01 23:52:19'),
(97, 1, 2, 'student', 'aksf', '2021-11-01 23:52:24'),
(98, 1, 2, 'student', 'kajsk', '2021-11-01 23:52:30'),
(99, 1, 2, 'student', 'hello', '2021-11-02 00:00:30'),
(100, 1, 2, 'counsellor', 'hello', '2021-11-02 00:00:37'),
(101, 1, 2, 'student', 'gjj', '2021-11-02 00:00:48'),
(102, 1, 2, 'student', 'how are you', '2021-11-02 07:30:08'),
(103, 1, 2, 'counsellor', 'i am fine', '2021-11-02 07:30:39'),
(104, 1, 2, 'counsellor', 'mic test', '2021-11-02 08:06:34'),
(105, 1, 2, 'counsellor', 'are u there?', '2021-11-02 08:06:39'),
(106, 1, 2, 'student', 'what?', '2021-11-02 08:06:49'),
(107, 1, 2, 'student', 'helo', '2021-11-02 08:07:07'),
(108, 1, 2, 'counsellor', 'abc', '2021-11-02 08:07:31'),
(109, 1, 2, 'counsellor', 'def', '2021-11-02 08:07:33'),
(110, 1, 2, 'counsellor', 'hi', '2021-11-02 08:18:31'),
(111, 1, 2, 'counsellor', 'hi', '2021-11-02 08:18:37'),
(112, 5, 2, 'counsellor', 'hi', '2021-11-02 08:18:53'),
(113, 1, 2, 'counsellor', 'hi', '2021-11-02 08:21:38'),
(114, 1, 2, 'student', 'hello', '2021-11-02 08:21:44'),
(115, 1, 2, 'student', 'how are you?', '2021-11-02 08:21:52'),
(116, 1, 2, 'counsellor', 'kya', '2021-11-02 08:50:36'),
(117, 1, 2, 'counsellor', 'kya', '2021-11-02 08:51:17'),
(118, 1, 2, 'counsellor', 'abc', '2021-11-02 08:51:27'),
(119, 1, 2, 'student', 'hello', '2021-11-02 08:51:46'),
(120, 1, 2, 'counsellor', 'xchxh', '2021-11-02 08:51:52'),
(121, 1, 2, 'counsellor', 'Hello', '2021-11-02 08:53:58'),
(122, 1, 2, 'student', 'hi', '2021-11-02 08:54:09'),
(123, 1, 2, 'counsellor', 'How are u?', '2021-11-02 08:54:16'),
(124, 1, 2, 'student', 'iam finw', '2021-11-02 08:54:26'),
(125, 1, 12, 'counsellor', 'hey ', '2021-11-02 09:06:13'),
(126, 1, 12, 'counsellor', 'how are u', '2021-11-02 09:06:34'),
(127, 1, 12, 'student', 'I am fine', '2021-11-02 09:06:43'),
(128, 1, 12, 'student', 'How are u', '2021-11-02 09:06:48'),
(129, 1, 2, 'student', 'hello', '2021-11-02 11:13:31'),
(130, 1, 2, 'counsellor', 'ms', '2021-11-02 11:13:38');

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
(5, 'How would you describe your friend circle?', 5);

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
(11, 1, '2021-10-31 14:20:06'),
(12, 1, '2021-11-02 08:20:41'),
(13, 20, '2021-11-02 11:12:09');

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
(51, 11, 1, 1),
(52, 11, 2, 6),
(53, 11, 3, 11),
(54, 11, 4, 17),
(55, 11, 5, 18),
(56, 12, 1, 1),
(57, 12, 2, 6),
(58, 12, 3, 11),
(59, 12, 4, 17),
(60, 12, 5, 21),
(61, 13, 1, 1),
(62, 13, 2, 5),
(63, 13, 3, 9),
(64, 13, 4, 13),
(65, 13, 5, 19);

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
(1, 'Dhruv Rishishwar', '20BCS002', 'Male', '6268086918', 'B.Tech', 'CSE'),
(5, 'dsjfahfjl', 'dakfhkj', 'Male', '12345', 'B.Tech', 'CSE'),
(8, 'Dhruv', '20bcs075', 'Male', '6268086918', 'B.Tech', 'CSE'),
(14, 'sadajhfl', 'sjkhasfjl', 'Other', '0987654321', 'B.Tech', 'ECE'),
(15, 'a', 'jafnaslfsal', 'Other', '1234567890', 'M.Tech', 'ECE'),
(16, 'sdafjdbfk', 'aksdjnfsk', 'Female', '1123123123', 'B.Tech', 'ECE'),
(20, 'mili', 'ahfaskf', 'Female', '1234567890', 'B.Tech', 'ECE');

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
  MODIFY `feed_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `logins`
--
ALTER TABLE `logins`
  MODIFY `user_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `mess_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=131;

--
-- AUTO_INCREMENT for table `questions`
--
ALTER TABLE `questions`
  MODIFY `ques_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `response`
--
ALTER TABLE `response`
  MODIFY `res_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `response_list`
--
ALTER TABLE `response_list`
  MODIFY `rl_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `stud_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `stud_feedback`
--
ALTER TABLE `stud_feedback`
  MODIFY `feed_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

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
