BEGIN;

INSERT INTO job (type) VALUES
('son'),
('lumière'),
('vidéo'),
('autres');

INSERT INTO public."user" (lastname, firstname, phone_number, role, email, password, status, birth_date, birth_city, birth_department, ssn, intermittent_registration, legal_entity, siret, emergency_contact, emergency_phone_number, comments) VALUES
('Cormier', 'Capucine', '01.92.73.82.78', 'cdp', 'cormier_capucine@gmail.com', 'yjulm,+SUm', 'intermittent', '1962-12-02', 'Muscourt', '02', '2 60 52 91 449 491 84', '1003', null, null, 'Seguin Mattéo', '06 76 24 32 74', null),

('Berard', 'Augustin', '06 54 83 00 07', 'tech', 'veldtenten@hotmail.red', '.NoRE#E3!H', 'prestataire', '1979-03-01', 'Beauvoir', '77', '4 67 81 66 001 681 78', null, 'Trestlefestplan', '368 701 650 79711', null, '06 78 54 22 75', null),

('Guegan', 'Iris', '07 65 98 00 23', 'tech', 'degecor834@eyeremind.com', ')Csfch.i!D', 'prestataire', '1961-02-28', 'Ablain-Saint-Nazaire', '62', '8 50 92 50 407 397 35', null, 'Jamstone', '375 156 204 53600', 'Gouin Zoé', '07 36 76 84 16', 'Attention relations tendues avec Jamstone...'),

('Bianchi', 'Lila', '06 74 67 00 78', 'tech', 'lila_bianchi@free.fr', 'GixS%j,!vb', 'intermittent', '1986-01-12', 'Dole', '39', '2 51 65 67 907 592 06', '1425', null, null, 'Serres Camille', null, 'N''aime pas travailler avec Eliott'),

('Grenier', 'Léo', '06 56 60 00 17', 'tech', 'gleioc@gmail.com', 'iOBP9G2vh2', 'intermittent', '1994-12-16', 'Montcornet', '02', '1 22 20 64 734 400 95', '1304', null, null, 'Prudhomme Lou', '06 79 41 90 01', null),

('Leveque', 'Eliott', '06 56 60 00 02', 'tech', 'nudaddikeuprou-4644@yopmail.com', 'AJQdE94bal', 'intermittent', '1991-06-23', 'Ebreuil', '03', '1 88 12 01 429 851 26', '1875', null, null, null, null, null),

('Dupuy', 'Nolan', '07 86 47 13 54', 'tech', 'nolan-d@yahoo.fr', 'D79QIv68wZ', 'prestataire', '1991-02-03', 'Sachy', '08', '1 45 94 85 849 820 36', null, 'Trestlefestplan', '368 701 650 79711', 'Fofana Wassim', '06 26 07 51 94', 'Super tech de chez Trestlefestplan, à demander en priorité'),

('Quentin', 'Jean', '06 59 01 00 04', 'tech', 'bogossdu78@yahoo.fr', 'fgMpb4nubh', 'intermittent', '1970-04-08', 'Jublains', '53', '1 91 52 61 802 879 26', '1254', null, null, 'Barriere Kylian', '07 84 36 95 60', null),

('Colas', 'Joseph', '06 59 01 00 05', 'tech', 'josephc@gmail.com', 'NeKAf33hQ4', 'intermittent', '1984-02-23', 'Groisy', '74', '3 89 53 93 452 352 20', '1789', null, null, 'Diaz Imran', '06 20 61 94 71', null),

('Robinet', 'Mathys', '06 65 98 00 21', 'tech', 'robinet_m@gmail.com', 'hIZIBRRXps', 'prestataire', '1975-10-19', 'Pontécoulant', '14', '1 21 01 24 158 607 83', null, 'Kreative Events', '883 015 763 64936', 'Le Bris Youssef', '06 52 77 20 89', null),

('Maillet', 'Célia', '06 75 85 83 24', 'tech', 'mailletcelia@orange.fr', 'Y4WohlhyNY', 'prestataire', '1989-08-30', 'Le Blanc-Mesnil', '93', '2 08 55 25 862 590 95', null, 'Kreative Events', '883 015 763 64936', 'Delamare Antonin', '06 56 63 02 14', null),

('Humbert', 'Tristan', '06 74 67 00 80', 'cdp', 'tristan_humbert@orange.fr', 'uI8G5wH4UQ', 'interne', '2000-11-29', 'Beauvoir', '50', '3 22 42 87 112 764 44', null, null, null, 'Brisset Rayan', '07 51 12 33 12', null),

('Sarrazin', 'Lila', '06 56 60 00 13', 'tech', 'sarr_lil@gmail.com', 'WOyVDJyv30', 'intermittent', '1984-09-24', 'Dambach-la-Ville', '67', '7 39 73 04 296 308 76', '1542', null, null, 'Cornet Eden', '06 46 68 54 22', null);

COMMIT;