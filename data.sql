-- MySQL dump 10.13  Distrib 8.0.45, for Win64 (x86_64)
--
-- Host: localhost    Database: college_plants
-- ------------------------------------------------------
-- Server version	8.0.45

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `plants`
--

DROP TABLE IF EXISTS `plants`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `plants` (
  `id` int NOT NULL AUTO_INCREMENT,
  `common_name` varchar(100) DEFAULT NULL,
  `scientific_name` varchar(150) DEFAULT NULL,
  `family` varchar(100) DEFAULT NULL,
  `description` text,
  `uses` text,
  `location` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `origin` varchar(100) DEFAULT NULL,
  `category` varchar(100) DEFAULT NULL,
  `fruit_info` varchar(255) DEFAULT NULL,
  `medicinal_importance` text,
  `is_active` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plants`
--

LOCK TABLES `plants` WRITE;
/*!40000 ALTER TABLE `plants` DISABLE KEYS */;
INSERT INTO `plants` VALUES (1,'Neem','Azadirachta indica','the Mahogany family','Growth: A fast-growing evergreen tree that typically reaches heights of 15–20 metres, but can grow up to 40 metres in rare cases.\r\nStructure: It features a wide, spreading, and fairly dense roundish crown with a straight trunk.\r\nFoliage: The leaves are pinnate, measuring 20–40 cm long, with toothed, medium to dark green leaflets.\r\nFlowers & Fruit: It produces small, white, fragrant flowers and smooth, olive-like green-yellow fruits called drupes.','Medicinal: Widely used in Ayurveda for treating skin conditions (acne, psoriasis, eczema), dental issues (gingivitis, plaque), fever, and diabetes.\r\nAgriculture: Acts as a natural organic pesticide and insecticide due to the compound azadirachtin; the \"neem cake\" residue is also used as a potent fertilizer.\r\nCosmetic: Oil extracted from the seeds is a common ingredient in soaps, shampoos for dandruff, and skin creams.\r\nEnvironmental: Used for reforestation, preventing soil erosion, and as a carbon dioxide sink.\r\nDaily Hygiene: In rural areas, young twigs are traditionally chewed as crude toothbrushes (datun). ','cricket ground','2026-03-08 11:32:25','India','Herb','','Skin Health: Treats infections, acne, eczema, and psoriasis due to its antifungal and antiseptic properties.\r\nOral Health: Commonly used in toothpaste or as twigs (datum) to reduce plaque, gum diseases, and oral bacteria.\r\nImmunity and Detox: Boosts immunity and acts as a detoxifier for the liver and blood.\r\nMetabolic & Gastrointestinal Support: Helps manage blood sugar levels and reduces stomach ulcers.\r\nAnti-inflammatory & Pain Relief: Used for reducing joint pain and treating arthritis.\r\nMedicinal Components: Contains compounds like nimbin and nimbidin.',1),(2,'Mango','Mangifera indica','Anacardiaceae','Growth: A large, long-lived evergreen tree that typically grows between 30 and 100 feet tall with a dense, rounded canopy. Some specimens are known to bear fruit for over 300 years.\r\nFoliage: The leaves are simple, alternate, and lanceolate (spear-shaped). They are often reddish or coppery when young, turning dark green and leathery as they mature.\r\nFlowers: Small, yellowish-white, and fragrant, they appear in large, branched clusters called panicles.\r\nFruit: Botanically a drupe (stone fruit), it features an outer skin (exocarp), a fleshy edible middle (mesocarp), and a single hard, stony pit (endocarp) containing the seed.','Edible: Consumed fresh or processed into juices, smoothies, jams, and ice cream. Green, unripe mangoes are used for pickles, chutneys, and the tangy spice powder known as amchoor.\r\nMedicinal: In Ayurveda, various parts are used: leaves are believed to help manage diabetes and blood pressure, while the bark and seeds are used for digestive issues like diarrhea and asthma.\r\nTimber: The wood is utilized for making low-cost furniture, musical instruments like ukuleles, and packing boxes.\r\nCultural: Mango leaves are considered sacred in many cultures, used to decorate doorways (Torana) during weddings and festivals as symbols of prosperity and good luck. ','College Garden','2026-03-08 11:34:13','India','Fruit','Mango','',1),(3,'Tulsi','Holy Basil','Ocimum tenuiflorum','Structure: An erect, many-branched subshrub that typically grows between 30 and 60 cm (12–24 inches) tall.\r\nFoliage: Simple, petioled leaves with an ovate blade and slightly toothed margins. They are strongly scented and range in color from bright green to purplish.\r\nFlowers: Small, tubular, and purplish or white, arranged in elongated clusters called racemes.\r\nVarieties: The most common types include Ram Tulsi (bright green leaves) and Krishna Tulsi (dark purple leaves and stems), the latter often being preferred for its more intense medicinal potency','Medicinal (Adaptogen): Acts as a powerful adaptogen that helps the body cope with psychological, physical, and metabolic stress.\r\nRespiratory Health: Commonly used to treat coughs, colds, asthma, and bronchitis, often prepared as a tea with honey and ginger.\r\nOral Care: Chewing leaves or using infusions as a mouthwash helps treat oral ulcers, gum disease, and bad breath.\r\nSpiritual: Central to Hindu rituals, it is grown in home courtyards for daily worship and to purify the environment.\r\nEnvironmental: Used as a natural insect repellent (especially against mosquitoes) and as a bio-filter to reduce air pollution around landmarks like the Taj Mahal. ','Courtyard','2026-03-08 11:36:01','India','Herb','','Respiratory Support: Acts as an expectorant, helping to clear mucus and relieve bronchitis, asthma, and congestion.\r\nImmunity Booster: Enhances immune cell activity, providing protection against viral and bacterial infections.\r\nStress Reduction: Acts as an adaptogen to reduce stress, anxiety, and improve mental balance.\r\nMetabolic Health: Helps manage blood sugar levels and improves cardiovascular health by reducing cholesterol.\r\nAnti-inflammatory: Reduces inflammation, joint pain, and helps with skin infections.\r\nOral Health: Chewing leaves treats oral infections, ulcers, and strengthens gums.\r\nDetoxification: Protects against toxic chemicals and radiation, supporting liver function.',1),(4,'banana',' Musa × paradisiaca','Musaceae','Structure: It is technically a gigantic herb, not a tree, because it lacks a woody trunk. The \"trunk\" is actually a pseudostem formed by tightly packed, overlapping leaf sheaths.\r\nFoliage: Large, paddle-shaped leaves that can grow up to 2.7 metres long and 60 cm wide.\r\nFlowers: A large, drooping flower spike (inflorescence) called a banana heart emerges from the center, protected by purple-red bracts.\r\nFruit: Botanically a berry, the fruit develops without fertilization (parthenocarpy) in clusters called \"hands,\" with individual fruits known as \"fingers\".\r\n','Edible: Consumed fresh (dessert bananas) or cooked (plantains). The flower, tender inner pseudostem, and even the peel (when cooked) are edible in various Asian cuisines.\r\nMedicinal: Used in Ayurveda and folk medicine to treat diabetes, hypertension, and digestive issues like ulcers or diarrhea. The sap is traditionally used for stings, and the roots for respiratory ailments like asthma.\r\nIndustrial & Craft: Fibers from the pseudostem are used to make textiles (e.g., abacá), high-quality paper, and biodegradable ropes.\r\nCulinary & Ritual: The large, flexible leaves are widely used as natural plates and eco-friendly food wrappers for steaming.','cricket ground','2026-03-08 11:40:17','India','Fruit','Banana','',0),(7,'Rose','Rosa spp','Rosaceae','Woody perennials, ranging from climbers to shrubs, often with thorns (prickles), pinnate leaves, and five-petaled flowers (in wild species).','Ornamental: Widely cultivated for gardens and cut flowers.\r\nPerfumery/Cosmetics: Rose oil/water for fragrances, creams, and soaps.\r\nCulinary: Petals and hips (fruit) are used in teas, jams, and jellies.\r\nMedicinal: Used in traditional medicine to treat inflammation, digestive issues, and for stress reduction (aromatherapy). ','Prem Vatika College Campus','2026-03-09 18:18:30','India','Decorative','','',1),(8,'Mari Gold','Tagetes spp','Asteraceae (Compositae)','Appearance: Upright, bushy plants ranging from 1–4 feet in height.\r\nFoliage: Deep green, pinnately divided, and aromatic.\r\nFlowers: Solitary or clustered flower heads, ranging from 0.5 to 4 inches in diameter, in shades of yellow, orange, red, and maroon.\r\nLife Cycle: Generally treated as annuals, though some are perennials.','Gardening: Popular as companion plants because their aroma repels garden pests, nematodes, and whiteflies.\r\nOrnamental/Cultural: Widely used in garlands, decorations for festivals (e.g., Diwali, Day of the Dead), and landscapes.\r\nMedicinal: Used in traditional medicine to treat burns, wounds, and skin infections.\r\nCulinary/Industrial: Used as a natural yellow/orange dye for food and poultry feed. Some species, such as T. lucida, are used as culinary herbs.','College garden','2026-03-09 18:55:42','Mexico','Decorative','','',1),(9,'Palm','Arecaceae','arborescent','The Arecaceae (/ˌærəˈkeɪsi.iː, -ˌaɪ/) are a family of perennial, flowering plants in the monocot order Arecales. Their growth form can be climbers, shrubs, tree-like and stemless plants, all commonly known as palms. Those having a tree-like form are colloquially called palm trees.[4] Currently, 181 genera with around 2,600 species are known,[5][6] most of which are restricted to tropical and subtropical climates. Most palms are distinguished by their large, compound, evergreen leaves, known as fronds, arranged at the top of an unbranched stem, except for the Hyphaene genus, which has branched palms. However, palms exhibit an enormous diversity in physical characteristics and inhabit nearly every type of habitat within their range, from rainforests to deserts.\r\n\r\nPalms are among the best known and most extensively cultivated plant families. They have been important to humans throughout much of history, especially in regions like the Middle East and North Africa. A wide range of common products and foods are derived from palms. In contemporary times, palms are also widely used in landscaping. In many historical cultures, because of their importance as food, palms were symbols for such ideas as victory, peace, and fertility.','Evidence for cultivation of the date palm by Mesopotamians and other Middle Eastern peoples exists from more than 5,000 years ago,[25] in the form of date wood, pits for storing dates, and other remains of the date palm in Mesopotamian sites.[26][27] The date palm had a significant effect on the history of the Middle East and North Africa.[28] In the text \"Date Palm Products\" (1993), W.H. Barreveld wrote:[29]\r\n\r\nOne could go as far as to say that, had the date palm not existed, the expansion of the human race into the hot and barren parts of the \"old\" world would have been much more restricted. The date palm not only provided a concentrated energy food, which could be easily stored and carried along on long journeys across the deserts, it also created a more amenable habitat for the people to live in by providing shade and protection from the desert winds.[25]\r\n\r\nAn indication of the importance of palms in ancient times is that they are mentioned more than 30 times in the Bible,[30] and at least 22 times in the Quran.[31] The Torah also references the \"70 date palm trees\", which symbolize the 70 aspects of Torah that are revealed to those who \"eat of its fruit.\"[32]\r\n\r\nArecaceae have great economic importance, including coconut products, oils, dates, palm syrup, ivory nuts, carnauba wax, rattan cane, raffia, and palm wood. This family supplies a large amount of the human diet and several other human uses, both by absolute amount produced and by number of species domesticated.[33] This is far higher than almost any other plant family, sixth out of domesticated crops in the human diet, and first in total economic value produced – sharing the top spot with the Poaceae and Fabaceae.[33] These human uses have also spread many Arecaceae species around the world.[33]\r\n\r\nAlong with dates mentioned above, members of the palm family with human uses are numerous:\r\n\r\nThe type member of Arecaceae is the areca palm (Areca catechu), the fruit of which, the areca nut, is chewed with the betel leaf for intoxicating effects.\r\nCarnauba wax is harvested from the leaves of South American palms of the genus Copernicia.\r\nRattans, whose stems are used extensively in furniture and baskets, are in the genus Calamus.\r\nPalm oil is an edible vegetable oil produced by the oil palms in the genus Elaeis.[34]\r\nSeveral species are harvested for heart of palm, a vegetable eaten in salads.[35]\r\nSap of the nipa palm, Nypa fruticans, is used to make vinegar.\r\nPalm sap is sometimes fermented to produce palm wine or toddy, an alcoholic beverage common in parts of Africa, India, and the Philippines. The sap may be drunk fresh, but fermentation is rapid, reaching up to 4% alcohol content within an hour, and turning vinegary in a day.[36]\r\nPalmyra and date palm sap is harvested in Bengal, India, to process into gur and jaggery.\r\nCoconut is the partially edible seed of the fruit of the coconut palm (Cocos nucifera).[37]\r\nCoir is a coarse, water-resistant fiber extracted from the outer shell of coconuts, used in doormats, brushes, mattresses, and ropes.[38]\r\nSome indigenous groups living in palm-rich areas use palms to make many of their necessary items and food. Sago, for example, a starch made from the pith of the trunk of the sago palm Metroxylon sagu, is a major staple food for lowland peoples of New Guinea and the Moluccas.\r\nPalm wine is made from Jubaea also called Chilean wine palm, or coquito palm.\r\nRecently, the fruit of the açaí palm Euterpe has been used for its reputed health benefits.\r\nSaw palmetto (Serenoa repens) is being investigated as a drug for treating enlarged prostates.[39]\r\nPalm leaves are also valuable to some peoples as a material for thatching, basketry, clothing, and in religious ceremonies (see \"Symbolism\" below).[15]\r\nOrnamental uses: Today, palms are valuable as ornamental plants and are often grown along streets in tropical and subtropical cities. Chamaedorea elegans and Chamaedorea seifrizii is a popular houseplant and is grown indoors for its low maintenance. Farther north, palms are a common feature in botanical gardens or as indoor plants. Few palms tolerate severe cold and the majority of the species are tropical or subtropical. The three most cold-tolerant species are Trachycarpus fortunei, native to eastern Asia, and Rhapidophyllum hystrix and Sabal minor, both native to the southeastern United States.','Cricket Ground','2026-03-11 18:52:04','subtropical deserts','Decorative','','',0),(10,'Papaya','Carica papaya','Caricaceae','The papaya tree (Carica papaya) is a fast-growing, short-lived tropical, herbaceous plant with a single, soft, hollow, succulent stem, typically growing 5–10 meters (16–33 feet) tall. It features a crown of large, deeply lobed leaves at the top and produces clusters of large, edible, yellow-orange, fleshy, berry-like fruits. Stem & Structure: The tree is usually unbranched, with a, smooth, gray-brown trunk marked with prominent leaf scars. It is not a true woody tree, but rather a giant, fast-growing herb.\r\nLeaves: Large (50–70 cm wide), deeply palmately lobed, and spirally arranged at the apex.\r\nFlowers: Sweet-scented, five-parted, and appear in leaf axils. Trees can be male, female, or hermaphrodite.\r\nFruit: Large, berry-like, ranging from spherical to cylindrical/pear-shaped. They are 15–50 cm long, with thin, greenish-yellow to orange skin and a deep yellow to orange flesh.\r\nSeeds: Numerous small, black, wrinkled seeds are attached to the walls of the central cavity.\r\nMilky Sap: The entire plant, especially the unripe fruit, contains a white, milky latex rich in the enzyme papain. \r\nGrowth & Cultivation\r\nHabitat: Requires full sun and tropical/subtropical, well-drained soil.\r\nLifespan: Rapid growth, bearing fruit in less than a year, with a productive life of about 3-5 years.\r\nUses: Primarily cultivated for its edible fruit, while the fruit, leaves, and bark are used for their papain content, which aids in digestion and acts as a meat tenderizer.','Papaya is a highly nutritious tropical fruit rich in vitamins A and C, antioxidants like lycopene, and the enzyme papain, which aids in protein digestion. It is widely used to improve digestion, treat skin issues, support immune function, and lower inflammation.','cricket ground','2026-03-12 20:57:34',' tropical regions of Mesoamerica, specifically southern Mexico and Central America','Shrub','Papaya',' It is eaten fresh, added to salads, and its leaves are used in traditional medicine.Digestion Aid: Contains papain, a digestive enzyme that breaks down proteins, relieves constipation, bloating, and irritable bowel syndrome (IBS).\r\nImmune System Boost: High in vitamin C and vitamin A, which are crucial for fighting infections.\r\nSkin & Hair Health: Antioxidants like lycopene and vitamin C promote collagen production, protect against sun damage, and reduce signs of aging.\r\nInflammation & Chronic Disease: Contains compounds that may fight cancer, support heart health, and reduce chronic inflammation.\r\nBlood Sugar Regulation: Some studies suggest fermented papaya can help regulate blood sugar levels.\r\nEye Health: Rich in antioxidants like lutein and zeaxanthin that protect against eye disorders.',1),(19,'Hibiscus','Malvaceae','mallow family ','Hibiscus is a genus of flowering plants in the mallow family (Malvaceae), known for large, vibrant, trumpet-shaped flowers in red, pink, yellow, and white. Thriving in warm, sunny climates, these tropical/subtropical shrubs (and hardy perennials) are popular for ornamental, culinary, and medicinal uses, often made into teas.Key Facts About Hibiscus:Types: There are two main types: tropical hibiscus, which thrives in warm areas, and hardy hibiscus, which can survive colder winters.Characteristics: Flowers feature 4-5 petals and a distinct central tube containing the stamens, reaching sizes of up to 25 cm (10 inches).Care Requirements: Hibiscus require full sun (6+ hours daily), high humidity.Health Benefits: Hibiscus tea is rich in Vitamin C, high in antioxidants, and is known to help manage blood pressure.Culinary & Other Uses: Hibiscus sabdariffa is widely used for teas and jams. The flowers are also used in hair care and, in some traditions, as a natural dye.Pollinators: The blooms attract hummingbirds and butterflies.Growing Information:Soil: They prefer well-drained, slightly acidic soil.','Hair Growth Mask: Blend fresh or soaked hibiscus leaves and flowers into a paste. Combine with yogurt or coconut oil and apply to the scalp for 30–45 minutes to strengthen roots, reduce hair fall, and treat dandruff.Hibiscus Oil: Boil hibiscus paste in coconut or sesame oil for 20 minutes, then strain to create a stimulating oil for scalp massage.Hair Rinse: Soak dried hibiscus flowers in warm water overnight. Use this nutrient-rich liquid as a final rinse after washing to add shine and condition.Dandruff Treatment: Mix hibiscus powder with neem powder and yogurt for an anti-fungal mask.','Garden','2026-04-01 16:46:14','Asia, specifically China, India, and Southeast Asia','Flowering','','Cardiovascular Health: Studies indicate hibiscus tea significantly lowers both systolic and diastolic blood pressure, comparable to some antihypertensive drugs.Liver Health: Hibiscus extract may protect the liver by reducing fat accumulation (steatosis) and supporting its efficiency in metabolizing substances.Weight Management: It may assist in weight management by inhibiting the absorption of fats and carbohydrates, potentially reducing body fat and body weight.Antioxidant & Immune Support: Rich in antioxidants, it helps combat oxidative stress and supports the immune system, often used for colds and upper respiratory tract infections.Digestive and Kidney Health: It functions as a mild diuretic (increasing urine output) and a laxative.Skin & Hair Health: Often used for its anti-inflammatory and antiseptic properties to treat acne, as well as for its potential to promote hair growth and prevent greying.Metabolic Support: It is used in managing high cholesterol and blood sugar levels, aiding in the prevention of metabolic disorders.Important ConsiderationsPregnancy/Breastfeeding: Consult a healthcare provider, as it may cause hormonal changes.Drug Interactions: Due to its blood pressure-lowering effects, it may interact with antihypertensive medications.Liver Impact: While potentially therapeutic, excessive consumption may have an opposite, harmful effect on the liver; moderation is advised.',1),(20,'Bougainvillea','Bougainvillea spectabilis','Nyctaginaceae family','Bougainvillea is a popular, drought-tolerant, tropical woody vine known for its vibrant, papery bracts—often mistaken for petals—that surround tiny white flowers. Native to South America, they thrive in full sun and bloom year-round in warm climates, making them perfect for covering walls, fences, and pergolas.Key Characteristics and Facts:Structure: What appear to be bright flowers are actually large, colored leaves called bracts (usually in groups of three), which protect the small, tubular white or cream flowers inside.Colors: Bracts come in vibrant magenta, pink, red, orange, yellow, and white.Thorns: These shrubs have sharp thorns, aiding their climbing habit, sometimes reaching heights of 30 feet or more.Care: They require full sun (at least 5–6 hours) and well-drained soil. They are drought-tolerant once established but prefer regular watering and fertilizing to promote continuous blooming.Versatility: Bougainvilleas are excellent for container gardening, allowing them to be moved indoors in colder climates.Origin: The plant was first described by French botanist Philibert Commerçon in 1768, who named it after his friend, explorer Louis-Antoine de Bougainville.Medicinal Uses: Traditionally, Bougainvillea spectabilis has been used for its potential anti-inflammatory and medicinal properties, particularly in treating certain conditions like diabetes. Often called \"paper flowers,\" they are a staple in Mediterranean and tropical landscaping due to their hardiness and high visual impact.','Bougainvillea flowers (bracts) are used for culinary, medicinal, and ornamental purposes due to their vibrant color, edible nature, and health-promoting properties. They are commonly brewed into teas to treat respiratory issues (cough, bronchitis), used in salads, or as colorful garnishes. They also offer anti-inflammatory, antimicrobial, and antioxidant benefits. Common Uses of Bougainvillea Flowers: Culinary Uses: Tea: The paper-like bracts are often boiled to create a tea, known for treating sore throats and upper respiratory issues. Edible Decor: They are used in salads, teas, and to make infusions, syrups, and icings due to their vibrant colors (pink, purple, red). Fried: They can be dipped in batter and fried as a unique dish, often with the leaves, stems, and white inner flowers removed beforehand. Medicinal Uses (Traditional):Respiratory Care: Used as a traditional remedy for coughs, asthma, and sore throat.Gastrointestinal Health: Used for managing diarrhea, stomachaches, and nausea.Health Properties: Studies indicate potential anti-inflammatory, anti-diabetic, anti-microbial, and antioxidant properties.Other Uses:Ornamental: Their primary use is as ornamental plants on trellises, fences, and gates to improve outdoor aesthetics.Anti-fertility: Some traditional medicine uses involve the extract as a fertility control agent. Important Safety Warning:Infertility Risk: Inappropriate or excessive consumption of bougainvillea, particularly the leaves, may cause fertility problems.Preparation: Always remove the white, inner flower and green leaves, using only the colorful bracts to avoid a bitter taste.','Garden, Cricket Ground, Court Yard','2026-04-03 06:34:57',' South America, specifically coastal Brazil, Peru, and Argentina','Decorative','','Bougainvillea (specifically Bougainvillea spectabilis) flowers and bracts are used in traditional medicine, particularly as a tea, to treat respiratory issues like cough, asthma, and bronchitis. They possess antioxidant, anti-inflammatory, anti-diabetic, and antimicrobial properties. Compounds like pinitol, bougainvinones, and quercetagetin contribute to these therapeutic effects. Key Medicinal Benefits & Uses:Respiratory Care: Used to relieve sore throats, coughs, and bronchitis due to their anti-inflammatory compounds.Blood Sugar Management: Leaves and flowers can aid in managing blood sugar levels, increasing insulin sensitivity, and aiding energy metabolism.Antioxidant & Protective: Contains compounds like pinitol and flavonoids that protect against oxidative damage, including guarding the liver and brain from toxins.Gastrointestinal Health: Often utilized in traditional medicine to help with stomach issues and diarrhea.Antibacterial & Wound Healing: Contains tannins and other compounds that exhibit antimicrobial effects, sometimes used to help with wound healing and skin irritations. Common Preparation:Bougainvillea tea is made by boiling fresh, clean bracts (the paper-like colored leaves surrounding the tiny true flower) for about 10 minutes until the water becomes colored. It is often mixed with honey or lemon. Safety Considerations:Pregnancy & Lactation: Safety has not been established; avoid consumption.Skin Irritation: The sap from the plant can cause severe rashes, and the thorns can cause injury.Consultation: Always consult a healthcare professional before using herbal remedies for medicinal purposes.',1);
/*!40000 ALTER TABLE `plants` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-04-03 15:53:46
-- MySQL dump 10.13  Distrib 8.0.45, for Win64 (x86_64)
--
-- Host: localhost    Database: college_plants
-- ------------------------------------------------------
-- Server version	8.0.45

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `plant_images`
--

DROP TABLE IF EXISTS `plant_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `plant_images` (
  `id` int NOT NULL AUTO_INCREMENT,
  `plant_id` int NOT NULL,
  `image_path` varchar(255) NOT NULL,
  `image_type` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `plant_id` (`plant_id`),
  CONSTRAINT `plant_images_ibfk_1` FOREIGN KEY (`plant_id`) REFERENCES `plants` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plant_images`
--

LOCK TABLES `plant_images` WRITE;
/*!40000 ALTER TABLE `plant_images` DISABLE KEYS */;
INSERT INTO `plant_images` VALUES (1,1,'plant-1-cover.webp','cover'),(2,1,'plant-1-college.webp','college'),(3,1,'plant-1-reference.jpg','reference'),(4,2,'plant-2-cover.jpg','cover'),(5,2,'plant-2-college.webp','college'),(6,2,'plant-2-reference.webp','reference'),(7,3,'plant-3-cover.jpg','cover'),(8,3,'plant-3-college.webp','college'),(9,3,'plant-3-reference.webp','reference'),(10,4,'plant-4-cover.jpg','cover'),(11,4,'plant-4-college.webp','college'),(12,4,'plant-4-reference.webp','reference'),(19,7,'plant-7-cover.webp','cover'),(20,7,'plant-7-college.jpg','college'),(21,7,'plant-7-reference.jpg','reference'),(22,8,'plant-8-cover.jpg','cover'),(23,8,'plant-8-college.JPG','college'),(24,8,'plant-8-reference.jpg','reference'),(25,9,'plant-9-cover.jpg','cover'),(26,9,'plant-9-college.webp','college'),(27,9,'plant-9-reference.jpg','reference'),(28,10,'plant-10-cover.jpg','cover'),(29,10,'plant-10-college.jpg','college'),(30,10,'plant-10-reference.webp','reference'),(31,19,'plant-19-cover.webp','cover'),(32,19,'plant-19-college.webp','college'),(33,19,'plant-19-reference.jpg','reference'),(34,20,'plant-20-cover.jpg','cover'),(35,20,'plant-20-college.webp','college'),(36,20,'plant-20-reference.webp','reference');
/*!40000 ALTER TABLE `plant_images` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-04-03 15:53:46
-- MySQL dump 10.13  Distrib 8.0.45, for Win64 (x86_64)
--
-- Host: localhost    Database: college_plants
-- ------------------------------------------------------
-- Server version	8.0.45

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admins`
--

DROP TABLE IF EXISTS `admins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admins` (
  `id` varchar(20) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password_hash` text NOT NULL,
  `recovery_key_hash` text NOT NULL,
  `invited_by` varchar(20) DEFAULT NULL,
  `last_login` datetime DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `invited_by_admin_id` (`invited_by`),
  CONSTRAINT `admins_ibfk_1` FOREIGN KEY (`invited_by`) REFERENCES `admins` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admins`
--

LOCK TABLES `admins` WRITE;
/*!40000 ALTER TABLE `admins` DISABLE KEYS */;
INSERT INTO `admins` VALUES ('adm_76f7575d5667','Developer','dev@plantinfo.com','$2b$10$8lhJGGpEzki61IPF7F.qFOWbfzdDzNbfVFkvKrRs/76NW6L.vhCBO','$2b$10$NzSbcwz642Jkb.K/f3Cdnu/endQTidWWS4Yi.7YeNc3UDzTDRLTCG','adm_f83a91c2d4','2026-04-02 12:40:14',1,'2026-04-01 07:02:58'),('adm_9639acb7749a','Anjaneya','hanu@plantinfo.com','$2b$10$.Ks5erSXJkRejQAhrqvn8.kuXNb7/VtyFOcJPih8XPm413Zc4SvkK','$2b$10$/Gkq90utsV8bWkQE6U8x5.g9ZzK/ZHLRhAnUg7M5034w6z5hn6ama','adm_76f7575d5667','2026-04-03 12:13:16',1,'2026-04-01 18:37:53'),('adm_a65da64b1c66','Whiskey','cat@plantinfo.com','$2b$10$6bW4K7Qsmc4Ue980nrfc0eO8ky.mLyRT6ar8E5wC6BZUfKdzxDsb2','$2b$10$BD8edcybFZxi9KFvkAO4ueUfClU2YaSZ5bW2hQWTdvbjbZ7wOqDdW','adm_f83a91c2d4','2026-04-03 12:25:51',1,'2026-04-03 06:53:02'),('adm_d4aed9b22bae','mannu','mannu@plant.com','$2b$10$yyH1J7/P1vxELevm7yNXWOK7jh7UAFb7wLYr5Ns8D1qqPNjEJEFHC','$2b$10$fYNnjPHfJ79XsLo4z8FGROXMoc1B7DUkRt5y5oPEZTaxtMdVVvBSu','adm_9639acb7749a','2026-04-02 15:53:29',1,'2026-04-02 09:02:50'),('adm_f44ed33c8674','Cheeku','cheeku@plant.com','$2b$10$/UYLNgJD0U2wLLUJnWplzeDbiN0S7l3WuG1bUyJYwStN8J3wpCi36','$2b$10$IcBFjGtSRY3qiF1OJDqsNOoTeMgmvwggR.H1OM5dc6ypTMwfwXz6C','adm_9639acb7749a',NULL,1,'2026-04-02 08:58:41'),('adm_f83a91c2d4','Mohit Kumar','admin@plantinfo.com','$2b$10$pd9yCmcS2JCu9tfkQxhrj.fsIZhWkp7KTR9zWX1Z4dQS6j8ga5DyW','$2b$10$R5v1F9bXjT2uZcPq3m9fReJ3YpW2l6F8aN0Q7u5sH1kGd4vYp3M8K',NULL,'2026-04-03 14:12:03',1,'2026-03-16 18:47:45'),('adm_k96f45s5d5','Alpha','alpha@plantinfo.com','$2a$12$6eKqr0mOWeLqTYc9s4YQv.vWTYa5jkFTY6hyCgKx4TiHErVToxSOm','$2b$10$R5v1F9bXjT2uZcPq3m9fReJ3YpW2l6F8aN0Q7u5sH1kGd4vYp3M8K',NULL,'2026-03-17 01:27:20',1,'2026-03-16 19:35:57');
/*!40000 ALTER TABLE `admins` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-04-03 15:53:46
-- MySQL dump 10.13  Distrib 8.0.45, for Win64 (x86_64)
--
-- Host: localhost    Database: college_plants
-- ------------------------------------------------------
-- Server version	8.0.45

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin_invites`
--

DROP TABLE IF EXISTS `admin_invites`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin_invites` (
  `id` int NOT NULL AUTO_INCREMENT,
  `invite_key` varchar(50) NOT NULL,
  `created_by` varchar(20) NOT NULL,
  `used_by` varchar(20) DEFAULT NULL,
  `expires_at` datetime NOT NULL,
  `used` tinyint(1) DEFAULT '0',
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `invite_key` (`invite_key`),
  KEY `created_by_admin_id` (`created_by`),
  KEY `used_by_admin_id` (`used_by`),
  CONSTRAINT `admin_invites_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `admins` (`id`) ON DELETE CASCADE,
  CONSTRAINT `admin_invites_ibfk_2` FOREIGN KEY (`used_by`) REFERENCES `admins` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin_invites`
--

LOCK TABLES `admin_invites` WRITE;
/*!40000 ALTER TABLE `admin_invites` DISABLE KEYS */;
INSERT INTO `admin_invites` VALUES (1,'c4df818dd1','adm_f83a91c2d4','adm_76f7575d5667','2026-04-02 12:20:48',1,1,'2026-04-01 06:50:47'),(2,'d81d7bc8cc','adm_f83a91c2d4',NULL,'2026-04-02 19:01:47',0,1,'2026-04-01 13:31:47'),(3,'ab3ddc7f02','adm_f83a91c2d4',NULL,'2026-04-02 19:01:54',0,1,'2026-04-01 13:31:53'),(4,'c5bf3cca2a','adm_76f7575d5667',NULL,'2026-04-02 23:44:30',1,1,'2026-04-01 18:14:29'),(6,'29b5384efb','adm_76f7575d5667','adm_9639acb7749a','2026-04-03 00:07:19',1,1,'2026-04-01 18:37:19'),(7,'1d688d835e','adm_9639acb7749a',NULL,'2026-04-03 13:24:18',0,1,'2026-04-02 07:54:18'),(8,'bc30a6d714','adm_9639acb7749a',NULL,'2026-04-03 13:24:41',0,1,'2026-04-02 07:54:41'),(9,'f9b8c29b96','adm_9639acb7749a',NULL,'2026-04-03 13:25:10',0,1,'2026-04-02 07:55:10'),(10,'9467339285','adm_9639acb7749a',NULL,'2026-04-03 13:26:07',0,1,'2026-04-02 07:56:07'),(11,'d504b607b2','adm_9639acb7749a',NULL,'2026-04-03 13:26:28',0,1,'2026-04-02 07:56:27'),(12,'16c317ad50','adm_9639acb7749a',NULL,'2026-04-03 13:27:06',0,1,'2026-04-02 07:57:06'),(13,'ac3b623ef6','adm_9639acb7749a',NULL,'2026-04-03 13:27:18',0,1,'2026-04-02 07:57:17'),(14,'726fd5e99d','adm_9639acb7749a',NULL,'2026-04-03 13:27:36',0,1,'2026-04-02 07:57:36'),(15,'3925a3f244','adm_9639acb7749a',NULL,'2026-04-03 13:28:01',0,1,'2026-04-02 07:58:00'),(16,'d97625a09a','adm_9639acb7749a',NULL,'2026-04-03 13:28:48',0,1,'2026-04-02 07:58:47'),(17,'3f6392b844','adm_9639acb7749a',NULL,'2026-04-03 13:31:17',0,1,'2026-04-02 08:01:17'),(18,'33ac4986ab','adm_9639acb7749a',NULL,'2026-04-03 13:31:42',0,1,'2026-04-02 08:01:42'),(19,'09b67ade64','adm_9639acb7749a',NULL,'2026-04-03 13:32:23',0,1,'2026-04-02 08:02:22'),(20,'7bfbd760f0','adm_9639acb7749a',NULL,'2026-04-03 13:32:33',0,1,'2026-04-02 08:02:33'),(21,'cf84d26bf6','adm_9639acb7749a',NULL,'2026-04-03 13:32:41',0,1,'2026-04-02 08:02:41'),(22,'cf2dc57d3a','adm_9639acb7749a',NULL,'2026-04-03 13:33:04',0,1,'2026-04-02 08:03:04'),(23,'3d08058aa7','adm_9639acb7749a','adm_d4aed9b22bae','2026-04-03 13:33:22',1,1,'2026-04-02 08:03:21'),(24,'2bfe0a0e69','adm_9639acb7749a',NULL,'2026-04-03 13:34:07',0,1,'2026-04-02 08:04:07'),(25,'e72c2c84bf','adm_76f7575d5667',NULL,'2026-04-03 13:34:55',0,1,'2026-04-02 08:04:55'),(26,'3902DE5993','adm_9639acb7749a',NULL,'2026-04-03 14:16:42',0,1,'2026-04-02 08:46:41'),(27,'F5B4444EA7','adm_9639acb7749a',NULL,'2026-04-03 14:25:06',0,1,'2026-04-02 08:55:06'),(28,'B751AB475B','adm_9639acb7749a','adm_f44ed33c8674','2026-04-03 14:26:28',1,1,'2026-04-02 08:56:27'),(29,'C50A1E3DAD','adm_76f7575d5667',NULL,'2026-04-03 14:29:35',0,1,'2026-04-02 08:59:35'),(30,'44694A66A7','adm_76f7575d5667',NULL,'2026-04-03 14:29:39',1,1,'2026-04-02 08:59:39'),(31,'6DBE92C47B','adm_f83a91c2d4','adm_a65da64b1c66','2026-04-04 12:19:21',1,1,'2026-04-03 06:49:21');
/*!40000 ALTER TABLE `admin_invites` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-04-03 15:53:46
