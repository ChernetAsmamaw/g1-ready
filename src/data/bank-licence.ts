import { Q } from './q';

// Licence & Penalties: graduated licensing, documents, demerit points,
// suspensions, impaired driving, insurance.
export const licenceBank = [
  // ---------- Graduated licensing ----------
  Q('l-g1-get', 'licence', 1, 'To get a G1 licence, you must be at least 16 years old and pass:',
    ['A vision test and a knowledge test of the rules of the road and traffic signs', 'A road test', 'A first-aid course', 'A driver education course'],
    'G1 requirements: age 16+, a vision test, and a knowledge test on rules of the road and signs.',
    'fines', 'Getting your driver\'s licence'),

  Q('l-g1-accompany', 'licence', 1, 'As a G1 driver, you must be accompanied by a driver with a full G (or higher) licence and at least how much driving experience?',
    ['Four years', 'Three years', 'Six years', 'Eight years'],
    'The accompanying driver needs a valid Class G or higher licence, at least four years of experience, and a BAC under 0.05%.',
    ['sample', 'faq', 'fines', 'guide'], 'Getting your driver\'s licence'),

  Q('l-g1-front-seat', 'licence', 1, 'While you drive with a G1 licence, who may sit in the front seat with you?',
    ['Only your accompanying driver', 'Anyone with a seatbelt', 'Any licensed driver', 'No one'],
    'The accompanying driver must be the only other person in the front seat.',
    'fines', 'Getting your driver\'s licence'),

  Q('l-accompany-bac', 'licence', 2, 'The accompanying driver for a G1 driver must have a blood alcohol concentration of:',
    ['Less than 0.05%', '0.00%', 'Less than 0.08%', 'Less than 0.10%'],
    'A supervising driver must be below 0.05%. If they are 21 or under, it must be zero.',
    ['sample', 'fines'], 'Getting your driver\'s licence'),

  Q('l-accompany-points', 'licence', 3, 'Can a G1 driver\'s accompanying driver have demerit points on their licence?',
    ['Yes, but the licence cannot be suspended', 'No, they must have zero points', 'Yes, up to 6 points', 'Only if they are a driving instructor'],
    'The accompanying driver\'s licence may have demerit points, but it cannot be suspended. Time at G2 counts toward their four years.',
    'gr', 'Getting your driver\'s licence'),

  Q('l-g1-night', 'licence', 1, 'While you hold a G1 licence, you may NOT drive between:',
    ['Midnight and 5 a.m.', '10 p.m. and 6 a.m.', 'Sunset and sunrise', '9 p.m. and 5 a.m.'],
    'G1 drivers must not drive between midnight and 5 a.m.',
    ['fines', 'guide'], 'Getting your driver\'s licence'),

  Q('l-g1-highways', 'licence', 1, 'G1 licence holders may NOT drive on which roads, unless accompanied by a driving instructor?',
    ['400-series highways posted over 80 km/h and high-speed expressways like the QEW, DVP and Gardiner', 'Any road posted over 50 km/h', 'Gravel roads', 'Roads in school zones'],
    'G1 drivers stay off 400-series highways posted over 80 km/h and certain high-speed roads, unless the accompanying driver is a driving instructor.',
    ['fines', 'guide'], 'Getting your driver\'s licence'),

  Q('l-g1-bac', 'licence', 1, 'While you hold a G1 licence, your blood alcohol level must be:',
    ['Zero', 'Less than 0.05%', 'Less than 0.08%', 'Less than 0.02%'],
    'G1 and G2 drivers must have a blood alcohol level of zero.',
    'fines', 'Getting your driver\'s licence'),

  Q('l-g2-bac', 'licence', 1, 'As a level two (G2) driver, your blood alcohol level must not be over:',
    ['0.00%', '0.02%', '0.05%', '0.08%'],
    'G2 drivers, like G1 drivers, must have zero blood alcohol.',
    ['sample', 'fines'], 'Getting your driver\'s licence'),

  Q('l-21-under', 'licence', 2, 'A 20-year-old with a full G licence has one beer and then drives. Does the zero-tolerance rule apply?',
    ['Yes. All drivers 21 and under must have zero blood alcohol, whatever their licence class', 'No, only G1 and G2 drivers', 'Only after midnight', 'Only above 0.05%'],
    'It is law that all young drivers 21 and under, regardless of licence class, must have a blood-alcohol level of zero.',
    'guide', 'Getting your driver\'s licence'),

  Q('l-seatbelt-each', 'licence', 2, 'As a novice driver, how many passengers may you carry?',
    ['Only as many as there are working seatbelts', 'As many as fit in the car', 'Two at most', 'None'],
    'Each person in the vehicle must have a working seatbelt. Novice drivers who carry more can lose their licence for at least 30 days.',
    'gr', 'Getting ready to drive'),

  Q('l-g1-time', 'licence', 1, 'How long must you normally hold a G1 licence before taking the G1 road test?',
    ['12 months', '8 months', '6 months', '24 months'],
    'Level One lasts 12 months, or 8 months if you pass a ministry-approved beginner driver education course.',
    'gr', 'Getting your driver\'s licence'),

  Q('l-bde', 'licence', 1, 'If you complete a ministry-approved beginner driver education course, how soon can you take the G1 road test?',
    ['After 8 months', 'After 4 months', 'After 6 months', 'After 12 months'],
    'A BDE course reduces the time at Level One by four months, from 12 to 8, and may lower insurance costs.',
    ['fines', 'guide'], 'Getting your driver\'s licence'),

  Q('l-bde-hours', 'licence', 3, 'A ministry-approved beginner driver education course must last at least:',
    ['40 hours (20 in class, 10 in the vehicle, 10 flexible)', '20 hours', '10 hours in the vehicle only', '60 hours'],
    'Approved BDE courses are at least 40 hours: 20 in-class, 10 in-vehicle and 10 flexible.',
    'guide', 'Getting your driver\'s licence'),

  Q('l-g2-time', 'licence', 1, 'You must hold a G2 licence for at least how long before taking the G2 road test for a full G licence?',
    ['12 months', '6 months', '8 months', '24 months'],
    'Level Two lasts at least 12 months.',
    'fines', 'Getting your driver\'s licence'),

  Q('l-gls-20', 'licence', 2, 'The two-step graduated licensing process takes at least how long?',
    ['20 months', '12 months', '24 months', '36 months'],
    'At least 8 months at G1 (with BDE) plus 12 months at G2: 20 months minimum.',
    'gr', 'Getting your driver\'s licence'),

  Q('l-gls-5yrs', 'licence', 2, 'A new driver has up to how long to complete the graduated licensing process?',
    ['5 years', '2 years', '3 years', '10 years'],
    'Novice drivers have five years. If the G1 or G2 expires before you finish or requalify, you must start again at Level One.',
    'fines', 'Graduated licensing requalification'),

  Q('l-g2-night', 'licence', 2, 'Do you have to be supervised by an experienced driver when driving at night with a G2 licence?',
    ['No, G2 drivers may drive unsupervised at any time', 'Yes, between midnight and 5 a.m.', 'Yes, always', 'Only on highways'],
    'G2 drivers can drive alone on all roads at any time, but must have zero blood alcohol. Teen G2 drivers have passenger limits at night.',
    'fines', 'Getting your driver\'s licence'),

  Q('l-g2-teen-first6', 'licence', 2, 'You are 19 or under and in your first six months with a G2. Between midnight and 5 a.m., how many passengers aged 19 or under may you carry?',
    ['One', 'None', 'Three', 'As many as there are seatbelts'],
    'First six months: one passenger aged 19 or under. After six months (until you get your G or turn 20): up to three. Exemptions apply for immediate family or a fully licensed driver in the front seat.',
    'fines', 'Getting your driver\'s licence'),

  Q('l-g2-teen-after6', 'licence', 2, 'A G2 driver aged 19 or under who has held the G2 for more than six months may carry how many passengers aged 19 or under between midnight and 5 a.m.?',
    ['Up to three', 'One', 'None', 'Unlimited'],
    'After six months, up to three passengers aged 19 or under during those hours, until the driver gets a full G or turns 20.',
    'fines', 'Getting your driver\'s licence'),

  Q('l-g2-exempt', 'licence', 3, 'When do the late-night passenger limits for teen G2 drivers NOT apply?',
    ['When a fully licensed driver is in the front seat, or the passengers are immediate family', 'On weekends', 'On highways', 'When it is raining'],
    'The limits do not apply with a fully licensed accompanying driver in front, or for immediate family members.',
    'gr', 'Getting your driver\'s licence'),

  Q('l-g2-20', 'licence', 2, 'How many passengers may a G2 driver aged 20 or older carry?',
    ['As many as there are working seatbelts', 'One', 'Three', 'Two'],
    'Once you turn 20, the only limit is one person per working seatbelt.',
    'fines', 'Getting your driver\'s licence'),

  Q('l-road-test-wait', 'licence', 2, 'If you fail a road test, how long must you wait before taking it again?',
    ['At least 10 days', 'At least 30 days', 'At least 48 hours', 'At least 6 months'],
    'You must wait at least 10 days between road tests.',
    'guide', 'Getting your driver\'s licence'),

  Q('l-road-test-cancel', 'licence', 2, 'How much notice must you give to cancel a road test without losing your prepaid fee?',
    ['48 hours', '24 hours', '1 week', '10 days'],
    'Cancelling or rescheduling with less than 48 hours\' notice, or not showing up, forfeits the fee.',
    'guide', 'Getting your driver\'s licence'),

  Q('l-road-test-bring', 'licence', 1, 'What must you bring to your G2 (Level Two) road test?',
    ['Your G2 licence and a vehicle in good working order', 'Your birth certificate only', 'A letter from your driving instructor', 'Nothing; the examiner provides a car'],
    'Always carry your licence when driving. Also bring a safe, plated, insured vehicle, fees if applicable, and glasses if you need them. Arrive 30 minutes early.',
    'fines', 'Getting your driver\'s licence'),

  Q('l-road-test-what', 'licence', 1, 'Both the G1 (Level One) and G2 (Level Two) road tests check:',
    ['How safely you drive', 'How fast you can drive', 'How well you know your car\'s engine', 'Your first-aid skills'],
    'Examiners check space management, lane changes, following distance, communication and right-of-way decisions.',
    'fines', 'Getting your driver\'s licence'),

  Q('l-road-test-aids', 'licence', 3, 'Can you use a back-up camera or self-parking system during your road test?',
    ['No. Electronic driving aids may not be used; you must show shoulder and mirror checks', 'Yes, all features are allowed', 'Only the back-up camera', 'Only on the G2 test'],
    'Cruise control, lane monitoring, automatic parking and back cameras may not be used on a road test.',
    'gr', 'Getting your driver\'s licence'),

  Q('l-g1-knowledge-bring', 'licence', 2, 'What should you bring to the G1 knowledge test?',
    ['Two pieces of identification, money for fees, and glasses or contacts if you need them', 'Your car', 'A supervising driver', 'Proof of insurance'],
    'The handbook checklist for the knowledge test: ID, payment, and corrective lenses if needed.',
    'gr', 'Getting your driver\'s licence'),

  Q('l-new-resident', 'licence', 2, 'A new Ontario resident with a valid licence from another province or country can use it in Ontario for how long?',
    ['60 days', '30 days', '6 months', '1 year'],
    'After 60 days you must have an Ontario driver\'s licence.',
    'gr', 'Getting your driver\'s licence'),

  // ---------- Keeping your licence ----------
  Q('l-lend', 'licence', 1, 'When may you lend your driver\'s licence?',
    ['It is not permitted', 'In emergencies', 'To a person learning to drive', 'For identification purposes'],
    'It is illegal to lend your licence, let someone else use it, or use an altered or fake licence.',
    ['mto', 'sample', 'practice', 'faq'], 'Keeping your driver\'s licence'),

  Q('l-address-6', 'licence', 1, 'How soon after changing your name or address must you notify the Ministry of Transportation?',
    ['Within 6 days', 'Within 15 days', 'Within 30 days', 'At your next renewal'],
    'You must tell the ministry within six days. There is no charge for the new licence. (Your health card is 30 days.)',
    ['practice', 'fines', 'guide'], 'Keeping your driver\'s licence'),

  Q('l-name-change', 'licence', 2, 'After a legal name change, how do you update your driver\'s licence?',
    ['Go in person with your documents and current licence; a new photo is taken', 'Mail in your old licence', 'Wait until renewal', 'Call the police'],
    'Name changes are done in person at a Driver and Vehicle Licence Issuing Office. Address changes can be done online.',
    'guide', 'Keeping your driver\'s licence'),

  Q('l-documents', 'licence', 1, 'What documents may a police officer require a driver to produce?',
    ['A valid driver\'s licence', 'The vehicle permit (ownership)', 'The liability insurance card', 'All of the above'],
    'You must hand over your licence, vehicle permit and insurance immediately when asked. You do not have 24 hours.',
    ['sample', 'practice', 'faq'], 'Driving along', { fixed: true, answer: 3 }),

  Q('l-documents-when', 'licence', 2, 'A police officer asks for your licence, permit and insurance. How long do you have to produce them?',
    ['You must produce them immediately', '24 hours', '48 hours', '7 days'],
    'Contrary to popular belief, you do not have 24 hours. Surrender them immediately on request.',
    'gr', 'Driving along'),

  Q('l-suspended-drive', 'licence', 1, 'A person whose driver\'s licence is suspended may:',
    ['Not drive a motor vehicle under any conditions', 'Drive to work only', 'Drive with a fully licensed passenger', 'Drive in an emergency'],
    'You may not drive under any circumstances while suspended.',
    'fines', 'Keeping your driver\'s licence'),

  Q('l-renew-expired', 'licence', 3, 'Your car licence expired 8 months ago. Can you renew it without tests?',
    ['Yes, an expired licence can be renewed within one year without tests', 'No, you must retake all tests', 'Only with a medical note', 'Only if you have no points'],
    'Within one year you can renew without tests. After more than three years expired, suspended or cancelled, you must re-enter graduated licensing.',
    'guide', 'Keeping your driver\'s licence'),

  Q('l-senior', 'licence', 3, 'Drivers aged 80 or older must renew their licence how often?',
    ['Every two years', 'Every year', 'Every five years', 'Every ten years'],
    'Seniors 80+ renew every two years, with a vision test and a screening exercise.',
    'guide', 'Keeping your driver\'s licence'),

  Q('l-medical', 'licence', 3, 'Who must, by law, report drivers with medical conditions that may make driving unsafe?',
    ['Doctors and optometrists', 'Insurance companies', 'Family members', 'Employers'],
    'Doctors and optometrists must report the name and address of anyone over 16 with a condition that may make driving unsafe.',
    'gr', 'Getting your driver\'s licence'),

  // ---------- Demerit points ----------
  Q('l-points-stay', 'licence', 1, 'Demerit points stay on your driving record for how long?',
    ['Two years from the date of the offence', 'One year', 'Three years', 'Two years from the conviction date'],
    'Points stay for two years from the offence date. You start at zero and gain points only when convicted.',
    ['sample', 'fines', 'guide'], 'Keeping your driver\'s licence'),

  Q('l-novice-2', 'licence', 2, 'A G1 or G2 driver accumulates two or more demerit points. What happens?',
    ['They receive a warning letter', 'Their licence is suspended for 30 days', 'Nothing until 6 points', 'They must retake the knowledge test'],
    'Novice levels: 2 points, warning letter; 6 points, second warning letter; 9 points, 60-day suspension.',
    'fines', 'Keeping your driver\'s licence'),

  Q('l-novice-6', 'licence', 3, 'A G1 or G2 driver reaches 6 demerit points. According to the handbook, what happens?',
    ['A second warning letter encouraging better driving', 'A 60-day suspension', 'Licence cancellation', 'A 30-day suspension'],
    'At 6 points novice drivers get a second warning letter, and may be asked to attend an interview. Suspension comes at 9.',
    'fines', 'Keeping your driver\'s licence'),

  Q('l-novice-9', 'licence', 2, 'As a level one or level two driver, if you collect nine or more points in a two-year period, your licence will be suspended for:',
    ['60 days', '30 days', '15 days', '1 year'],
    'A 60-day suspension from the date you surrender your licence. Afterward, points drop to four.',
    ['sample', 'fines', 'guide'], 'Keeping your driver\'s licence'),

  Q('l-novice-after', 'licence', 3, 'After a novice driver\'s demerit-point suspension, their points are reduced to:',
    ['4', '0', '7', '2'],
    'Novice: reduced to 4. Fully licensed: reduced to 7. Reaching 9 again can bring a six-month suspension.',
    'guide', 'Keeping your driver\'s licence'),

  Q('l-full-6', 'licence', 2, 'A fully licensed driver accumulates 6 demerit points. What happens?',
    ['They receive a warning letter', 'Their licence is suspended for 30 days', 'They must attend an interview', 'Nothing'],
    'Full licence levels: 6 points, warning letter; 9 points, second letter (possible interview); 15 points, 30-day suspension.',
    'fines', 'Keeping your driver\'s licence'),

  Q('l-full-9-14', 'licence', 3, 'A fully licensed driver has between 9 and 14 demerit points. What may happen?',
    ['They may have to attend an interview (with a fee) and give reasons why their licence should not be suspended', 'Automatic 60-day suspension', 'Licence cancellation', 'Nothing until 15 points'],
    'At this level you get a second warning and may be called to an interview. If you fail to attend or give good reasons, the licence may be suspended.',
    'fines', 'Keeping your driver\'s licence'),

  Q('l-full-15', 'licence', 2, 'When a fully licensed driver accumulates 15 or more demerit points, the licence is suspended:',
    ['Automatically, for 30 days from when the licence is surrendered', 'At the ministry\'s discretion', 'For 60 days', 'For 3 months'],
    'Fully licensed drivers are suspended for 30 days at 15 points. Afterward, points drop to seven.',
    ['sample', 'fines', 'guide'], 'Keeping your driver\'s licence'),

  Q('l-full-after', 'licence', 3, 'When a fully licensed driver\'s licence is reinstated after a 15-point suspension, the point total:',
    ['Is reduced to seven', 'Is reduced to zero', 'Is reduced to four', 'Stays at 15'],
    'After the suspension, the record is reduced to seven points. Reaching 15 again brings a six-month suspension.',
    'practice', 'Keeping your driver\'s licence'),

  Q('l-surrender', 'licence', 3, 'If you fail to surrender your licence after a demerit-point suspension, you may lose it for up to:',
    ['2 years', '6 months', '1 year', '5 years'],
    'Surrender it at ServiceOntario or by mail. Failing to do so can cost you your licence for up to two years.',
    'fines', 'Keeping your driver\'s licence'),

  Q('l-out-of-province', 'licence', 2, 'You are convicted of a driving offence in another Canadian province. What happens to your Ontario record?',
    ['Demerit points are added as if the offence happened in Ontario', 'Nothing; only Ontario offences count', 'Double points are added', 'You receive a warning only'],
    'Convictions in other provinces and territories, New York State and Michigan count on your Ontario record.',
    ['fines', 'guide'], 'Keeping your driver\'s licence'),

  Q('l-michigan', 'licence', 2, 'True or false: demerit points are added to your record only for offences committed in Canada.',
    ['False. Offences in New York State and Michigan also count', 'True', 'True, except for speeding', 'False, all US states count'],
    'Ontario adds points for convictions in any Canadian province or territory, and in New York State and Michigan.',
    ['fines', 'guide'], 'Keeping your driver\'s licence'),

  Q('l-pts-7', 'licence', 2, 'In Ontario, a driver gets 7 demerit points if convicted of:',
    ['Failing to remain at the scene of a collision', 'Following too closely', 'Failing to stop for a school bus', 'Failing to obey a police officer\'s directions'],
    'Seven points, the most for one offence: failing to remain at a collision, and failing to stop for police.',
    ['sample', 'fines'], 'Keeping your driver\'s licence'),

  Q('l-pts-7-pair', 'licence', 2, 'Which two offences carry 7 demerit points?',
    ['Failing to remain at a collision and failing to stop for police', 'Careless driving and racing', 'Passing a school bus and stunt driving', 'Running a red light and speeding 50 over'],
    'Memory trick: 7 = running away (from a crash or from police).',
    'guide', 'Keeping your driver\'s licence'),

  Q('l-pts-6', 'licence', 3, 'Which offences add six demerit points?',
    ['Careless driving, racing, failing to stop for a school bus, or speeding 50 km/h or more over', 'Following too closely or speeding 30 to 49 over', 'Failing to signal or improper turns', 'Failing to yield or running a stop sign'],
    'Six points: careless driving, racing, failing to stop for a school bus, 50+ over the limit, or 40+ over on roads posted under 80.',
    'fines', 'Keeping your driver\'s licence'),

  Q('l-pts-careless', 'licence', 2, 'How many demerit points for careless driving?',
    ['6', '3', '4', '7'],
    'Careless driving: 6 points, up to $2,000, up to six months in jail, and possible suspension up to two years.',
    'guide', 'Keeping your driver\'s licence'),

  Q('l-pts-school-bus', 'licence', 2, 'Failing to stop for a school bus with its red lights flashing will cost you:',
    ['6 demerit points and a heavy fine (up to $2,000 for a first offence)', '3 demerit points and a warning', '2 demerit points', '4 demerit points and a $110 fine'],
    'Failing to stop for a school bus is 6 points with a heavy fine; repeat offences can mean jail.',
    ['fines', 'guide'], 'Stopping'),

  Q('l-pts-bus-rail', 'licence', 3, 'Which offence carries 5 demerit points?',
    ['A bus driver failing to stop at an unprotected railway crossing', 'Failing to signal', 'Speeding 20 km/h over', 'Careless driving'],
    'The only 5-point offence applies to bus drivers at unprotected railway crossings.',
    'guide', 'Keeping your driver\'s licence'),

  Q('l-pts-tailgate', 'licence', 2, 'If you are convicted of following too closely (tailgating), how many demerit points are added?',
    ['4', '2', '3', '6'],
    'Following too closely is 4 points, and on a G1/G2 it also triggers a novice suspension.',
    'fines', 'Keeping your driver\'s licence'),

  Q('l-pts-30-49', 'licence', 2, 'Driving how far over the posted speed limit adds four demerit points?',
    ['30 to 49 km/h', '16 to 29 km/h', '50 km/h or more', '10 to 15 km/h'],
    '16–29 over: 3 points. 30–49 over: 4 points. 50+ over: 6 points.',
    ['fines', 'guide'], 'Keeping your driver\'s licence'),

  Q('l-pts-crossover', 'licence', 3, 'Failing to stop at a pedestrian crossover adds how many demerit points?',
    ['4', '2', '3', '6'],
    'Pedestrian crossover: 4 points. (A school crossing guard\'s stop sign is 3.)',
    'guide', 'Keeping your driver\'s licence'),

  Q('l-pts-3-list', 'licence', 3, 'Which offences each add three demerit points?',
    ['Failing to obey a stop sign, failing to report a collision, or failing to yield the right-of-way', 'Careless driving or racing', 'Following too closely', 'Failing to signal'],
    'Three points covers many rules-of-the-road offences, including stop signs and lights, failing to yield, and failing to report a collision.',
    'fines', 'Keeping your driver\'s licence'),

  Q('l-pts-crossing-guard', 'licence', 3, 'A driver does not follow the stopping rules at a school crossing with a guard. According to the handbook, they may receive a substantial fine and how many demerit points?',
    ['3', '2', '4', '6'],
    'The handbook and the demerit table give 3 points for failing to obey a school crossing stop sign. (One uploaded PDF says 4; the handbook says 3.)',
    'fines', 'Stopping'),

  Q('l-pts-improper-pass', 'licence', 3, 'If you are found guilty of improper passing, how many demerit points are added?',
    ['3', '2', '4', '6'],
    'Improper passing is a 3-point offence.',
    'fines', 'Keeping your driver\'s licence'),

  Q('l-pts-wrong-way', 'licence', 3, 'Going the wrong way on a one-way road adds how many demerit points?',
    ['3', '2', '4', '6'],
    'Wrong way on a one-way road: 3 points.',
    'fines', 'Keeping your driver\'s licence'),

  Q('l-pts-rail-barrier', 'licence', 2, 'Driving through, around or under a railway crossing barrier adds how many demerit points?',
    ['3', '2', '4', '7'],
    'Railway barrier offences are 3 points, and they are extremely dangerous.',
    'fines', 'Keeping your driver\'s licence'),

  Q('l-pts-phone', 'licence', 2, 'How many demerit points does a fully licensed driver get for using a hand-held phone while driving?',
    ['3', '2', '4', '6'],
    'Hand-held device use or viewing a display screen unrelated to driving: 3 points (novice drivers get suspensions instead).',
    ['fines', 'guide'], 'Keeping your driver\'s licence'),

  Q('l-pts-hov', 'licence', 3, 'What is the penalty for improper use of an HOV lane?',
    ['A fine (about $110) and 3 demerit points', 'A warning letter', '6 demerit points', 'A licence suspension'],
    'Improper HOV use is a 3-point offence with a fine; you must re-enter the general lanes at the next entry/exit zone.',
    'fines', 'Freeway driving'),

  Q('l-pts-seatbelt', 'licence', 1, 'How many demerit points does a driver get for not wearing a seatbelt?',
    ['2', '0', '3', '4'],
    'Driver not wearing a seatbelt: 2 points plus a fine.',
    'guide', 'Getting ready to drive'),

  Q('l-pts-child', 'licence', 2, 'If you are found guilty of carrying a child passenger who is not properly secured, how many demerit points are added?',
    ['2', '3', '4', '0'],
    'Failing to secure an infant, toddler or child, or a passenger under 16: 2 points each. Two is the fewest points for one offence.',
    'fines', 'Getting ready to drive'),

  Q('l-passengers-buckle', 'licence', 2, 'Are drivers responsible for making sure their passengers buckle up?',
    ['Only for passengers under 16 years of age', 'Only for passengers over 16', 'Only for passengers in the front seat', 'For all passengers of every age'],
    'Drivers are responsible for passengers under 16. Passengers 16 and older are responsible for themselves.',
    ['sample', 'faq'], 'Getting ready to drive'),

  Q('l-pts-backing', 'licence', 3, 'If you are found guilty of backing on a highway or unnecessary slow driving, how many demerit points are added?',
    ['2', '3', '4', '0'],
    'Both are 2-point offences.',
    'fines', 'Keeping your driver\'s licence'),

  Q('l-pts-cyclist', 'licence', 2, 'Failing to leave 1 m when passing a cyclist may result in a fine and how many demerit points?',
    ['2', '3', '4', '0'],
    'Failing to share the road with a cyclist is a 2-point offence.',
    'fines', 'Sharing the road with other road users'),

  Q('l-pts-move-over', 'licence', 2, 'How many demerit points for breaking the Move Over law?',
    ['3', '2', '4', '6'],
    'Failing to slow and carefully pass, or to move over where possible, for a stopped emergency vehicle or tow truck: 3 points.',
    'guide', 'Dealing with particular situations'),

  Q('l-pts-zero-speed', 'licence', 3, 'How many demerit points for driving 1 to 15 km/h over the speed limit?',
    ['None; it is a fine only', '1', '2', '3'],
    'The demerit table starts speeding points at 16 km/h over.',
    'guide', 'Keeping your driver\'s licence'),

  // ---------- Novice sanctions ----------
  Q('l-novice-escalate', 'licence', 2, 'A G2 driver is convicted of speeding 35 km/h over the limit. Besides the fine, what happens?',
    ['A novice suspension of at least 30 days (first occurrence)', '4 demerit points only', 'A warning letter', 'Nothing extra'],
    'For novice drivers, any offence worth 4 or more points triggers escalating sanctions: 30 days, then 90 days, then cancellation. The points are recorded as zero.',
    'guide', 'Keeping your driver\'s licence'),

  Q('l-novice-ladder', 'licence', 2, 'Under escalating sanctions for novice drivers (within five years), what happens on the third occurrence?',
    ['The licence is cancelled and the driver must restart graduated licensing', 'A 90-day suspension', 'A 30-day suspension', 'A warning letter'],
    '1st: 30 days. 2nd: 90 days. 3rd: cancellation; start over at G1 and retake the tests.',
    'guide', 'Keeping your driver\'s licence'),

  Q('l-novice-condition', 'licence', 2, 'A G1 driver drives alone without an accompanying driver and is convicted. What is the first-occurrence penalty?',
    ['A 30-day licence suspension', 'A warning letter', '2 demerit points only', 'A 1-year suspension'],
    'Violating any graduated licensing condition brings a 30-day suspension for a first occurrence.',
    'gr', 'Keeping your driver\'s licence'),

  Q('l-novice-drink', 'licence', 2, 'A G2 driver is convicted of driving with alcohol in their system for the first time. Under escalating sanctions, the licence suspension is:',
    ['30 days', '24 hours', '90 days', '1 year'],
    'Zero BAC is a novice condition. A first conviction brings a fine and at least a 30-day suspension, on top of any roadside suspension.',
    'fines', 'Keeping your driver\'s licence'),

  Q('l-novice-roadside', 'licence', 3, 'A G1 driver blows 0.02 at a roadside check. What happens at the roadside?',
    ['An immediate licence suspension; it is never "safe" for a novice to have any alcohol', 'Nothing, it is under 0.05', 'A warning only', 'Licence cancelled on the spot'],
    'Any alcohol breaks the zero rule. The handbook says a 24-hour roadside suspension; Ontario\'s updated impaired-driving page (2026) says 7 days plus a $250 penalty and an education course for a first time. Either way, it is an immediate suspension.',
    'guide', 'Keeping your driver\'s licence'),

  Q('l-novice-distracted-1', 'licence', 2, 'A G1 driver is convicted of using a hand-held phone for the first time. What suspension applies?',
    ['30 days', '3 days', '7 days', '90 days'],
    'Novice distracted driving: 30 days first, 90 days second, cancellation third. No demerit points are applied.',
    ['fines', 'guide'], 'Keeping your driver\'s licence'),

  Q('l-novice-distracted-3', 'licence', 3, 'A novice driver is convicted of distracted driving for a third time. What happens?',
    ['Licence cancellation and removal from the graduated licensing system', 'A 90-day suspension', 'A 30-day suspension', '6 demerit points'],
    'The third occurrence cancels the licence; the driver must start graduated licensing over.',
    'fines', 'Keeping your driver\'s licence'),

  Q('l-distracted-full', 'licence', 3, 'If a fully licensed driver is convicted of distracted driving for the first time, they face:',
    ['A fine (up to $1,000), 3 demerit points and a short licence suspension', 'A warning letter only', '6 demerit points and jail', 'A $110 fine and no points'],
    'First conviction: fine of up to $1,000 ($615 if settled out of court), 3 demerit points and a 3-day suspension.',
    ['fines', 'guide'], 'Keeping your driver\'s licence'),

  // ---------- Impaired driving ----------
  Q('l-impaired-criminal', 'licence', 2, 'At what blood alcohol concentration can you be charged with a Criminal Code impaired driving offence?',
    ['Over 0.08 (80 mg in 100 mL of blood)', 'Over 0.05', 'Over 0.02', 'Over 0.10'],
    'Over .08 is a criminal offence. The 0.05 to 0.08 "warn range" brings immediate roadside suspensions.',
    'practice', 'Keeping your driver\'s licence'),

  Q('l-warn-range', 'licence', 2, 'What blood alcohol range is called the "warn range" in Ontario?',
    ['0.05 to 0.08', '0.00 to 0.05', '0.08 to 0.10', 'Above 0.10'],
    'Drivers in the warn range get an immediate roadside suspension, with longer suspensions and programs for repeat occurrences.',
    'gr', 'Keeping your driver\'s licence'),

  Q('l-warn-first', 'licence', 3, 'A fully licensed driver blows 0.06 at a roadside check for the first time. What happens?',
    ['An immediate short roadside licence suspension', 'Nothing; the limit is 0.08', 'A criminal charge', 'A 90-day suspension and impoundment'],
    'The handbook says 3 days for a first warn-range suspension; Ontario\'s current page says 7 days, plus a penalty and an education course. Over 0.08 is a 90-day suspension.',
    'guide', 'Keeping your driver\'s licence'),

  Q('l-adls', 'licence', 2, 'Blowing over 0.08, or refusing a breath test, results in an immediate:',
    ['90-day licence suspension and 7-day vehicle impoundment', '7-day suspension only', '30-day suspension', 'Lifetime suspension'],
    'Administrative driver\'s licence suspension: 90 days, plus a 7-day impoundment, separate from criminal charges.',
    'guide', 'Keeping your driver\'s licence'),

  Q('l-dui-first', 'licence', 3, 'In Ontario, a first conviction for impaired driving under the Criminal Code brings a licence suspension of at least:',
    ['1 year', '6 months', '2 years', '4 years'],
    'You receive a one-year suspension the first time you are convicted of a Criminal Code driving offence; later offences can lead to a lifetime ban.',
    'sample', 'Keeping your driver\'s licence'),

  Q('l-interlock', 'licence', 3, 'A G2 driver is caught with alcohol for the third time in 5 years. Besides a 30-day roadside suspension and a penalty, what else applies?',
    ['An ignition interlock condition for 6 months', 'Nothing else', '6 demerit points', 'A 24-hour suspension'],
    'Ontario\'s current rules (from the study guide sources) add a 16-hour treatment program and a 6-month ignition interlock on a third occurrence.',
    'guide', 'Keeping your driver\'s licence'),

  Q('l-impound-suspended', 'licence', 3, 'You are caught driving while your licence is suspended for an HTA offence. The vehicle you are driving will be impounded for:',
    ['7 days, even if it is borrowed', '24 hours', '45 days', 'Nothing happens to the vehicle'],
    'Seven-day impoundments apply regardless of who owns the vehicle; 45 days for a Criminal Code suspension.',
    'gr', 'Keeping your driver\'s licence'),

  Q('l-drive-suspended', 'licence', 3, 'If you are convicted for the first time of driving while suspended (HTA), you get an extra six-month suspension and also face:',
    ['A fine in the thousands, possible jail time, or both', 'A warning letter', '2 demerit points', 'Nothing else'],
    'Fines run into the thousands, the court can order up to six months in jail, and six months are added to your suspension.',
    'fines', 'Keeping your driver\'s licence'),

  Q('l-cancelled', 'licence', 3, 'Under which circumstance will your licence be cancelled?',
    ['If you fail a driver\'s re-examination', 'If you change your address', 'If you get 6 demerit points', 'If you renew late by one month'],
    'Licences are also cancelled for unpaid reinstatement fees, bounced cheques for fees, or voluntary surrender.',
    'faq', 'Keeping your driver\'s licence'),

  // ---------- Other penalties ----------
  Q('l-police-fail-stop', 'licence', 3, 'If a police officer signals you to pull over and you do not obey, you might:',
    ['Have your licence suspended (at least 5 years), pay a large fine and/or serve time in prison', 'Receive a warning letter', 'Get 2 demerit points', 'Only pay a $110 fine'],
    'Failing to stop for police: 7 points, a mandatory suspension of at least five years, fines up to $25,000 and possible jail.',
    'fines', 'Driving along'),

  Q('l-careless-penalty', 'licence', 3, 'If you are convicted of careless driving, you get six demerit points and can get:',
    ['A fine up to $2,000, up to six months in jail, and a licence suspension of up to two years', 'A warning letter', 'A $110 fine only', 'A lifetime ban'],
    'Careless driving causing bodily harm or death carries even larger fines and penalties.',
    'fines', 'Dealing with particular situations'),

  Q('l-stunt-threshold', 'licence', 2, 'On a road posted at 60 km/h, at what speed does it become stunt driving?',
    ['100 km/h (40 or more over on roads posted under 80)', '90 km/h', '110 km/h', '150 km/h'],
    'Stunt driving includes 40+ km/h over on roads posted under 80 km/h, 50+ over on any road, or 150 km/h or more anywhere.',
    'guide', 'Keeping your driver\'s licence'),

  Q('l-stunt-roadside', 'licence', 3, 'What happens immediately at the roadside when you are stopped for stunt driving?',
    ['A 30-day licence suspension and 14-day vehicle impoundment', 'A 7-day suspension', 'A ticket only', 'A 90-day suspension'],
    'Current Ontario rules: 30-day roadside suspension and 14-day impoundment, even if the car is not yours. (Older sources say 7 days for both.)',
    'guide', 'Keeping your driver\'s licence'),

  Q('l-stunt-conviction', 'licence', 3, 'Which penalties can a court impose on a first conviction for driving 50 km/h or more over the limit (stunt driving)?',
    ['A $2,000 to $10,000 fine, 6 demerit points, possible jail up to 6 months and a licence suspension', 'A $110 fine and 3 points', 'A warning letter', '4 demerit points only'],
    'Stunt driving is treated as racing: large fines, 6 points, possible jail and a suspension.',
    'fines', 'Keeping your driver\'s licence'),

  Q('l-stunt-third', 'licence', 3, 'A third stunt driving conviction means:',
    ['A lifetime suspension, reducible after 10 years', 'A 3-year suspension', 'A 10-year suspension', 'A $10,000 fine only'],
    'Suspensions escalate: 1–3 years, then 3–10 years, then lifetime (reducible after 10), then lifetime with no reduction.',
    'guide', 'Keeping your driver\'s licence'),

  Q('l-doubled-fines', 'licence', 2, 'Where are speeding fines doubled?',
    ['In community safety zones, and in construction zones when workers are present', 'In any 50 km/h zone', 'On rural roads at night', 'In school zones in September only'],
    'Community safety zones and construction zones with workers present bring increased fines.',
    'guide', 'Dealing with particular situations', { sign: 'fines-doubled' }),

  Q('l-move-over-fine', 'licence', 3, 'If you are convicted of breaking Ontario\'s Move Over law for the first time, what are the penalties?',
    ['A fine of $400 to $2,000 and 3 demerit points', 'A $110 fine and 2 points', '6 demerit points and a 30-day suspension', 'A warning letter'],
    'First offence: $400 to $2,000 and 3 points, with possible suspension up to 2 years.',
    ['fines', 'guide'], 'Dealing with particular situations'),

  Q('l-move-over-repeat', 'licence', 3, 'If you break the Move Over law a second time within 5 years, what can you face?',
    ['A $1,000 to $4,000 fine, possible jail up to six months and a possible licence suspension', 'A warning letter', 'The same penalty as the first time', 'Only 3 demerit points'],
    'Repeat offences bring higher fines, possible jail and possible suspension up to two years.',
    'fines', 'Dealing with particular situations'),

  Q('l-ambulance-fail', 'licence', 3, 'Failing to pull over for an approaching ambulance can bring a fine, 3 demerit points and also:',
    ['A possible licence suspension of up to 2 years', 'A 3-day suspension only', 'Nothing more than a warning', 'A 14-day impoundment'],
    'Penalties match the Move Over law, including possible jail for repeat offences.',
    'guide', 'Dealing with particular situations'),

  // ---------- Insurance and registration ----------
  Q('l-insurance-min', 'licence', 2, 'All vehicles in Ontario must be insured for third-party liability for at least:',
    ['$200,000', '$50,000', '$100,000', '$1 million'],
    'Ontario has compulsory automobile insurance. Most drivers buy far more than the $200,000 minimum.',
    ['fines', 'guide'], 'Vehicle insurance and registration'),

  Q('l-third-party', 'licence', 2, 'What does third-party liability insurance pay for?',
    ['Injury or damage you cause to other people', 'Repairs to your own car', 'Your car being stolen', 'Your licence fees'],
    'Collision coverage for your own car is optional. Third-party liability covers others you injure or whose property you damage.',
    'guide', 'Vehicle insurance and registration'),

  Q('l-no-insurance', 'licence', 3, 'A first conviction for driving without insurance carries a fine of:',
    ['$5,000 to $25,000', '$400', '$1,000 to $5,000', '$10,000 to $50,000'],
    'First conviction: $5,000 to $25,000. Repeat: $10,000 to $50,000.',
    'guide', 'Vehicle insurance and registration'),

  Q('l-no-insurance-other', 'licence', 3, 'Besides a fine, driving without insurance can also lead to:',
    ['A licence suspension of up to 1 year and vehicle impoundment of up to 3 months', '6 demerit points', 'A warning letter only', 'Nothing else'],
    'The owner and the driver can both be charged.',
    'guide', 'Vehicle insurance and registration'),

  Q('l-plates', 'licence', 3, 'In Ontario, licence plates follow which system?',
    ['Plate-to-owner: plates stay with the owner when the vehicle is sold', 'Plate-to-vehicle: plates stay with the car', 'New plates every year', 'Plates belong to the dealer'],
    'When you sell or change vehicles, remove your plates.',
    'gr', 'Vehicle insurance and registration'),

  Q('l-new-resident-reg', 'licence', 3, 'New Ontario residents have how long to register their vehicles?',
    ['30 days', '60 days', '6 days', '1 year'],
    'Bring a safety standards certificate, proof of insurance, import forms if needed, and your old permit to ServiceOntario.',
    'gr', 'Vehicle insurance and registration'),
];
