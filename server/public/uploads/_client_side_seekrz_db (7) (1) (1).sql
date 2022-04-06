-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 06, 2021 at 09:02 AM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: ` client_side_seekrz_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `authorize_transaction`
--

CREATE TABLE `authorize_transaction` (
  `id` int(11) NOT NULL,
  `trade_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `authorized_amount` double DEFAULT NULL,
  `payment_gateway_txn_id` varchar(45) DEFAULT NULL COMMENT 'Authorization ID returned by payment gateway.',
  `create_time` timestamp NULL DEFAULT NULL,
  `update_time` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `avatars`
--

CREATE TABLE `avatars` (
  `id` int(11) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `url` varchar(150) DEFAULT NULL,
  `price_seekrz_bucks` int(11) DEFAULT NULL,
  `used` tinyint(4) DEFAULT 0,
  `create_time` timestamp NULL DEFAULT current_timestamp(),
  `update_time` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `backgrounds`
--

CREATE TABLE `backgrounds` (
  `id` int(11) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `color_code` varchar(20) DEFAULT NULL,
  `url` varchar(150) DEFAULT NULL,
  `price_seekrz_bucks` int(11) DEFAULT NULL,
  `used` tinyint(4) DEFAULT NULL,
  `create_time` timestamp NULL DEFAULT current_timestamp(),
  `update_time` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `brands`
--

CREATE TABLE `brands` (
  `id` int(11) NOT NULL,
  `brand` varchar(45) DEFAULT NULL,
  `parent_brand` varchar(45) DEFAULT NULL,
  `brand_image` varchar(200) DEFAULT NULL,
  `is_active` tinyint(4) DEFAULT NULL,
  `create_time` timestamp NULL DEFAULT current_timestamp(),
  `update_time` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `brand_preferences`
--

CREATE TABLE `brand_preferences` (
  `id` int(11) NOT NULL,
  `create_time` timestamp NULL DEFAULT current_timestamp(),
  `update_time` timestamp NULL DEFAULT NULL,
  `brand_id` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `category` varchar(255) DEFAULT NULL,
  `is_active` tinyint(4) DEFAULT NULL,
  `create_time` timestamp NULL DEFAULT current_timestamp(),
  `update_time` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `check_guide`
--

CREATE TABLE `check_guide` (
  `check_guide_id` int(11) NOT NULL,
  `style_id` int(11) DEFAULT NULL,
  `sub_category_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `check_guide_details`
--

CREATE TABLE `check_guide_details` (
  `check_guide_details_id` int(11) NOT NULL,
  `check_section_description` varchar(100) DEFAULT NULL COMMENT 'More detail text if any. Include newline for sections 1, 2, 3 etc so they render properly in the app',
  `check_detail` varchar(200) DEFAULT NULL,
  `check_guide_id` int(11) DEFAULT NULL,
  `check_guide_section_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `check_guide_images`
--

CREATE TABLE `check_guide_images` (
  `check_guide_images_id` int(11) NOT NULL,
  `url` varchar(45) DEFAULT NULL COMMENT 'there can be one or more images for each section',
  `check_guide_details_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `check_guide_section`
--

CREATE TABLE `check_guide_section` (
  `check_guide_section_id` int(11) NOT NULL,
  `sub_category_id` int(11) DEFAULT NULL,
  `check_guide_section_type` varchar(45) DEFAULT NULL COMMENT 'PART, GENERAL',
  `check_guide_section` varchar(45) DEFAULT NULL,
  `check_guide_sub_section` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `counter_user`
--

CREATE TABLE `counter_user` (
  `id` int(11) NOT NULL,
  `trade_id` int(11) DEFAULT NULL,
  `listings_id` int(11) DEFAULT NULL,
  `counter_user_id` int(11) DEFAULT NULL,
  `cash` float DEFAULT NULL,
  `listing_status` enum('ACTIVE','TRADED','REMOVED','') DEFAULT NULL COMMENT 'ACTIVE, TRADED, REMOVED',
  `listing_original_price` double DEFAULT NULL COMMENT 'Original List Price or SPL price',
  `listing_trade_price` double DEFAULT NULL,
  `seekrz_guarantee` enum('NO','YES','REQUESTED','DECLINED') DEFAULT NULL COMMENT 'Current status of SEEKRZ Guarantee. Lister can choose to offer Guarantee just for this Trade.\nNO, YES, REQUESTED, DECLINED',
  `open_to_trade` enum('NO','YES','REQUESTED','DECLINED') DEFAULT NULL COMMENT 'Current status of Open TO Trade. Lister can choose to open listing  for trade negotiations just for this Trade.\nNO, YES, REQUESTED, DECLINED',
  `create_time` datetime DEFAULT NULL,
  `update_time` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `countries`
--

CREATE TABLE `countries` (
  `id` int(11) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `currency` varchar(45) DEFAULT NULL,
  `is_active` tinyint(4) DEFAULT NULL,
  `create_time` timestamp NULL DEFAULT current_timestamp(),
  `update_time` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `devices_logs`
--

CREATE TABLE `devices_logs` (
  `id` int(11) NOT NULL,
  `device_type` varchar(50) DEFAULT NULL,
  `device_name` varchar(150) DEFAULT NULL,
  `device_id` varchar(255) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  `auth_token` text DEFAULT NULL,
  `push_token` varchar(255) DEFAULT NULL,
  `device_os` enum('ios','android','windows','mac','web') DEFAULT NULL,
  `app_version` varchar(50) DEFAULT NULL,
  `timezone` varchar(45) DEFAULT NULL,
  `is_login` tinyint(1) NOT NULL DEFAULT 1,
  `country` varchar(50) DEFAULT NULL,
  `create_time` datetime NOT NULL DEFAULT current_timestamp(),
  `update_time` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `failed_barcode`
--

CREATE TABLE `failed_barcode` (
  `id` int(11) NOT NULL,
  `barcode` varchar(100) DEFAULT NULL,
  `create_time` datetime NOT NULL DEFAULT current_timestamp(),
  `update_time` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `feedback_tags`
--

CREATE TABLE `feedback_tags` (
  `id` int(11) NOT NULL,
  `feedback_tag` varchar(45) DEFAULT NULL,
  `create_time` timestamp NULL DEFAULT current_timestamp(),
  `update_time` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `halo`
--

CREATE TABLE `halo` (
  `id` int(11) NOT NULL COMMENT 'When user rating change we will update the halo and rating in the user table\n',
  `color_code` varchar(45) DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  `ratings_range_max` decimal(2,0) DEFAULT NULL,
  `ratings_range_min` decimal(2,0) DEFAULT NULL,
  `create_time` timestamp NULL DEFAULT current_timestamp(),
  `update_time` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `images`
--

CREATE TABLE `images` (
  `id` int(11) NOT NULL COMMENT 'Type : is master and listing and blog image and style community images\n\n',
  `url` varchar(45) DEFAULT NULL,
  `type` enum('MASTER','LISTING','COMMUNITY','BLOG','OVERLAY','VIDEO') DEFAULT NULL,
  `create_time` timestamp NULL DEFAULT NULL,
  `update_time` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `image_angles`
--

CREATE TABLE `image_angles` (
  `id` int(11) NOT NULL,
  `category_id` int(11) DEFAULT NULL,
  `sub_category_id` int(11) DEFAULT NULL,
  `image_angle` varchar(100) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `overlay_url_id` int(11) DEFAULT NULL,
  `video_url_id` int(11) DEFAULT NULL,
  `create_time` timestamp NULL DEFAULT NULL,
  `update_time` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `influencers`
--

CREATE TABLE `influencers` (
  `id` int(11) NOT NULL,
  `update_time` timestamp NULL DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  `address` varchar(500) DEFAULT NULL,
  `phone_number` varchar(15) DEFAULT NULL,
  `is_active` tinyint(4) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `website` varchar(45) DEFAULT NULL,
  `	partner_id` varchar(45) DEFAULT NULL,
  `timezone` varchar(45) DEFAULT NULL,
  `create_time` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `interactions`
--

CREATE TABLE `interactions` (
  `id` int(11) NOT NULL COMMENT 'This is master for all the activity interaction, bought, recommended. ',
  `interaction` varchar(45) DEFAULT NULL,
  `	interaction_value` decimal(2,0) DEFAULT NULL,
  `	create_time` timestamp NULL DEFAULT NULL,
  `update_time` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `listing`
--

CREATE TABLE `listing` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `style_id` int(11) DEFAULT NULL,
  `condition_id` int(11) DEFAULT NULL,
  `size_id` int(11) DEFAULT NULL,
  `list_price` double DEFAULT NULL,
  `spl_offer_price` double DEFAULT NULL COMMENT 'Offer price to the users who are seeing this listing in reccomendation as well as the users who are followig this listing.',
  `	store_special_price` double DEFAULT NULL COMMENT 'Offer price to the users who are seeing this listing in reccomendation as well as the users who are followig this listing.',
  `recommendation_price` double DEFAULT NULL COMMENT 'This is price which is retune by the price ML model which suggest to user during add listing ',
  `box_condition` varchar(45) DEFAULT NULL COMMENT 'box_condition will have following option like Original, No box, Replaced.',
  `open_to_trade` varchar(100) DEFAULT NULL,
  `seekrz_guarantee` tinyint(4) DEFAULT NULL,
  `traded_user_id` int(11) DEFAULT NULL COMMENT 'Who final the trade ',
  `traded_price` double DEFAULT NULL,
  `store_fixed_price` double DEFAULT NULL COMMENT 'Fixed price offered by Store to Other Store customers',
  `trade_time` datetime DEFAULT NULL,
  `status` tinyint(4) DEFAULT NULL COMMENT 'For the active and inactive listing\n',
  `verification` tinyint(4) DEFAULT NULL COMMENT 'Does this listing needs to be verified manually',
  `listing_type` enum('user','store','other') DEFAULT NULL COMMENT 'USER, STORE',
  `completion_stage` enum('LABELS','MARKS','PICS','DETAILS','LISTED','RELISTED','TRADED','REMOVED','AUTHENTICATION') DEFAULT NULL COMMENT 'listing status: LABELS,  MARKS, PICS, AUTHENTICATION, DETAILS, LISTED, REMOVED, TRADED,  RELISTED (if this listing was relisted)',
  `listing_main_image` varchar(45) DEFAULT NULL COMMENT 'Image that will be displayed for this listing. It should be one of right or left angles.',
  `create_time` datetime DEFAULT NULL,
  `	update_time` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `listing_box_label`
--

CREATE TABLE `listing_box_label` (
  `id` int(11) NOT NULL,
  `made_in` varchar(45) DEFAULT NULL,
  `size_uk` varchar(20) DEFAULT NULL,
  `size_us` varchar(20) DEFAULT NULL,
  `size_eu` varchar(20) DEFAULT NULL,
  `size_jp` varchar(20) DEFAULT NULL,
  `size_chn` varchar(20) DEFAULT NULL,
  `size_cm` varchar(20) DEFAULT NULL,
  `size_d` varchar(20) DEFAULT NULL,
  `gender` varchar(45) DEFAULT NULL,
  `color` varchar(45) DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  `upc_number` varchar(45) DEFAULT NULL,
  `box_barcode` varchar(45) DEFAULT NULL,
  `box_label_text` varchar(45) DEFAULT NULL,
  `box_label_url` varchar(45) DEFAULT NULL,
  `is_damaged` tinyint(1) DEFAULT NULL,
  `is_missing` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `listing_check_details`
--

CREATE TABLE `listing_check_details` (
  `listing_check_report` int(11) NOT NULL,
  `listing_check_guide_id` int(11) DEFAULT NULL,
  `check_guide_details_id` int(11) DEFAULT NULL,
  `check_status` varchar(45) DEFAULT NULL COMMENT 'ACCEPT, CONDITIONAL, REJECT',
  `check_reason` varchar(200) DEFAULT NULL,
  `check_reason_image_url` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `listing_check_guide`
--

CREATE TABLE `listing_check_guide` (
  `listing_check_guide_id` int(11) NOT NULL,
  `listings_id` int(11) DEFAULT NULL,
  `validated_by_user` varchar(45) DEFAULT NULL,
  `validation_date` date DEFAULT NULL,
  `validationt_status` varchar(45) DEFAULT NULL COMMENT 'ACCEPT, CONDITIONAL, REJECT'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `listing_images`
--

CREATE TABLE `listing_images` (
  `id` int(11) NOT NULL,
  `listing_id` int(11) DEFAULT NULL,
  `original_image_id` int(11) DEFAULT NULL,
  `clean_image_id` int(11) DEFAULT NULL,
  `style_image_angle_id` int(11) DEFAULT NULL,
  `listing_usemarks_id` int(11) DEFAULT NULL,
  `listing_image_type` varchar(45) DEFAULT NULL COMMENT 'Style, Usemark ',
  `clean_image_active` tinyint(4) DEFAULT NULL,
  `confidence_index` double DEFAULT NULL COMMENT 'Confidence level returned by ML mmodel',
  `is_default` tinyint(1) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `	update_time` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `listing_production_label`
--

CREATE TABLE `listing_production_label` (
  `id` int(11) NOT NULL,
  `listing_id` int(11) DEFAULT NULL,
  `listing_label_Id` int(11) DEFAULT NULL,
  `label_type` varchar(45) DEFAULT NULL COMMENT 'label_type is BOX, L-SIZE, R-SIZE, TAG, SIZE-1, SIZE-2'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `listing_recommendations`
--

CREATE TABLE `listing_recommendations` (
  `id` int(11) NOT NULL,
  `listing_id` int(11) DEFAULT NULL,
  `active` tinyint(4) DEFAULT 1,
  `pin` tinyint(4) DEFAULT 0,
  `pin_time` datetime DEFAULT NULL,
  `is_seen` tinyint(4) DEFAULT 0 COMMENT 'When new recommendation created then seen is false. When user checks them out then seek is true.',
  `is_archived` tinyint(4) DEFAULT 0,
  `create_time` datetime DEFAULT NULL,
  `update_time` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `listing_recommendations_listing`
--

CREATE TABLE `listing_recommendations_listing` (
  `id` int(11) NOT NULL,
  `listings_id` int(11) DEFAULT NULL,
  `listing_recommendations_id` int(11) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `update_time` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `listing_size_label`
--

CREATE TABLE `listing_size_label` (
  `id` int(11) NOT NULL,
  `size_barcode` varchar(45) DEFAULT NULL,
  `made_in` varchar(45) DEFAULT NULL,
  `size_uk` varchar(45) DEFAULT NULL,
  `size_us` varchar(45) DEFAULT NULL,
  `size_eu` varchar(45) DEFAULT NULL,
  `size_jp` varchar(45) DEFAULT NULL,
  `size_chn` varchar(45) DEFAULT NULL,
  `size_cm` varchar(45) DEFAULT NULL,
  `gender` varchar(45) DEFAULT NULL,
  `factory` varchar(45) DEFAULT NULL,
  `start_pod_date` datetime DEFAULT NULL,
  `end_pod_date` datetime DEFAULT NULL,
  `upc_po_number` varchar(45) DEFAULT NULL,
  `size_label_text` varchar(45) DEFAULT NULL,
  `	size_label_location` varchar(45) DEFAULT NULL,
  `size_label_url` varchar(45) DEFAULT NULL,
  `size_label_type` varchar(45) DEFAULT NULL COMMENT 'L-SIZE, R-SIZE, TAG, SIZE-1, SIZE-2',
  `is_damaged` tinyint(4) DEFAULT 0,
  `is_missing` tinyint(4) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `listing_trade_preference`
--

CREATE TABLE `listing_trade_preference` (
  `id` int(11) NOT NULL,
  `listings_id` int(11) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `parent_sub_category_id` int(11) DEFAULT NULL,
  `	brand_id` int(11) DEFAULT NULL,
  `size_min_id` int(11) DEFAULT NULL,
  `size_max_id` int(11) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `sub_category_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `listing_usemark`
--

CREATE TABLE `listing_usemark` (
  `id` int(11) NOT NULL,
  `	listing_id` int(11) DEFAULT NULL,
  `usemake_type` varchar(45) DEFAULT NULL COMMENT 'Box usemark or item usemark\n',
  `usemark_id` int(11) DEFAULT NULL,
  `image_angle_id` int(11) DEFAULT NULL,
  `usemark_damage_description_id` int(11) DEFAULT NULL,
  `severity` float DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `update_time` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `master_box_label`
--

CREATE TABLE `master_box_label` (
  `id` int(11) NOT NULL,
  `style_id` int(11) DEFAULT NULL,
  `	style_number` varchar(45) DEFAULT NULL,
  `made_in` varchar(45) DEFAULT NULL,
  `size_us` varchar(45) DEFAULT NULL,
  `size_uk` varchar(45) DEFAULT NULL,
  `size_eu` varchar(45) DEFAULT NULL,
  `size_jp` varchar(45) DEFAULT NULL,
  `size_chn` varchar(45) DEFAULT NULL,
  `size_cm` varchar(45) DEFAULT NULL,
  `size_d` varchar(45) DEFAULT NULL,
  `gender` varchar(45) DEFAULT NULL,
  `color` varchar(45) DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  `upc_number` varchar(45) DEFAULT NULL,
  `box_barcode` varchar(45) DEFAULT NULL,
  `box_label_text` varchar(45) DEFAULT NULL,
  `box_label_url` varchar(45) DEFAULT NULL,
  `	validated` tinyint(4) DEFAULT NULL COMMENT 'If the master data has been validated or not. TRUE or FALSE'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `master_size_label`
--

CREATE TABLE `master_size_label` (
  `id` int(11) NOT NULL,
  `size_barcode` varchar(45) DEFAULT NULL,
  `style_id` int(11) DEFAULT NULL,
  `made_in` varchar(45) DEFAULT NULL,
  `size_uk` varchar(45) DEFAULT NULL,
  `size_us` varchar(45) DEFAULT NULL,
  `size_eu` varchar(45) DEFAULT NULL,
  `size_jp` varchar(45) DEFAULT NULL,
  `size_chn` varchar(45) DEFAULT NULL,
  `size_cm` varchar(45) DEFAULT NULL,
  `gender` varchar(45) DEFAULT NULL,
  `factory` varchar(45) DEFAULT NULL,
  `start_pod_date` datetime DEFAULT NULL,
  `end_pod_date` datetime DEFAULT NULL,
  `upc_po_number` varchar(45) DEFAULT NULL,
  `size_label_text` varchar(45) DEFAULT NULL,
  `size_label_location` varchar(45) DEFAULT NULL COMMENT 'Size label location on the item e.g. RIGHT, LEFT, SIZE1. SIZE2, TAG',
  `size_label_url` varchar(45) DEFAULT NULL,
  `validated` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `message_master`
--

CREATE TABLE `message_master` (
  `id` int(11) NOT NULL COMMENT 'Standardized message text ',
  `message_name` varchar(45) DEFAULT NULL,
  `message_text` varchar(45) DEFAULT NULL,
  `action` varchar(45) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `	update_time` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `no_authentication_proof_in_hand`
--

CREATE TABLE `no_authentication_proof_in_hand` (
  `no_authentication_proof_in_hand_id` int(11) NOT NULL,
  `no_authentication_shipping_id` int(11) NOT NULL,
  `listings_id` int(11) DEFAULT NULL,
  `image_angle_id` int(11) DEFAULT NULL,
  `overlay_url` varchar(45) DEFAULT NULL,
  `original_image_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `no_authentication_shipping`
--

CREATE TABLE `no_authentication_shipping` (
  `no_authentication_shipping_id` int(11) NOT NULL,
  `trade_id` int(11) NOT NULL,
  `offer_user_id` int(11) NOT NULL,
  `counter_user_id` int(11) NOT NULL,
  `verification_status` tinyint(4) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `offer_user`
--

CREATE TABLE `offer_user` (
  `id` int(11) NOT NULL,
  `trade_id` int(11) DEFAULT NULL,
  `offer_user_id` int(11) DEFAULT NULL,
  `listings_id` int(11) DEFAULT NULL,
  `cash` double DEFAULT NULL,
  `listing_status` enum('ACTIVE','TRADED','REMOVED') DEFAULT NULL COMMENT 'ACTIVE, TRADED, REMOVED',
  `listing_original_price` double DEFAULT NULL COMMENT 'Original List Price or SPL price',
  `listing_trade_price` double DEFAULT NULL,
  `	seekrz_guarantee` enum('NO','YES','REQUESTED','DECLINED') DEFAULT NULL COMMENT 'Current status of SEEKRZ Guarantee. Lister can choose to offer Guarantee just for this Trade.\nNO, YES, REQUESTED, DECLINED',
  `	open_to_trade` enum('NO','YES','REQUESTED','DECLINED') DEFAULT NULL COMMENT 'Current status of Open TO Trade. Lister can choose to open listing  for trade negotiations just for this Trade.\nNO, YES, REQUESTED, DECLINED',
  `create_time` datetime DEFAULT NULL,
  `update_time` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `parameters_master`
--

CREATE TABLE `parameters_master` (
  `id` int(11) NOT NULL,
  `trade_commission` double DEFAULT NULL COMMENT 'Commision charged for a sale.',
  `guarantee_fee` double DEFAULT NULL,
  `sbucks_conversion_rate` double DEFAULT NULL COMMENT 'conversion rate for converting SBUCKS to $$',
  `min_sbucks` double DEFAULT NULL COMMENT 'minimum sbucks needed to use in redemption',
  `	max_store_discount` int(11) DEFAULT NULL,
  `percent_shipping_markup` int(11) DEFAULT NULL,
  `create_time` datetime DEFAULT current_timestamp(),
  `update_time` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `partners`
--

CREATE TABLE `partners` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `timezone` varchar(45) DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  `pater_type` enum('store-owner','influencer') DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `password` varchar(45) DEFAULT NULL,
  `address` varchar(500) DEFAULT NULL,
  `phone_number` varchar(15) DEFAULT NULL,
  `create_time` timestamp NULL DEFAULT current_timestamp(),
  `update_time` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `partner_avatars`
--

CREATE TABLE `partner_avatars` (
  `id` int(11) NOT NULL,
  `is_active` tinyint(4) DEFAULT NULL,
  `create_time` timestamp NULL DEFAULT current_timestamp(),
  `update_time` timestamp NULL DEFAULT NULL,
  `avatar_id` int(11) DEFAULT NULL,
  `	partner_id` int(11) DEFAULT NULL,
  `is_default` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `patner_backgrounds`
--

CREATE TABLE `patner_backgrounds` (
  `id` int(11) NOT NULL,
  `is_active` tinyint(4) DEFAULT NULL,
  `create_time` timestamp NULL DEFAULT current_timestamp(),
  `update_time` timestamp NULL DEFAULT NULL,
  `background_id` int(11) DEFAULT NULL,
  `partner_id` int(11) DEFAULT NULL,
  `is_default` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `preferences_sub_category`
--

CREATE TABLE `preferences_sub_category` (
  `id` int(11) NOT NULL,
  `category_id` int(11) DEFAULT NULL,
  `sub_category_id` int(11) DEFAULT NULL,
  `create_time` timestamp NULL DEFAULT current_timestamp(),
  `update_time` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `product_condition`
--

CREATE TABLE `product_condition` (
  `id` int(11) NOT NULL,
  `pcondition` varchar(100) NOT NULL,
  `description` varchar(250) NOT NULL,
  `create_time` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `proof_in_hand_verification`
--

CREATE TABLE `proof_in_hand_verification` (
  `proof_in_hand_verification_id` int(11) NOT NULL,
  `no_authentication_proof_in_hand_id` int(11) NOT NULL,
  `varification_image_id` int(11) DEFAULT NULL,
  `varification_status` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `seekrz_bucks`
--

CREATE TABLE `seekrz_bucks` (
  `user_id` int(11) NOT NULL,
  `seekrz_bucks_promo_id` int(11) NOT NULL DEFAULT 0,
  `trade_id1` int(11) NOT NULL DEFAULT 0,
  `id` int(11) NOT NULL,
  `trade_id` varchar(45) DEFAULT '0',
  `txn_type` enum('credit','debit') DEFAULT NULL COMMENT 'Credit and Debit',
  `buck_value` int(11) DEFAULT NULL,
  `create_time` datetime DEFAULT current_timestamp(),
  `update_time` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `seekrz_bucks_earn_tasks`
--

CREATE TABLE `seekrz_bucks_earn_tasks` (
  `sbucks_earn_tasks_id` int(11) NOT NULL,
  `task_type` varchar(45) DEFAULT NULL COMMENT 'PROFILE, SHARE, IMAGE, FEEDBACK',
  `task` varchar(45) DEFAULT NULL,
  `sbucks` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `seekrz_bucks_promo`
--

CREATE TABLE `seekrz_bucks_promo` (
  `id` int(11) NOT NULL,
  `name` varchar(45) DEFAULT NULL COMMENT 'SIGNUP, BONUS',
  `value` int(11) DEFAULT NULL,
  `	bucks_value` int(11) DEFAULT NULL,
  `	type` tinyint(2) DEFAULT NULL,
  `is_active` tinyint(4) DEFAULT NULL COMMENT 'ACTIVE',
  `create_time` timestamp NULL DEFAULT current_timestamp(),
  `update_time` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `seekrz_bucks_redeem_tasks`
--

CREATE TABLE `seekrz_bucks_redeem_tasks` (
  `sbucks_redeem_tasks_id` int(11) NOT NULL,
  `task_type` varchar(45) DEFAULT NULL COMMENT 'AVATAR, BACKGROUND, TRADE',
  `task` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `seekrz_bucks_txns`
--

CREATE TABLE `seekrz_bucks_txns` (
  `sbucks_txns_id` int(11) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  `sbuck_txn_type_id` int(11) NOT NULL,
  `trade_id` int(11) NOT NULL DEFAULT 0,
  `sbucks_promo_id` int(11) NOT NULL DEFAULT 0,
  `credit` tinyint(4) DEFAULT NULL COMMENT 'Credit and Debit\n',
  `sbuck` int(11) DEFAULT NULL,
  `create_time` timestamp NULL DEFAULT current_timestamp(),
  `update_time` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `seekrz_bucks_value`
--

CREATE TABLE `seekrz_bucks_value` (
  `id` int(11) NOT NULL,
  `bucks_value` decimal(2,0) DEFAULT NULL,
  `status` tinyint(4) DEFAULT NULL,
  `country_id` int(11) DEFAULT NULL,
  `create_time` timestamp NULL DEFAULT current_timestamp(),
  `update_time` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `seekrz_buck_txn_type`
--

CREATE TABLE `seekrz_buck_txn_type` (
  `id` int(11) NOT NULL,
  `txn_type` varchar(45) DEFAULT NULL COMMENT 'TRADE, SHARE, PROMO, REDEEM, AVATAR, BACKGROUND',
  `create_time` timestamp NULL DEFAULT current_timestamp(),
  `update_time` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `seekrz_team`
--

CREATE TABLE `seekrz_team` (
  `id` int(11) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `password` varchar(45) DEFAULT NULL,
  `role_id` varchar(45) DEFAULT NULL,
  `is_active` tinyint(4) DEFAULT NULL,
  `profile_url` varchar(45) DEFAULT NULL,
  `	is_reset_password` tinyint(4) DEFAULT NULL,
  `seekrz_team_role_id` int(11) DEFAULT NULL,
  `create_time` timestamp NULL DEFAULT current_timestamp(),
  `update_time` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `seekrz_team_role`
--

CREATE TABLE `seekrz_team_role` (
  `id` int(11) NOT NULL,
  `role` varchar(45) DEFAULT NULL,
  `permissions` varchar(45) DEFAULT NULL,
  `is_active` tinyint(4) DEFAULT NULL,
  `create_time` timestamp NULL DEFAULT current_timestamp(),
  `update_time` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `shipping_label`
--

CREATE TABLE `shipping_label` (
  `id` int(11) NOT NULL,
  `trade_id` varchar(45) DEFAULT NULL,
  `	shipping_id` varchar(45) DEFAULT NULL,
  `	tracking_id` varchar(45) DEFAULT NULL,
  `service_level_token` varchar(45) DEFAULT NULL,
  `	carrier_account` varchar(45) DEFAULT NULL,
  `	tracking_number` varchar(45) DEFAULT NULL,
  `buyer_user_id` int(20) DEFAULT NULL,
  `	seller_user_id` int(20) DEFAULT NULL,
  `	buyer_user_address_id` int(20) DEFAULT NULL,
  `	seller_user_address_id` int(20) DEFAULT NULL,
  `label_url` varchar(45) DEFAULT NULL,
  `weight` double DEFAULT NULL,
  `box_length` int(11) DEFAULT NULL,
  `box_width` int(11) DEFAULT NULL,
  `box_height` int(11) DEFAULT NULL,
  `cost` double DEFAULT NULL,
  `	distance_unit` varchar(45) DEFAULT NULL,
  `	mass_unit` varchar(45) DEFAULT NULL,
  `create_time` timestamp NULL DEFAULT NULL,
  `update_time` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `shipping_master`
--

CREATE TABLE `shipping_master` (
  `id` int(11) NOT NULL,
  `category_id` int(11) DEFAULT NULL,
  `sub_category_id` int(11) DEFAULT NULL COMMENT 'SHOES, T-SHIRT, HOODIE, BOTTOM, JACKET',
  `weight` double DEFAULT NULL,
  `box_length` int(11) DEFAULT NULL,
  `box_width` int(11) DEFAULT NULL,
  `box_height` int(11) DEFAULT NULL,
  `description` varchar(45) DEFAULT NULL,
  `comment` varchar(45) DEFAULT NULL,
  `distance_unit` varchar(45) DEFAULT NULL,
  `	mass_unit` varchar(45) DEFAULT NULL,
  `	create_time` datetime DEFAULT NULL,
  `update_time` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `sizes`
--

CREATE TABLE `sizes` (
  `id` int(11) NOT NULL COMMENT 'Preference subcategories will have all top, all bottom and all shoes ',
  `sub_category_id` int(11) DEFAULT NULL,
  `size` varchar(45) DEFAULT NULL,
  `country_id` int(11) DEFAULT NULL,
  `create_time` timestamp NULL DEFAULT current_timestamp(),
  `update_time` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `social_accounts`
--

CREATE TABLE `social_accounts` (
  `id` int(11) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `is_active` tinyint(4) DEFAULT NULL,
  `create_time` timestamp NULL DEFAULT current_timestamp(),
  `update_time` timestamp NULL DEFAULT NULL,
  `url` varchar(45) DEFAULT NULL,
  `store_id` int(11) DEFAULT NULL,
  `influencer_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `states`
--

CREATE TABLE `states` (
  `id` int(11) NOT NULL,
  `state_code` char(2) NOT NULL,
  `state_name` varchar(50) NOT NULL,
  `country_id` int(11) NOT NULL DEFAULT 1
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `stores`
--

CREATE TABLE `stores` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  `address` varchar(45) DEFAULT NULL,
  `latitude` decimal(10,4) DEFAULT NULL,
  `longitude` decimal(10,4) DEFAULT NULL,
  `partner_id` int(11) DEFAULT NULL,
  `image` varchar(45) DEFAULT NULL,
  `create_time` timestamp NULL DEFAULT current_timestamp(),
  `update_time` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `stores`
--

INSERT INTO `stores` (`id`, `user_id`, `name`, `address`, `latitude`, `longitude`, `partner_id`, `image`, `create_time`, `update_time`) VALUES
(1, 22, 'new store 1', 'Ahm djsd', '23.0304', NULL, NULL, NULL, '2021-10-01 07:14:01', NULL),
(2, 22, 'new store 1', 'Ahm djsd', '23.0304', '72.5178', 5, 'ss.jpg', '2021-10-01 07:17:31', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `store_employees`
--

CREATE TABLE `store_employees` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  `is_active` tinyint(4) DEFAULT NULL,
  `store_id` int(11) DEFAULT NULL,
  `timezone` varchar(45) DEFAULT NULL,
  `create_time` timestamp NULL DEFAULT current_timestamp(),
  `update_time` timestamp NULL DEFAULT NULL,
  `role_type` varchar(45) DEFAULT NULL,
  `pin` varchar(45) DEFAULT NULL,
  `username` varchar(45) DEFAULT NULL,
  `password` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `style`
--

CREATE TABLE `style` (
  `id` int(11) NOT NULL,
  `	sku` varchar(45) DEFAULT NULL,
  `category_id` varchar(45) DEFAULT NULL,
  `	subcategory_id` varchar(45) DEFAULT NULL,
  `	brand_id` varchar(45) DEFAULT NULL,
  `	subbrand_id` varchar(45) DEFAULT NULL,
  `gender_id` varchar(45) DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  `color` varchar(45) DEFAULT NULL,
  `image_id` varchar(45) DEFAULT NULL,
  `is_validated` tinyint(4) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `update_time` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `style_gender`
--

CREATE TABLE `style_gender` (
  `id` int(11) NOT NULL,
  `gender` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `style_popularity_index`
--

CREATE TABLE `style_popularity_index` (
  `id` int(11) NOT NULL,
  `style_Id` int(11) NOT NULL,
  `popularity_rank` int(11) NOT NULL,
  `create_time` timestamp NULL DEFAULT current_timestamp(),
  `update_time` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `sub_category`
--

CREATE TABLE `sub_category` (
  `id` int(11) NOT NULL,
  `sub_category` varchar(45) DEFAULT NULL,
  `parent_sub_category_id` int(11) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `create_time` timestamp NULL DEFAULT current_timestamp(),
  `update_time` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `system_messages`
--

CREATE TABLE `system_messages` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `message_category` varchar(45) DEFAULT NULL COMMENT 'PROMO, ACTION etc.',
  `message` varchar(45) DEFAULT NULL,
  `active` tinyint(4) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `update_time` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `system_user_messages`
--

CREATE TABLE `system_user_messages` (
  `id` int(11) NOT NULL COMMENT 'System messages for the USER e.g. Free Shipping etc.',
  `user_id` int(11) DEFAULT NULL,
  `message` varchar(45) DEFAULT NULL,
  `message_type` varchar(45) DEFAULT NULL COMMENT 'PROMO, DISCOUNT, INFO, GENERAL',
  `active` tinyint(4) DEFAULT NULL,
  `	create_time` varchar(45) DEFAULT NULL,
  `update_time` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `timestamps`
--

CREATE TABLE `timestamps` (
  `create_time` timestamp NULL DEFAULT current_timestamp(),
  `update_time` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `trades`
--

CREATE TABLE `trades` (
  `id` int(11) NOT NULL,
  `offer_user_id` int(11) DEFAULT NULL,
  `counter_user_id` int(11) DEFAULT NULL,
  `trade_status` varchar(45) DEFAULT NULL COMMENT 'TEXT, ACTIVE, TRADED, COMPLETED, RETIRED(7 DAYS) , LISTING TRADED',
  `	offer_card_id` int(11) DEFAULT NULL,
  `	counter_card_id` int(11) DEFAULT NULL,
  `offer_address_id` int(11) DEFAULT NULL,
  `	counter_address_id` int(11) DEFAULT NULL,
  `offer_status` varchar(45) DEFAULT NULL COMMENT 'TEXT SENT, TEXT RECEIVED, OFFER SENT,  OFFER RECEIVED, COUNTER SENT, COUNTER RECEIVED, DECLINE SENT, DECLINED RECEIVED.ACCEPTANCE SENT, ACCEPTANCE RECEIVED, TRADE AUTHORIZED, TRADE SHIPPED,TRADE REJECTED, TRADE RECEIVED',
  `counter_status` varchar(45) DEFAULT NULL COMMENT 'TEXT SENT, TEXT RECEIVED, OFFER SENT,  OFFER RECEIVED, COUNTER SENT, COUNTER RECEIVED, DECLINE SENT, DECLINED RECEIVED.ACCEPTANCE SENT, ACCEPTANCE RECEIVED, TRADE AUTHORIZED, TRADE SHIPPED, TRADE REJECTED,TRADE RECEIVED',
  `final_trade_value` double DEFAULT NULL COMMENT 'Final Trade value once Trade is accepted.',
  `create_time` timestamp NULL DEFAULT current_timestamp(),
  `update_time` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `trade_messages`
--

CREATE TABLE `trade_messages` (
  `trade_message_id` int(11) NOT NULL,
  `trade_id` int(11) DEFAULT NULL,
  `sender_id` int(11) DEFAULT NULL,
  `offer_user_id` int(11) DEFAULT NULL,
  `counter_user_id` int(11) DEFAULT NULL,
  `active` tinyint(4) DEFAULT NULL,
  `offer_user_read` tinyint(4) DEFAULT NULL,
  `counter_user_read` tinyint(4) DEFAULT NULL,
  `system_message` tinyint(4) DEFAULT NULL,
  `trade_status` varchar(45) DEFAULT NULL COMMENT 'ACTIVE, TRADED, COMPLETED, RETIRED',
  `	text_message_flagged` tinyint(4) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `	update_time` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `trade_message_details`
--

CREATE TABLE `trade_message_details` (
  `id` int(11) NOT NULL,
  `trade_message_id` int(11) NOT NULL,
  `offer_user_id` varchar(45) DEFAULT NULL,
  `offer_cash` varchar(45) DEFAULT NULL,
  `counter_user_id` varchar(45) DEFAULT NULL,
  `counter_cash` varchar(45) DEFAULT NULL,
  `message_type` enum('TEXT','TRADE','SHIP') CHARACTER SET latin1 NOT NULL,
  `text_message` varchar(45) DEFAULT NULL,
  `text_message_flagged` tinyint(4) DEFAULT NULL COMMENT 'User can flag the message as inappropriate ',
  `offer_action` varchar(45) DEFAULT NULL COMMENT 'TEXT SENT, TEXT RECEIVED, OFFER SENT, OFFER RECEIVED, COUNTER SENT, COUNTER RECEIVED. DECLINE SENT, DECLINE RECEIVED, ACCEPTANCE SENT, ACCEPTANCE RECEIVED, LISTING SOLD, LISTING REMOVED, GUARANTEE REQUEST SENT, GUARANTEE REQUEST RECEIVED, OPEN TRADE REQUEST SENT, OPEN TRADE REQUEST RECEIVED',
  `counter_action` varchar(45) DEFAULT NULL COMMENT 'TEXT SENT, TEXT RECEIVED,  OFFER SENT, OFFER RECEIVED, COUNTER SENT, COUNTER RECEIVED.  ACCEPTANCE SENT, ACCEPTANCE RECEIVED, LISTING SOLD, LISTING REMOVED,  GUARANTEE REQUEST RECEIVED, OPEN TRADE REQUEST RECEIVED',
  `action_needed` tinyint(4) DEFAULT NULL COMMENT 'Action button will be visible or not',
  `action_taken` tinyint(4) DEFAULT NULL COMMENT 'Action has been taken'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='This table dumps each entry of  offer and counter table corresponding to each action as one record.';

-- --------------------------------------------------------

--
-- Table structure for table `trade_message_listings`
--

CREATE TABLE `trade_message_listings` (
  `id` int(11) NOT NULL,
  `listings_id` int(11) DEFAULT NULL,
  `listing_type` varchar(45) DEFAULT NULL COMMENT 'OFFER, COUNTER',
  `trade_message_details_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `trade_settlement`
--

CREATE TABLE `trade_settlement` (
  `id` int(11) NOT NULL,
  `trade_id` int(11) DEFAULT NULL,
  `offer_user_id` int(11) DEFAULT NULL,
  `counter_user_id` int(11) DEFAULT NULL,
  `trade_type` varchar(45) DEFAULT NULL COMMENT 'BUY, SELL, TRADE',
  `total_trade_value` double DEFAULT NULL,
  `sbucks_earned` double DEFAULT NULL,
  `offer_cash` double DEFAULT NULL,
  `offer_cash_type` varchar(45) DEFAULT NULL COMMENT 'OFFERED, ACCEPTED',
  `offer_commission_rate` double DEFAULT NULL,
  `offer_commission_charged` double DEFAULT NULL,
  `offer_guarantee_fee` double DEFAULT NULL,
  `offer_guarantee_listings` int(11) DEFAULT NULL COMMENT 'number of listings that are offering guarantee',
  `offer_user_address_id` int(11) DEFAULT NULL,
  `offer_shipping_cost` double DEFAULT NULL,
  `offer_shipping_weight` double DEFAULT NULL,
  `offer_box_length` int(11) DEFAULT NULL,
  `offer_box_width` int(11) DEFAULT NULL,
  `offer_box_height` int(11) DEFAULT NULL,
  `	offer_distance_unit` varchar(45) DEFAULT NULL,
  `offer_mass_unit` varchar(45) DEFAULT NULL,
  `offer_shipping_description` varchar(45) DEFAULT NULL,
  `offer_shipping_time` int(11) DEFAULT NULL,
  `offer_total_settlement` double DEFAULT NULL,
  `offer_settlement_type` varchar(45) DEFAULT NULL COMMENT 'RECEIVE, PAY, NONE',
  `offer_sbucks_used` double DEFAULT NULL,
  `offer_sbucks_value` double DEFAULT NULL,
  `offer_payment_method_token` varchar(45) DEFAULT NULL,
  `offer_deposit_account_token` varchar(45) DEFAULT NULL,
  `offer_guarantee_store_id` int(11) DEFAULT NULL COMMENT 'user_id of store where offer user will take their listings for Guarantee Process',
  `offer_card_id` int(11) DEFAULT NULL,
  `	offer_address_id` int(11) DEFAULT NULL,
  `counter_cash` double DEFAULT NULL,
  `counter_cash_type` varchar(45) DEFAULT NULL COMMENT 'OFFERED, ACCEPTED',
  `counter_commission_rate` double DEFAULT NULL,
  `counter_commission_charged` double DEFAULT NULL,
  `counter_guarantee_fee` double DEFAULT NULL,
  `counter_guarantee_listings` int(11) DEFAULT NULL COMMENT 'number of listings that are offering guarantee',
  `counter_user_address_id` int(11) DEFAULT NULL,
  `counter_shipping_cost` double DEFAULT NULL,
  `counter_shipping_weight` double DEFAULT NULL,
  `counter_box_length` int(11) DEFAULT NULL,
  `counter_box_width` int(11) DEFAULT NULL,
  `counter_box_height` int(11) DEFAULT NULL,
  `	counter_distance_unit` varchar(45) DEFAULT NULL,
  `	counter_mass_unit` varchar(45) DEFAULT NULL,
  `counter_shipping_description` varchar(45) DEFAULT NULL,
  `counter_shipping_time` int(11) DEFAULT NULL,
  `counter_total_settlement` double DEFAULT NULL,
  `counter_settlement_type` varchar(45) DEFAULT NULL COMMENT 'RECEIVE, PAY, , NONE',
  `counter_sbucks_used` double DEFAULT NULL,
  `counter_sbucks_value` double DEFAULT NULL,
  `counter_payment_method_token` varchar(45) DEFAULT NULL,
  `counter_deposit_account_token` varchar(45) DEFAULT NULL,
  `counter_guarantee_store_id` int(11) DEFAULT NULL COMMENT 'user_id of store where counter user will take their listings for Guarantee Process',
  `counter_card_id` int(11) DEFAULT NULL,
  `	counter_address_id` int(11) DEFAULT NULL,
  `	offer_item_received` int(11) DEFAULT NULL,
  `	offer_charge_id` int(11) DEFAULT NULL,
  `	counter_charge_id` int(11) DEFAULT NULL,
  `offer_settlement_status` enum('CONFIRM','READY_TO_SHIP','SEE_YOU_STORE') DEFAULT NULL,
  `	counter_settlement_status` enum('CONFIRM','READY_TO_SHIP','SEE_YOU_STORE','') DEFAULT NULL,
  `	create_time` varchar(45) DEFAULT NULL,
  `	update_time` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `usemark`
--

CREATE TABLE `usemark` (
  `id` int(11) NOT NULL,
  `usemark` varchar(45) DEFAULT NULL,
  `status` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `usemark_damage`
--

CREATE TABLE `usemark_damage` (
  `usemark_Id` int(11) DEFAULT NULL,
  `usemark_damage_description_id` int(11) DEFAULT NULL,
  `id` int(11) NOT NULL,
  `status` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `usemark_damage_description`
--

CREATE TABLE `usemark_damage_description` (
  `id` int(11) NOT NULL,
  `description` varchar(45) DEFAULT NULL,
  `status` tinyint(4) DEFAULT NULL,
  `	create_time` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `store_id` bigint(11) NOT NULL,
  `user_type` enum('USER','STORE','STORE_EMP') NOT NULL DEFAULT 'USER',
  `first_name` varchar(45) DEFAULT NULL,
  `last_name` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `mobile_number` varchar(45) DEFAULT NULL,
  `handle` varchar(45) DEFAULT NULL,
  `password` varchar(250) DEFAULT NULL,
  `social_type` enum('default','facebook','instagram','google') DEFAULT 'default',
  `social_token` text DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `gender` enum('male','female','other') DEFAULT NULL,
  `rating` float(4,2) DEFAULT NULL,
  `otp` int(10) DEFAULT NULL,
  `is_reset_password` tinyint(1) DEFAULT 0,
  `timezone` varchar(50) DEFAULT NULL,
  `qr_code` varchar(100) DEFAULT NULL,
  `is_biometric_enabled` tinyint(1) NOT NULL DEFAULT 0,
  `onboarding` enum('personal_preference','brand_preference','complete') NOT NULL DEFAULT 'personal_preference',
  `email_verification_token` text DEFAULT NULL,
  `is_email_verified` tinyint(1) NOT NULL DEFAULT 0,
  `create_time` datetime DEFAULT current_timestamp(),
  `update_time` datetime DEFAULT current_timestamp(),
  `halo_id` int(11) NOT NULL DEFAULT 1,
  `size_preference_id` int(11) DEFAULT NULL,
  `stripe_customer_id` varchar(150) NOT NULL,
  `total_sbucks` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `users_card_details`
--

CREATE TABLE `users_card_details` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `card_id` varchar(100) NOT NULL,
  `brand` varchar(50) NOT NULL,
  `exp_month` int(10) NOT NULL,
  `exp_year` int(10) NOT NULL,
  `last4` int(10) NOT NULL,
  `is_default` int(11) NOT NULL DEFAULT 1 COMMENT '1 = default, 0 = not default'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `user_activity`
--

CREATE TABLE `user_activity` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `style_id` int(11) DEFAULT NULL,
  `interaction_id` int(11) DEFAULT NULL,
  `create_time` varchar(45) DEFAULT NULL,
  `update_time` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `user_address`
--

CREATE TABLE `user_address` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `address` varchar(45) DEFAULT NULL,
  `city` varchar(45) DEFAULT NULL,
  `state` varchar(45) DEFAULT NULL,
  `zip` int(11) DEFAULT NULL,
  `is_default` tinyint(4) DEFAULT NULL,
  `	country` varchar(45) DEFAULT NULL,
  `create_time` timestamp NULL DEFAULT NULL,
  `	update_time` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `user_avatars`
--

CREATE TABLE `user_avatars` (
  `id` int(11) NOT NULL,
  `avatar_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `is_active` tinyint(4) DEFAULT NULL,
  `create_time` timestamp NULL DEFAULT current_timestamp(),
  `update_time` timestamp NULL DEFAULT NULL,
  `is_default` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `user_backgrouds`
--

CREATE TABLE `user_backgrouds` (
  `user_patner_backgroudID` int(11) NOT NULL,
  `	is_active` tinyint(4) DEFAULT NULL,
  `create_time` timestamp NULL DEFAULT current_timestamp(),
  `update_time` timestamp NULL DEFAULT NULL,
  `background_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `is_default` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `user_brand_preferences`
--

CREATE TABLE `user_brand_preferences` (
  `id` int(11) NOT NULL,
  `activity` varchar(45) DEFAULT NULL,
  `own_qty` varchar(45) DEFAULT NULL,
  `create_time` timestamp NULL DEFAULT current_timestamp(),
  `update_time` timestamp NULL DEFAULT NULL,
  `brand_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `user_feedbacks`
--

CREATE TABLE `user_feedbacks` (
  `id` int(11) NOT NULL,
  `details` varchar(45) DEFAULT NULL,
  `ratings` decimal(5,0) DEFAULT NULL,
  `status` tinyint(4) DEFAULT NULL COMMENT 'ACTIVE',
  `feedback_user_id` int(11) DEFAULT NULL,
  `create_time` timestamp NULL DEFAULT current_timestamp(),
  `update_time` timestamp NULL DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  `trade_id` int(11) DEFAULT NULL COMMENT 'Trade with which the feedback is associated with.',
  `comment` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `user_feedback_tags`
--

CREATE TABLE `user_feedback_tags` (
  `id` varchar(45) NOT NULL,
  `user_feedback_id` int(11) NOT NULL,
  `feedback_tag_id` int(11) NOT NULL,
  `create_time` timestamp NULL DEFAULT current_timestamp(),
  `update_time` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `user_following`
--

CREATE TABLE `user_following` (
  `following_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `followed_user_id` int(11) DEFAULT NULL,
  `followed_id` int(11) DEFAULT NULL,
  `followed_style_id` int(11) DEFAULT NULL,
  `followed_listing_id` int(11) DEFAULT NULL,
  `following_type` varchar(45) DEFAULT NULL,
  `id` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `user_payments`
--

CREATE TABLE `user_payments` (
  `user_payments_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `payment_gateway_id` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `user_profile_preferences_sub_category`
--

CREATE TABLE `user_profile_preferences_sub_category` (
  `id` int(11) NOT NULL,
  `preferences_sub_category_id` int(11) DEFAULT NULL,
  `create_time` timestamp NULL DEFAULT current_timestamp(),
  `update_time` timestamp NULL DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  `category_id` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `user_recommendations`
--

CREATE TABLE `user_recommendations` (
  `user_recommendations_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `active` tinyblob DEFAULT NULL,
  `pin` tinyint(4) DEFAULT NULL COMMENT 'FLag uset to pin and keep the reccomendation on the top.',
  `pin_time` timestamp NULL DEFAULT NULL,
  `is_archived` varchar(45) DEFAULT NULL,
  `is_seen` tinyint(4) DEFAULT NULL COMMENT 'When new recommendation created then seen is false. When user checks them out then seek is true.',
  `create_time` timestamp NULL DEFAULT current_timestamp(),
  `update_time` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `user_recommendations_listings`
--

CREATE TABLE `user_recommendations_listings` (
  `id` int(11) NOT NULL,
  `user_recommendations_id` int(11) NOT NULL,
  `listing_id` int(11) NOT NULL,
  `create_time` timestamp NULL DEFAULT current_timestamp(),
  `update_time` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `user_size_preferences`
--

CREATE TABLE `user_size_preferences` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `shoe_size_id` int(11) DEFAULT NULL,
  `top_size_id` int(11) DEFAULT NULL,
  `bottom_size_id` int(11) DEFAULT NULL,
  `accessory_size_id` int(11) DEFAULT NULL,
  `create_time` timestamp NULL DEFAULT current_timestamp(),
  `update_time` timestamp NULL DEFAULT NULL,
  `collectible_size_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `authorize_transaction`
--
ALTER TABLE `authorize_transaction`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `avatars`
--
ALTER TABLE `avatars`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `backgrounds`
--
ALTER TABLE `backgrounds`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `brands`
--
ALTER TABLE `brands`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `brand_preferences`
--
ALTER TABLE `brand_preferences`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `check_guide`
--
ALTER TABLE `check_guide`
  ADD PRIMARY KEY (`check_guide_id`);

--
-- Indexes for table `check_guide_details`
--
ALTER TABLE `check_guide_details`
  ADD PRIMARY KEY (`check_guide_details_id`);

--
-- Indexes for table `check_guide_images`
--
ALTER TABLE `check_guide_images`
  ADD PRIMARY KEY (`check_guide_images_id`);

--
-- Indexes for table `check_guide_section`
--
ALTER TABLE `check_guide_section`
  ADD PRIMARY KEY (`check_guide_section_id`);

--
-- Indexes for table `counter_user`
--
ALTER TABLE `counter_user`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `countries`
--
ALTER TABLE `countries`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `feedback_tags`
--
ALTER TABLE `feedback_tags`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `halo`
--
ALTER TABLE `halo`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `image_angles`
--
ALTER TABLE `image_angles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `influencers`
--
ALTER TABLE `influencers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `interactions`
--
ALTER TABLE `interactions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `listing`
--
ALTER TABLE `listing`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `listing_box_label`
--
ALTER TABLE `listing_box_label`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `listing_check_details`
--
ALTER TABLE `listing_check_details`
  ADD PRIMARY KEY (`listing_check_report`);

--
-- Indexes for table `listing_check_guide`
--
ALTER TABLE `listing_check_guide`
  ADD PRIMARY KEY (`listing_check_guide_id`);

--
-- Indexes for table `listing_images`
--
ALTER TABLE `listing_images`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `listing_production_label`
--
ALTER TABLE `listing_production_label`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `listing_recommendations`
--
ALTER TABLE `listing_recommendations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `listing_recommendations_listing`
--
ALTER TABLE `listing_recommendations_listing`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `listing_size_label`
--
ALTER TABLE `listing_size_label`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `listing_trade_preference`
--
ALTER TABLE `listing_trade_preference`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `listing_usemark`
--
ALTER TABLE `listing_usemark`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `master_box_label`
--
ALTER TABLE `master_box_label`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `master_size_label`
--
ALTER TABLE `master_size_label`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `message_master`
--
ALTER TABLE `message_master`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `no_authentication_proof_in_hand`
--
ALTER TABLE `no_authentication_proof_in_hand`
  ADD PRIMARY KEY (`no_authentication_proof_in_hand_id`);

--
-- Indexes for table `no_authentication_shipping`
--
ALTER TABLE `no_authentication_shipping`
  ADD PRIMARY KEY (`no_authentication_shipping_id`);

--
-- Indexes for table `offer_user`
--
ALTER TABLE `offer_user`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `parameters_master`
--
ALTER TABLE `parameters_master`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `partners`
--
ALTER TABLE `partners`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `partner_avatars`
--
ALTER TABLE `partner_avatars`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `patner_backgrounds`
--
ALTER TABLE `patner_backgrounds`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `preferences_sub_category`
--
ALTER TABLE `preferences_sub_category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product_condition`
--
ALTER TABLE `product_condition`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `proof_in_hand_verification`
--
ALTER TABLE `proof_in_hand_verification`
  ADD PRIMARY KEY (`proof_in_hand_verification_id`);

--
-- Indexes for table `seekrz_bucks`
--
ALTER TABLE `seekrz_bucks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_seekrz_bucks_user1_idx` (`user_id`),
  ADD KEY `fk_seekrz_bucks_seekrz_bucks_promo1_idx` (`seekrz_bucks_promo_id`),
  ADD KEY `fk_seekrz_bucks_trade1_idx` (`trade_id1`);

--
-- Indexes for table `seekrz_bucks_earn_tasks`
--
ALTER TABLE `seekrz_bucks_earn_tasks`
  ADD PRIMARY KEY (`sbucks_earn_tasks_id`);

--
-- Indexes for table `seekrz_bucks_promo`
--
ALTER TABLE `seekrz_bucks_promo`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `seekrz_bucks_redeem_tasks`
--
ALTER TABLE `seekrz_bucks_redeem_tasks`
  ADD PRIMARY KEY (`sbucks_redeem_tasks_id`);

--
-- Indexes for table `seekrz_bucks_txns`
--
ALTER TABLE `seekrz_bucks_txns`
  ADD PRIMARY KEY (`sbuck_txn_type_id`);

--
-- Indexes for table `seekrz_bucks_value`
--
ALTER TABLE `seekrz_bucks_value`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `seekrz_buck_txn_type`
--
ALTER TABLE `seekrz_buck_txn_type`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `seekrz_team`
--
ALTER TABLE `seekrz_team`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `seekrz_team_role`
--
ALTER TABLE `seekrz_team_role`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `shipping_label`
--
ALTER TABLE `shipping_label`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `shipping_master`
--
ALTER TABLE `shipping_master`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sizes`
--
ALTER TABLE `sizes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `social_accounts`
--
ALTER TABLE `social_accounts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `states`
--
ALTER TABLE `states`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `stores`
--
ALTER TABLE `stores`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `store_employees`
--
ALTER TABLE `store_employees`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `style`
--
ALTER TABLE `style`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `style_gender`
--
ALTER TABLE `style_gender`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `style_popularity_index`
--
ALTER TABLE `style_popularity_index`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sub_category`
--
ALTER TABLE `sub_category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `system_messages`
--
ALTER TABLE `system_messages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `system_user_messages`
--
ALTER TABLE `system_user_messages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `trades`
--
ALTER TABLE `trades`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `trade_messages`
--
ALTER TABLE `trade_messages`
  ADD PRIMARY KEY (`trade_message_id`);

--
-- Indexes for table `trade_message_details`
--
ALTER TABLE `trade_message_details`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `trade_message_listings`
--
ALTER TABLE `trade_message_listings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `trade_settlement`
--
ALTER TABLE `trade_settlement`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `usemark`
--
ALTER TABLE `usemark`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `usemark_damage`
--
ALTER TABLE `usemark_damage`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `usemark_damage_description`
--
ALTER TABLE `usemark_damage_description`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_activity`
--
ALTER TABLE `user_activity`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_address`
--
ALTER TABLE `user_address`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_avatars`
--
ALTER TABLE `user_avatars`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_backgrouds`
--
ALTER TABLE `user_backgrouds`
  ADD PRIMARY KEY (`user_patner_backgroudID`);

--
-- Indexes for table `user_brand_preferences`
--
ALTER TABLE `user_brand_preferences`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_user_profile_preferences_brands_brands1_idx` (`brand_id`),
  ADD KEY `fk_user_profile_preferences_brands_user1_idx` (`user_id`);

--
-- Indexes for table `user_feedbacks`
--
ALTER TABLE `user_feedbacks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_feedback_tags`
--
ALTER TABLE `user_feedback_tags`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_following`
--
ALTER TABLE `user_following`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_payments`
--
ALTER TABLE `user_payments`
  ADD PRIMARY KEY (`user_payments_id`);

--
-- Indexes for table `user_profile_preferences_sub_category`
--
ALTER TABLE `user_profile_preferences_sub_category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_recommendations`
--
ALTER TABLE `user_recommendations`
  ADD PRIMARY KEY (`user_recommendations_id`);

--
-- Indexes for table `user_recommendations_listings`
--
ALTER TABLE `user_recommendations_listings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_size_preferences`
--
ALTER TABLE `user_size_preferences`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `no_authentication_shipping`
--
ALTER TABLE `no_authentication_shipping`
  MODIFY `no_authentication_shipping_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `product_condition`
--
ALTER TABLE `product_condition`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `seekrz_bucks`
--
ALTER TABLE `seekrz_bucks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=92;

--
-- AUTO_INCREMENT for table `states`
--
ALTER TABLE `states`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT for table `stores`
--
ALTER TABLE `stores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `user_brand_preferences`
--
ALTER TABLE `user_brand_preferences`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
