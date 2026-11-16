import { Q } from './q';

// Safe Driving: defensive driving, lights, night and weather, skids,
// emergencies, collisions, impairment and distraction.
export const safeBank = [
  // ---------- Defensive driving and getting ready ----------
  Q('s-defensive', 'safe', 2, 'Defensive (strategic) driving is based on which three ideas?',
    ['Visibility, space and communication', 'Speed, power and control', 'Mirrors, signals and brakes', 'Reaction, judgement and luck'],
    'Defensive driving means seeing and being seen, managing the space around your vehicle, and communicating with other road users.',
    'gr', 'Safe and responsible driving'),

  Q('s-mirror-check', 'safe', 1, 'How often should you check your mirrors while driving?',
    ['About every five seconds', 'Only when changing lanes', 'Once a minute', 'Only when braking'],
    'Keep your eyes moving: scan ahead and to the sides and check your mirrors every five seconds or so.',
    'gr', 'Safe and responsible driving'),

  Q('s-greatest-risk', 'safe', 2, 'Where is the greatest risk of a collision, so you should leave the most space?',
    ['In front of you', 'Behind you', 'To your left', 'To your right'],
    'Because the greatest risk of a collision is in front of you, stay well back from the vehicle ahead.',
    'gr', 'Safe and responsible driving'),

  Q('s-blind-spot', 'safe', 1, 'Why is it necessary to look over your shoulder when changing lanes?',
    ['There is always a blind spot your mirrors cannot show, no matter how you adjust them', 'It is only needed for the road test', 'To make eye contact with the driver behind', 'To check that your signal is on'],
    'Side mirrors show only narrow angles. A shoulder check is the only way to be sure your blind spot is clear.',
    'faq', 'Getting ready to drive'),

  Q('s-hands', 'safe', 1, 'Picturing the steering wheel as a clock, where should your hands be?',
    ['At nine o\'clock and three o\'clock', 'At twelve o\'clock', 'At ten and two, gripping tightly', 'One hand at six o\'clock'],
    'The handbook recommends nine and three. Do most steering without taking either hand off the wheel.',
    'gr', 'Driving along'),

  Q('s-seat', 'safe', 2, 'When you are seated properly, how much of the ground in front of the vehicle should you be able to see?',
    ['The ground about four metres in front', 'The ground right at the bumper', 'Only the hood', 'Nothing below the horizon'],
    'Sit high enough to see over the wheel and hood and to see the ground four metres ahead. Use a firm cushion if needed.',
    'gr', 'Getting ready to drive'),

  Q('s-headrest', 'safe', 2, 'How should your headrest be adjusted?',
    ['The back of your head should be directly in front of the middle of the headrest', 'As low as possible', 'Touching your neck', 'Removed for comfort'],
    'A correctly set headrest protects your head and neck in a collision.',
    'gr', 'Getting ready to drive'),

  Q('s-mirror-adjust', 'safe', 3, 'How should you adjust the left outside mirror?',
    ['Lean toward the window and set it so you can just see the rear of your car', 'Set it to show mostly the side of your car', 'Point it at the ground', 'Point it straight back from your normal position'],
    'Lean left and set the mirror so you can just see the car\'s rear; for the right mirror, lean to the centre. This reduces overlap and blind spots.',
    'gr', 'Getting ready to drive'),

  Q('s-fit-to-drive', 'safe', 1, 'You are very upset after an argument. What should you do?',
    ['Wait until you are calm before driving', 'Drive fast to get home sooner', 'Turn up the music and drive', 'Drive only on side streets'],
    'Strong emotions reduce your ability to think and react quickly. If you doubt you are fit to drive, do not drive.',
    'gr', 'Getting ready to drive'),

  Q('s-tired', 'safe', 1, 'If you become very tired while driving, you should:',
    ['Stop and rest', 'Open the window and keep going', 'Drink coffee and continue', 'Turn the radio up'],
    'Stimulants, open windows and loud music do not work. Pull off somewhere safe and sleep.',
    'faq', 'Dealing with particular situations'),

  Q('s-drowsy-times', 'safe', 3, 'Collisions involving drowsiness tend to happen most often at what times?',
    ['Between 2 a.m. and 6 a.m., and between 2 p.m. and 4 p.m.', 'During morning rush hour', 'Right after lunch only', 'Just after sunset only'],
    'Studies show drowsy-driving collisions cluster late at night and early morning, and in the late afternoon.',
    'gr', 'Dealing with particular situations'),

  Q('s-drowsy-sign', 'safe', 2, 'Which is a warning sign that you are dangerously drowsy?',
    ['You cannot remember the last few kilometres you drove', 'You feel hungry', 'You notice the speed limit change', 'You see a lot of traffic'],
    'Other warning signs: trouble keeping your eyes open, frequent yawning, drifting out of your lane, and missing lights and signals.',
    'gr', 'Dealing with particular situations'),

  Q('s-road-rage', 'safe', 2, 'Another driver is acting aggressively and you feel threatened. What should you do?',
    ['Stay in your vehicle, lock the doors and call police, or drive to a police station or busy public place', 'Get out and talk to the driver', 'Drive home quickly', 'Brake suddenly to teach them a lesson'],
    'Do not return aggression or drive home if you think you are being followed. Lock doors, call police, use horn and signals to attract attention.',
    'gr', 'Dealing with particular situations'),

  Q('s-seatbelt-always', 'safe', 1, 'In Ontario, when should you wear a seatbelt?',
    ['Always, every time you travel in a vehicle with seatbelts', 'Only on highways', 'Only at night', 'Only if there is no airbag'],
    'Wear your seatbelt every time. Airbags do not replace seatbelts.',
    'practice', 'Getting ready to drive'),

  Q('s-seatbelt-wear', 'safe', 2, 'How should a seatbelt be worn?',
    ['Lap belt low over the hips and shoulder strap over the shoulder', 'Shoulder strap under the arm', 'Lap belt across the stomach', 'Shoulder strap behind the back'],
    'Wear it snugly: shoulder strap over the shoulder, lap belt low over the hips. Never put two people in one belt.',
    'gr', 'Getting ready to drive'),

  Q('s-infant-seat', 'safe', 2, 'Infants who weigh less than 9 kg (20 lb) must ride in:',
    ['A rear-facing child car seat', 'A forward-facing car seat', 'A booster seat', 'An adult\'s lap with a seatbelt'],
    'Infants under 9 kg must be in a rear-facing seat, best installed in the back seat and never in front of an active airbag.',
    'gr', 'Getting ready to drive'),

  Q('s-booster', 'safe', 3, 'A child may start wearing a seatbelt without a booster seat once they meet any one of which criteria (and can wear the belt properly)?',
    ['Turns 8, weighs 36 kg (80 lb), or is 145 cm (4 ft 9 in) tall', 'Turns 5', 'Weighs 18 kg (40 lb)', 'Can sit still for the whole trip'],
    'Booster seats are for children under 8, from 18 kg up to 36 kg, and under 145 cm. Any one of those limits being reached, with a proper belt fit, means a seatbelt is allowed.',
    'gr', 'Getting ready to drive'),

  Q('s-child-back', 'safe', 2, 'Where is the safest place for a child under age 13 to ride?',
    ['In the back seat', 'In the front passenger seat', 'In the cargo area', 'On a parent\'s lap'],
    'The handbook says the safest place for children under 13 is the back seat, away from active airbags.',
    'gr', 'Getting ready to drive'),

  // ---------- Lights ----------
  Q('s-lights-when', 'safe', 2, 'When does the law require your headlights to be on?',
    ['From half an hour before sunset to half an hour after sunrise, and whenever you cannot clearly see 150 m ahead', 'From sunset to sunrise only', 'From half an hour after sunset to half an hour before sunrise', 'Only when it is completely dark'],
    'The handbook: headlights on from one-half hour before sunset to one-half hour after sunrise, and any time fog, snow or rain keeps you from seeing people or vehicles 150 m away. (One uploaded answer list has the half-hours reversed.)',
    ['practice', 'fines'], 'Getting ready to drive'),

  Q('s-low-beam-oncoming', 'safe', 1, 'When lights are required, you must switch to low beams when an oncoming vehicle is within:',
    ['150 m', '60 m', '300 m', '500 m'],
    'Switch to low beams within 150 m of an oncoming vehicle. Memory trick: oncoming is the bigger number.',
    ['sample', 'practice', 'fines', 'guide'], 'Driving at night and in bad weather'),

  Q('s-low-beam-following', 'safe', 2, 'When following another vehicle at night, switch to low beams when you are within:',
    ['60 m', '150 m', '30 m', '100 m'],
    'Use low beams when you are less than 60 m behind another vehicle, unless you are passing it, so you do not dazzle the driver in their mirrors.',
    ['practice', 'fines', 'guide'], 'Driving at night and in bad weather'),

  Q('s-low-beam-curve', 'safe', 3, 'On a dark country road with high beams on, you come to a curve or hilltop. What should you do?',
    ['Switch to low beams so you can see oncoming headlights and avoid blinding drivers', 'Keep high beams on to see further', 'Turn your lights off briefly', 'Flash your high beams repeatedly'],
    'Switch to low beams at curves and hilltops. If you see no headlights, switch back to high beams.',
    'gr', 'Driving at night and in bad weather'),

  Q('s-parking-lights', 'safe', 1, 'Choose the correct statement about parking lights.',
    ['Parking lights are for parking only', 'Parking lights can replace headlights at dusk', 'Parking lights are for driving in fog', 'Parking lights must be on whenever you drive'],
    'Parking lights are only for parking. In low light, use your headlights.',
    ['practice', 'faq'], 'Getting ready to drive'),

  Q('s-drl', 'safe', 2, 'Can you rely on daytime running lights at night or in poor light?',
    ['No. They may not turn on your tail lights; use your full headlight system', 'Yes, they are the same as headlights', 'Yes, if the street is lit', 'Only in rain'],
    'Daytime running lights are only for good light. They can leave tail lights off and cast glare. Turn on your headlights.',
    'gr', 'Getting ready to drive'),

  Q('s-headlight-standard', 'safe', 3, 'Your headlights must shine a white light that can be seen at least how far ahead?',
    ['150 m', '60 m', '100 m', '300 m'],
    'Headlights must be seen at least 150 m ahead and light objects 110 m away. Red rear lights must be visible from 150 m.',
    'gr', 'Getting ready to drive'),

  // ---------- Night and weather ----------
  Q('s-overdriving', 'safe', 1, 'Overdriving your headlights at night is dangerous because:',
    ['You cannot stop within the distance you can see', 'Your headlights are too bright', 'It drains the battery', 'It is illegal to use high beams'],
    'You overdrive your headlights when your stopping distance is longer than the distance your lights show.',
    ['sample', 'faq'], 'Driving at night and in bad weather'),

  Q('s-night-speed', 'safe', 1, 'Why is it more dangerous to drive at the maximum speed limit at night than in daytime?',
    ['You cannot see as far ahead at night', 'Your reaction time is slower at night', 'Some drivers use only parking lights', 'Roads are more slippery at night'],
    'At night and in bad weather you cannot see as far ahead, even with headlights. Slow down.',
    ['mto', 'practice', 'faq'], 'Driving at night and in bad weather'),

  Q('s-glare', 'safe', 1, 'At night, an oncoming vehicle has blinding high beams on. The safest thing to do is:',
    ['Look slightly to the right-hand side of the road', 'Look straight into the lights', 'Flash your high beams back', 'Close one eye'],
    'Look up, beyond and slightly to the right of the oncoming lights to keep track of your lane.',
    ['practice', 'faq'], 'Driving at night and in bad weather'),

  Q('s-tunnel', 'safe', 3, 'You enter a tunnel on a bright, sunny day. What should you do?',
    ['Slow down, remove sunglasses and turn on your headlights', 'Speed up to get through quickly', 'Keep sunglasses on to reduce glare', 'Turn on hazard lights only'],
    'Slowing gives your eyes time to adjust to the reduced light.',
    'gr', 'Driving at night and in bad weather'),

  Q('s-fog-lights', 'safe', 1, 'When driving in heavy fog, you should use:',
    ['Low-beam headlights', 'High-beam headlights', 'Parking lights only', 'No lights, to avoid glare'],
    'High beams reflect off the moisture droplets and make it harder to see. Use low beams, plus fog lights if you have them.',
    ['practice', 'faq'], 'Driving at night and in bad weather'),

  Q('s-fog-guide', 'safe', 2, 'In fog, what should you use as a guide for your position?',
    ['The right edge of the road', 'The centre line', 'The tail lights of the car ahead, staying close', 'Oncoming headlights'],
    'Use the right edge of the road as a guide rather than the centre line, and increase your following distance.',
    'gr', 'Driving at night and in bad weather'),

  Q('s-fog-too-dense', 'safe', 2, 'The fog becomes too dense to continue. What should you do?',
    ['Pull completely off the road into a safe area, keep low beams on and turn on hazard flashers', 'Stop in your lane and turn on flashers', 'Speed up to get through it', 'Follow the car ahead closely'],
    'Never stop on the travelled road; you could become the first link in a chain-reaction collision.',
    'gr', 'Driving at night and in bad weather'),

  Q('s-fog-clearing', 'safe', 3, 'The fog seems to be clearing. Should you speed up?',
    ['No. Avoid speeding up suddenly; you could drive back into fog', 'Yes, to make up time', 'Yes, once you can see 60 m', 'Only if no one is behind you'],
    'Do not speed up suddenly, even if the fog seems to be lifting.',
    'gr', 'Driving at night and in bad weather'),

  Q('s-rain-slippery', 'safe', 2, 'When is a road likely to be most slippery?',
    ['In the first few minutes after it starts to rain', 'After several hours of heavy rain', 'Right after a snowplow passes', 'On a dry, sunny day'],
    'Rain makes roads slippery, especially as the first drops fall and mix with oil and dust on the surface.',
    'practice', 'Driving at night and in bad weather'),

  Q('s-hydroplaning', 'safe', 2, 'Hydroplaning happens when your tires ride up on water. How can you help prevent it?',
    ['Slow down in the rain and keep tires with good tread at the proper pressure', 'Speed up through standing water', 'Use cruise control', 'Brake hard when you feel it start'],
    'Make sure you have properly inflated tires with deep tread, and slow down when the road is wet.',
    'faq', 'Driving at night and in bad weather'),

  Q('s-puddles', 'safe', 2, 'Why should you avoid driving through puddles?',
    ['They can hide potholes, spray others, stall your engine and make your brakes less effective', 'They are illegal to drive through', 'They only damage paint', 'They make your tires wear faster'],
    'A puddle can hide a large pothole. Spray can blind other drivers or soak pedestrians, and water reduces braking.',
    'gr', 'Driving at night and in bad weather'),

  Q('s-flooded-brakes', 'safe', 3, 'After driving through a flooded stretch of road, how should you test your brakes?',
    ['When safe, stop quickly and firmly at about 50 km/h and check that the car stops straight', 'Pump the brakes while driving at highway speed', 'Do nothing; they dry on their own', 'Drive with the parking brake on for a while'],
    'Test the brakes at about 50 km/h. A pull to one side or a spongy pedal after they are dry means get them repaired.',
    'gr', 'Driving at night and in bad weather'),

  Q('s-skid-cause', 'safe', 1, 'Most skids are the result of:',
    ['Driving too fast for road conditions', 'Worn-out wipers', 'Using low beams', 'Driving in the right lane'],
    'Most skids result from driving too fast for conditions. Hard braking and aggressive turning or accelerating also cause skids.',
    'practice', 'Driving at night and in bad weather'),

  Q('s-skid-recover', 'safe', 1, 'To get your vehicle out of a skid, you should first:',
    ['Steer in the direction you want to go', 'Steer straight ahead', 'Steer in the opposite direction of the skid', 'Apply the brakes hard'],
    'Ease off the accelerator or brake and steer where you want to go, without oversteering. Brake gently only once you regain control.',
    ['mto', 'practice', 'faq'], 'Driving at night and in bad weather'),

  Q('s-skid-neutral', 'safe', 3, 'On a very slippery surface, what else can help when your vehicle starts to skid?',
    ['Slipping the transmission into neutral if you can', 'Shifting into a higher gear', 'Turning off the engine', 'Pulling the parking brake hard'],
    'Ease off the pedals and, on a very slippery surface, slip into neutral if you can, while steering where you want to go.',
    'gr', 'Driving at night and in bad weather'),

  Q('s-threshold', 'safe', 2, 'You must stop quickly on a wet road and your vehicle does NOT have ABS. What is the best technique?',
    ['Threshold braking: brake hard, release slightly if a wheel locks, then re-apply', 'Pump the brakes rapidly', 'Pull the parking brake', 'Brake as hard as possible and hold it'],
    'Threshold braking gives a quick controlled stop in your lane. The handbook says do not pump the brakes. (Older answer lists say "pump the brake"; the current handbook does not.)',
    ['practice', 'faq'], 'Driving at night and in bad weather'),

  Q('s-abs', 'safe', 2, 'In an emergency stop in a vehicle with anti-lock brakes (ABS), you should:',
    ['Press the brake pedal hard and let the system control wheel lock-up', 'Pump the brakes', 'Brake gently to avoid pulsing', 'Release the pedal when it vibrates'],
    'With ABS, press hard and hold. You may feel pulsing; do not release the pedal. ABS keeps steering control but does not shorten stopping distance.',
    'gr', 'Driving at night and in bad weather'),

  Q('s-abs-distance', 'safe', 3, 'What can you expect from ABS compared with regular brakes?',
    ['It helps you keep steering control, but stopping distance is not shortened', 'It always stops you in half the distance', 'It lets you brake later safely', 'It works only on dry roads'],
    'The handbook: although ABS helps prevent wheel lock, you should not expect the stopping distance to be shorter.',
    'gr', 'Driving at night and in bad weather'),

  Q('s-black-ice', 'safe', 2, 'Where does ice usually form first as temperatures drop?',
    ['On bridges, overpasses and shaded areas', 'On sunny stretches', 'Near intersections', 'In the right lane only'],
    'Shaded areas and bridges or overpasses freeze first. Shiny, black-looking asphalt may be black ice.',
    'gr', 'Driving at night and in bad weather'),

  Q('s-snowplow-pass', 'safe', 2, 'Several snowplows are clearing a freeway side by side. What should you NOT do?',
    ['Try to pass between them', 'Stay well back', 'Be patient', 'Watch for blowing snow'],
    'Staggered plows pass a ridge of snow between them. There is not enough room to pass, and the ridge can throw your car out of control.',
    'faq', 'Driving at night and in bad weather'),

  Q('s-snowplow-blue', 'safe', 1, 'Snow-removal vehicles on public roads are equipped with flashing lights of which colour?',
    ['Blue', 'Red', 'Green', 'Amber'],
    'Snowplows use flashing blue lights that can be seen from 150 m. Some have a wing extending up to 3 m to the right.',
    ['sample', 'practice', 'faq'], 'Driving at night and in bad weather'),

  Q('s-snowplow-wing', 'safe', 3, 'How far to the right can a snowplow\'s wing extend?',
    ['Up to 3 m', 'Up to 1 m', 'Up to 5 m', 'Up to 10 m'],
    'Some snow plows have a wing that extends as far as three metres to the right. Never pass a moving plow.',
    'gr', 'Driving at night and in bad weather'),

  Q('s-whiteout-stuck', 'safe', 2, 'You become stuck or stranded in severe winter weather. What should you do?',
    ['Stay with your vehicle, open a window slightly, run the engine sparingly and use flashers', 'Walk to find help', 'Run the engine constantly with windows closed', 'Turn off all lights to save power'],
    'Stay with your vehicle for warmth and safety until help arrives. Keep a winter survival kit in the car.',
    'gr', 'Driving at night and in bad weather'),

  Q('s-manual-hill', 'safe', 2, 'In a vehicle with a manual transmission, a good practice when going down a long, steep hill is to:',
    ['Gear down before the hill and let the engine help with braking', 'Shift into neutral and coast', 'Ride the brakes all the way down', 'Shift into a higher gear'],
    'Downshift before starting downhill. As a guide, use the same gear going down as going up.',
    'faq', 'Stopping'),

  Q('s-one-foot', 'safe', 3, 'Why should you use your right foot for both the brake and the gas pedal?',
    ['So you do not press both pedals at once or flash your brake lights unnecessarily', 'It is easier on the shoes', 'The left foot is too slow', 'It is required only in manual cars'],
    'Using one foot avoids pressing both pedals at once and confusing drivers behind you with brake lights.',
    'gr', 'Stopping'),

  // ---------- Animals ----------
  Q('s-animal', 'safe', 2, 'You see a deer on the road ahead. What should you do?',
    ['Slow down, sound your horn and watch for others; do not try to drive around it', 'Swerve around it quickly', 'Flash your lights and speed past', 'Get out and chase it away'],
    'Animal movements are unpredictable. Slow down, honk, and expect more animals nearby. Most active from dusk to dawn.',
    'gr', 'Dealing with particular situations', { sign: 'deer-crossing' }),

  Q('s-animal-eyes', 'safe', 2, 'Driving at night in an area with wildlife, what should you watch for?',
    ['Shining eyes at the roadside', 'Brake lights on the shoulder', 'Rumble strips', 'Mailboxes'],
    'Scan shoulder to shoulder and use high beams when safe. If you see shining eyes, slow down and be ready to stop.',
    'gr', 'Dealing with particular situations'),

  Q('s-hit-deer', 'safe', 3, 'If you hit a deer or moose, who should you report it to?',
    ['The local police service or the Ministry of Natural Resources', 'Your insurance company only', 'No one', 'The nearest farmer'],
    'Report it to police or the Ministry of Natural Resources. Do not try to move an injured animal.',
    'gr', 'Dealing with particular situations'),

  // ---------- Emergencies ----------
  Q('s-brake-fail', 'safe', 2, 'Your brakes fail. What should you do?',
    ['Pump the brake pedal; if that does not work, apply the parking brake gently but firmly while holding the release button', 'Turn off the engine immediately', 'Shift into reverse', 'Pull the parking brake as hard as you can'],
    'Pumping may restore hydraulic pressure. Then use the parking brake gently but firmly. If you manage to stop, do not drive away; call for help.',
    'faq', 'Dealing with emergencies'),

  Q('s-gas-sticks', 'safe', 2, 'Your gas pedal sticks. What should you try first?',
    ['Lift the pedal by slipping your foot under it', 'Reach down with your hand', 'Turn off the ignition at speed', 'Pull the parking brake hard'],
    'If that fails, turn on hazards, shift to neutral and stop as soon as you safely can, off the road. Do not reach down with your hands while moving.',
    'gr', 'Dealing with emergencies'),

  Q('s-headlights-out', 'safe', 2, 'Your headlights suddenly go out at night. What should you do?',
    ['Check the switch; if they stay out, turn on hazards and stop safely off the road', 'Keep driving slowly with no lights', 'Follow another car closely', 'Use your high beams'],
    'It is dangerous and illegal to drive at night without lights. Stop off the road and call for help.',
    'gr', 'Dealing with emergencies'),

  Q('s-wheels-off', 'safe', 2, 'Your right wheels drop off the pavement. What is the best way to get back on the road?',
    ['Grip the wheel, take your foot off the gas, avoid hard braking, then steer back when slowed', 'Brake hard and turn sharply back', 'Speed up and swing back on', 'Stop in the ditch'],
    'Do not panic or turn sharply. Let the vehicle slow, then steer gently back onto the pavement.',
    ['practice', 'faq'], 'Dealing with emergencies'),

  Q('s-blowout', 'safe', 2, 'A tire suddenly blows out while you are driving. You should:',
    ['Take your foot off the gas, steer firmly where you want to go, and stop off the road', 'Brake hard immediately', 'Accelerate to keep control', 'Turn sharply to the shoulder'],
    'Blowouts cause strong vibration. Ease off the gas, steer firmly, and bring the vehicle to a stop off the road.',
    'faq', 'Dealing with emergencies'),

  Q('s-freeway-trouble', 'safe', 2, 'Your vehicle starts having trouble on a freeway. What should you do?',
    ['Put on hazards, pull onto the nearest shoulder and stay in the vehicle with doors locked', 'Stop in your lane and raise the hood', 'Keep driving until it stalls', 'Get out and walk for help on the shoulder'],
    'Pull over at the first sign of trouble. Leave through the door away from traffic if you must get out, and do not raise the hood. Stay in the vehicle until help comes.',
    'gr', 'Dealing with emergencies'),

  // ---------- Collisions ----------
  Q('s-collision-injury', 'safe', 1, 'If you are involved in a collision in which someone is injured, you must:',
    ['Report it at once to the nearest provincial or municipal police', 'Report it to your insurer within a week', 'Exchange information and leave', 'Report it only if the damage is high'],
    'Every driver in a collision must stay or return to the scene, give all possible help, and report collisions with injuries to the police.',
    ['practice', 'faq'], 'Dealing with emergencies'),

  Q('s-collision-report', 'safe', 2, 'By law, you must report a collision to the police when there are injuries or when damage to vehicles or property exceeds:',
    ['$5,000', '$1,000', '$2,000', '$10,000'],
    'The current handbook says $5,000. (The uploaded fines PDF says $2,000; that was the older threshold.) Below that, you must still exchange information.',
    ['fines', 'guide'], 'Dealing with emergencies'),

  Q('s-collision-minor', 'safe', 2, 'You are in a minor collision with no injuries and the cars can be driven. What should you do?',
    ['Move the vehicles as far off the road as possible ("steer it, clear it")', 'Leave the cars where they are until police arrive', 'Drive away and call later', 'Stand in the lane to warn traffic'],
    'Moving drivable vehicles off busy roads does not affect the police investigation and prevents more crashes.',
    'gr', 'Dealing with emergencies'),

  Q('s-collision-below', 'safe', 2, 'Damage in your collision is under the reporting threshold and nobody is hurt. What are you still required to do?',
    ['Exchange information with anyone whose vehicle was damaged', 'Nothing at all', 'Report it to the police anyway', 'Pay the other driver in cash'],
    'Even when you do not have to call police, you must exchange information. Get witness names and contact your insurer if claiming.',
    'gr', 'Dealing with emergencies'),

  Q('s-collision-fuel', 'safe', 2, 'At a collision scene with a possible fuel leak, what should you do?',
    ['Turn off engines and make sure no one smokes or lights flares near the vehicles', 'Light flares next to the cars', 'Restart the engines to move them', 'Pour water on the fuel'],
    'Turn off engines, turn on flashers, and keep flames away. If a vehicle is on fire, get people out and well away.',
    'gr', 'Dealing with emergencies'),

  Q('s-collision-shock', 'safe', 2, 'You are not trained in first aid. An injured person at a collision seems to be going into shock. What can you do?',
    ['Cover them with a jacket or blanket and stay with them until help arrives', 'Give them something to drink', 'Move them into your car', 'Walk them around to keep them awake'],
    'If there is no danger of fire, leave injured people where they are and keep them warm.',
    'gr', 'Dealing with emergencies'),

  // ---------- Distraction ----------
  Q('s-phone-call', 'safe', 1, 'Your phone rings while you are driving alone. What should you do?',
    ['Let it go to voicemail, or pull over and park to use it', 'Answer quickly on speaker in your hand', 'Text back at the next red light', 'Hold it below the window'],
    'Use only hands-free devices while driving. Being stopped at a red light still counts as driving.',
    'faq', 'Dealing with particular situations'),

  Q('s-phone-red-light', 'safe', 2, 'Is it legal to text on a hand-held phone while stopped at a red light?',
    ['No. The distracted driving law applies while stopped in traffic or at a red light', 'Yes, the car is not moving', 'Yes, for less than 10 seconds', 'Only for G licence holders'],
    'You are still driving when stopped in traffic or at a light. Hand-held use is only allowed to call 911 in an emergency.',
    'gr', 'Dealing with particular situations'),

  Q('s-handheld-g', 'safe', 1, 'Fully licensed drivers are ____ to use hand-held cell phones while driving.',
    ['Not allowed', 'Allowed', 'Allowed on highways only', 'Allowed if under 50 km/h'],
    'No driver may hold or use a hand-held device while driving. Hands-free is allowed.',
    'fines', 'Dealing with particular situations'),

  Q('s-hands-free', 'safe', 2, 'Which of these are examples of allowed hands-free use?',
    ['A phone used with an earpiece or Bluetooth and voice dialing', 'A GPS securely mounted or built into the dashboard', 'A music player plugged into the car with a pre-set playlist', 'All of the above'],
    'All of these are hands-free. You may not hold the device, and you may only program a GPS by voice while driving.',
    'faq', 'Dealing with particular situations', { fixed: true, answer: 3 }),

  Q('s-screens', 'safe', 1, 'Which items are you prohibited from using or viewing while driving?',
    ['A laptop, a hand-held phone and a portable DVD player', 'A built-in GPS screen', 'Your speedometer', 'A mounted hands-free phone used by voice'],
    'Viewing display screens unrelated to driving, such as phones, laptops and video players, is prohibited.',
    'faq', 'Dealing with particular situations'),

  Q('s-phone-risk', 'safe', 1, 'Using a cellular phone while driving:',
    ['Increases the risk of a collision', 'Is safe if you are careful', 'Improves alertness', 'Only matters at night'],
    'Texting or browsing raises your crash risk about 10 times. Drivers who were texting travelled 28 m further before reacting to a hazard.',
    'faq', 'Dealing with particular situations'),

  Q('s-distraction-careless', 'safe', 3, 'Eating or grooming are not covered by the distracted driving law. Can you still be charged for them?',
    ['Yes, with careless or even dangerous driving', 'No, they are always legal', 'Only if you have a G1', 'Only on highways'],
    'Any distraction that endangers others can lead to a careless driving charge, including hands-free devices.',
    'gr', 'Dealing with particular situations'),

  Q('s-gps-program', 'safe', 2, 'How may you program a GPS while driving?',
    ['Only by voice commands', 'By typing at red lights', 'By holding it in your lap', 'Not at all, even by voice'],
    'Programming a GPS while driving is only allowed by voice. The screen must be built in or securely mounted.',
    'gr', 'Dealing with particular situations'),

  Q('s-tailgater', 'safe', 2, 'Someone is tailgating you. What should you do?',
    ['Change lanes when safe, slow down slightly to add space ahead, or pull over to let them pass on a rural road', 'Brake suddenly to warn them', 'Speed up to get away', 'Hold your position and ignore it'],
    'More space ahead of you means you can brake gradually if needed, giving the tailgater time to react too.',
    'faq', 'Driving along'),

  // ---------- Impairment ----------
  Q('s-alcohol-effects', 'safe', 1, 'The use of alcohol or drugs affects a driver by impairing:',
    ['Vision, judgement and reaction time', 'Only reaction time', 'Only vision', 'Nothing if you feel fine'],
    'Alcohol and drugs, including some prescription and over-the-counter medicines, impair vision, judgement and reaction time.',
    'faq', 'Keeping your driver\'s licence'),

  Q('s-meds', 'safe', 2, 'You have taken an over-the-counter allergy medicine. What should you do before driving?',
    ['Read the package and ask a pharmacist about side effects like drowsiness', 'Nothing; only prescription drugs matter', 'Drink coffee to cancel it out', 'Drive only on side streets'],
    'Some prescription and over-the-counter drugs impair driving, and combining them with any alcohol can be dangerous for days.',
    'gr', 'Keeping your driver\'s licence'),

  Q('s-impaired-not-moving', 'safe', 3, 'Can you be charged with impaired driving if your vehicle is not moving?',
    ['Yes, if you are impaired behind the wheel, even before you start to drive', 'No, only while moving', 'Only if the engine is running', 'Only on a public road'],
    'You can be charged if you have care and control of the vehicle while impaired.',
    'gr', 'Keeping your driver\'s licence'),

  Q('s-breath-refuse', 'safe', 2, 'When stopped by police at a roadside check and asked for a breath sample:',
    ['Refusing is a criminal offence', 'You may refuse if you have not been drinking', 'You may ask for 24 hours to decide', 'You may refuse if you are a G driver'],
    'Failing or refusing to give a breath, blood, oral fluid or urine sample when demanded leads to Criminal Code charges and a 90-day roadside suspension.',
    'practice', 'Keeping your driver\'s licence'),

  // ---------- Environment / efficiency ----------
  Q('s-idle', 'safe', 3, 'To reduce fuel use and emissions, turn off your engine if you will be parked for more than:',
    ['10 seconds', '1 minute', '5 minutes', '30 minutes'],
    'The handbook says to turn off the vehicle if parked more than 10 seconds. Engines warm up within about 30 seconds even in cold weather.',
    'gr', 'Driving efficiently'),

  Q('s-tire-tread', 'safe', 3, 'Replace passenger-vehicle tires when the tread is less than:',
    ['1.5 mm deep', '3 mm deep', '5 mm deep', '10 mm deep'],
    'Replace tires below 1.5 mm or when the wear indicators touch the road. Tires should not be older than 10 years.',
    'gr', 'Maintaining your vehicle'),

  Q('s-winter-tires', 'safe', 2, 'For best winter traction, how should your car be equipped?',
    ['Four winter or all-weather tires with the same tread pattern', 'Winter tires on the front only', 'Summer tires with lower pressure', 'Any mix of tires'],
    'Use similar tires on all four wheels. Studded tires are legal only in northern Ontario.',
    'gr', 'Maintaining your vehicle'),

  Q('s-winter-kit', 'safe', 1, 'Which of these belongs in a winter emergency kit?',
    ['A shovel, booster cables, warning lights or flares, and a blanket', 'Only a phone charger', 'Spare sunglasses', 'Nothing; modern cars do not need one'],
    'Carry a shovel, booster cables, flares or warning lights, a blanket and a tow chain, plus extra washer fluid.',
    'gr', 'Maintaining your vehicle'),

  Q('s-exhaust', 'safe', 3, 'Why are faulty exhaust systems especially dangerous in winter?',
    ['Drivers keep windows and vents closed, so fumes can build up inside', 'Cold air makes exhaust explode', 'They melt snow on the road', 'They drain the battery'],
    'Have your exhaust checked if it sounds noisy or rattles.',
    'gr', 'Maintaining your vehicle'),
];
