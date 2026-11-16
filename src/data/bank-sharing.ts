import { Q } from './q';

// Sharing the Road: pedestrians, cyclists, motorcycles, large vehicles,
// buses, streetcars, farm and horse-drawn vehicles, school buses.
export const sharingBank = [
  // ---------- Pedestrians ----------
  Q('h-ped-crosswalk', 'sharing', 1, 'You are driving up to an intersection with no signal light or police officer, and a pedestrian is in the crosswalk on your side of the street. You should:',
    ['Stop and yield the right-of-way to the pedestrian', 'Slow down and drive around them', 'Sound your horn to warn them', 'Increase speed and take the right-of-way'],
    'Drivers, including cyclists, must stop and let pedestrians cross at crosswalks.',
    ['sample', 'faq'], 'Sharing the road with other road users'),

  Q('h-ped-green', 'sharing', 1, 'When the signal light is green, who has the right-of-way over all others at the intersection?',
    ['Pedestrians crossing with the light', 'Pedestrians crossing against the light', 'Vehicles turning right', 'Vehicles turning left'],
    'While crossing with the signal, pedestrians have the right-of-way over all vehicles, including turning vehicles.',
    ['sample', 'practice', 'faq'], 'Pedestrian signals'),

  Q('h-ped-still-crossing', 'sharing', 1, 'The traffic signal changes while a pedestrian is still in the street. Who has the right-of-way?',
    ['The pedestrian', 'Motorists making turns', 'The motorist coming from the right', 'The motorist coming from the left'],
    'Pedestrians who have already started to cross still have the right-of-way while they finish crossing.',
    ['sample', 'practice'], 'Pedestrian signals'),

  Q('h-car-stopped-crosswalk', 'sharing', 2, 'A car in the next lane is stopped at a marked crosswalk. What should you do?',
    ['Do not pass it; a pedestrian may be crossing in front of it', 'Pass it carefully on the left', 'Pass it if you do not see anyone', 'Sound your horn and pass'],
    'Never pass a vehicle stopped at a crosswalk. A stopped vehicle may be a clue that a pedestrian is crossing.',
    'practice', 'Sharing the road with other road users'),

  Q('h-crossover-wait', 'sharing', 1, 'At a pedestrian crossover, when may you drive on after a pedestrian has crossed in front of you?',
    ['Only when the pedestrian has completely crossed the road and is on the sidewalk', 'As soon as they pass your lane', 'When they reach the middle of the road', 'As soon as the overhead lights stop flashing'],
    'Drivers and cyclists must wait until pedestrians have crossed the whole road and are safely on the sidewalk.',
    'guide', 'Stopping', { sign: 'pedestrian-crossover' }),

  Q('h-crossover-markings', 'sharing', 2, 'How are pedestrian crossovers marked?',
    ['With signs, overhead yellow lights, and double white lines with an X in each approaching lane', 'With a red traffic light', 'With a single yellow line', 'With a stop sign on each corner'],
    'Pedestrian crossovers have specific signs, overhead yellow lights and pavement markings: two white double parallel lines across the road with an X in each lane.',
    'gr', 'Pavement markings', { sign: 'mark-crossover' }),

  Q('h-crossing-guard', 'sharing', 1, 'A school crossing guard is displaying a red and white stop sign. What must you do?',
    ['Stop and stay stopped until all people, including the guard, have cleared the entire roadway', 'Stop, then go once the children pass your lane', 'Slow down and drive past carefully', 'Stop only during school hours'],
    'Remain stopped until everyone, including the crossing guard, has cleared the whole road and it is safe to proceed.',
    ['fines', 'guide'], 'Stopping'),

  Q('h-children', 'sharing', 1, 'Why should you drive slowly in school zones and residential areas?',
    ['Children may dart out from between parked cars and may not know traffic laws', 'The speed limit is always 30 km/h there', 'Police are always present', 'The roads are narrower'],
    'Expect the unexpected. Do not rely on a child\'s knowledge of traffic laws. Take extra care at twilight.',
    'gr', 'Sharing the road with other road users'),

  Q('h-white-cane', 'sharing', 2, 'A pedestrian is using a white cane or guide dog. What does this tell you?',
    ['The person is blind or has a visual disability; give them extra time and care', 'The person is a crossing guard', 'The person is jogging', 'The person must yield to you'],
    'Give extra caution and courtesy to seniors and pedestrians with disabilities, who may be slower crossing.',
    'gr', 'Sharing the road with other road users'),

  Q('h-quiet-car', 'sharing', 3, 'Why do drivers of hybrid and electric vehicles need extra caution around pedestrians?',
    ['Vision-impaired people may rely on engine sound, and these cars make little noise at low speed', 'They accelerate too slowly', 'They have smaller mirrors', 'They cannot stop as quickly'],
    'When slowing or stopping, quiet vehicles make little noise, so pedestrians may not hear you coming.',
    'gr', 'Sharing the road with other road users'),

  Q('h-left-turn-peds', 'sharing', 2, 'Which turn hits more pedestrians at signalized crosswalks?',
    ['Left turns', 'Right turns', 'They are equal', 'U-turns'],
    'More people are hit by cars turning left than turning right, because the driver is busy with the intersection while the pedestrian looks straight ahead.',
    'gr', 'Sharing the road with other road users'),

  Q('h-dark-clothing', 'sharing', 1, 'When is it hardest to see pedestrians?',
    ['At twilight and at night, especially when they wear dark clothing', 'At noon on a sunny day', 'When they carry an umbrella', 'In a school zone'],
    'Twilight and dark clothing often lead to collisions. Take extra care in low light.',
    'gr', 'Sharing the road with other road users'),

  Q('h-wheelchair', 'sharing', 2, 'How should you treat a person using a motorized wheelchair to cross the road?',
    ['As a pedestrian, with the same right-of-way', 'As a vehicle that must yield to you', 'As a cyclist', 'They must use the shoulder'],
    'People using motorized wheelchairs and medical scooters are pedestrians too.',
    'gr', 'Sharing the road with other road users'),

  // ---------- Cyclists ----------
  Q('h-cyclist-1m', 'sharing', 1, 'When passing a cyclist, how much space must you leave between your vehicle and the cyclist, where practical?',
    ['At least 1 m', 'At least 0.5 m', 'At least 2 m', 'At least 30 cm'],
    'Leave at least one metre. If the lane is too narrow to share, change lanes to pass. Not doing so can bring a fine and 2 demerit points.',
    ['fines', 'guide'], 'Sharing the road with other road users'),

  Q('h-cyclist-position', 'sharing', 2, 'About how far from the curb or parked cars are slower cyclists expected to ride?',
    ['About 1 m', 'Right against the curb', 'In the centre of the lane at all times', 'About 3 m'],
    'They ride about a metre from the curb, but may use any part of the lane for safety, such as to avoid potholes or grates.',
    'gr', 'Sharing the road with other road users'),

  Q('h-cyclist-full-lane', 'sharing', 2, 'A cyclist moves into the middle of the lane ahead of you. Which is a legitimate reason?',
    ['To avoid hazards like potholes or sewer grates, or because the lane is too narrow to share', 'Cyclists must always ride in the middle', 'To block cars on purpose, which is illegal', 'There is never a legitimate reason'],
    'Cyclists can use any part of the lane for safety, including crossing tracks at 90 degrees and discouraging unsafe passing.',
    'gr', 'Sharing the road with other road users'),

  Q('h-cyclist-left-lane', 'sharing', 3, 'Which of the following statements about cyclists is NOT true?',
    ['Cyclists are prohibited from using a left-turn lane when turning left', 'Drivers must leave at least 1 m when passing a cyclist', 'Cyclists turn left at intersections the same way as larger vehicles', 'You should not pull up beside a cyclist to turn left at the same time'],
    'Cyclists are permitted to turn left from a left-turn lane. Stay behind a cyclist who is turning left and turn when the way is clear.',
    'faq', 'Sharing the road with other road users'),

  Q('h-cyclist-turn-right', 'sharing', 1, 'Before turning right, what should you do to avoid hitting a cyclist?',
    ['Signal and check your mirrors and the blind spot to your right', 'Sound your horn', 'Speed up to turn before the cyclist', 'Turn from the left lane'],
    'Check your right blind spot for cyclists coming up behind, especially in a bike lane or on a sidewalk or trail.',
    'gr', 'Sharing the road with other road users'),

  Q('h-bike-lane-cross', 'sharing', 2, 'You need to cross a bike lane to turn right at a corner. How do you do it?',
    ['Enter the bike lane only after making sure it is safe, then make the turn', 'Turn across it from the car lane without looking', 'Wait in the bike lane until the light changes', 'Bike lanes may never be crossed'],
    'Bike lanes are usually marked with a solid white line. Take extra care, check for cyclists, and enter only when safe.',
    'gr', 'Sharing the road with other road users'),

  Q('h-bike-box', 'sharing', 2, 'At a red light, there is a painted box with a bicycle symbol in front of your lane. Where do you stop?',
    ['Behind the bike box; never stop in it', 'Inside the box', 'Past the box at the crosswalk', 'Anywhere, it is just paint'],
    'Bike boxes help prevent collisions with cyclists at intersections. Drivers stop behind them.',
    'gr', 'Sharing the road with other road users', { sign: 'mark-bike-box' }),

  Q('h-sharrow', 'sharing', 2, 'Two chevrons painted above a bicycle symbol in a lane (a sharrow) mean:',
    ['The lane is shared by bicycles and vehicles', 'The lane is for bicycles only', 'No bicycles allowed', 'Bicycles must ride on the sidewalk'],
    'A sharrow shows the lane is shared and warns drivers to watch for cyclists in it.',
    'gr', 'Sharing the road with other road users', { sign: 'mark-sharrow' }),

  Q('h-cyclist-horn', 'sharing', 2, 'Should you sound your horn when overtaking a cyclist?',
    ['Not unnecessarily; if you must, tap it lightly while still some distance away', 'Yes, always, loudly', 'Yes, right as you pass', 'Never under any circumstances'],
    'A loud horn can frighten a cyclist and cause them to lose control.',
    'gr', 'Sharing the road with other road users'),

  Q('h-cyclist-follow', 'sharing', 2, 'Why should you not follow a cyclist too closely?',
    ['Bicycles do not have brake lights to warn you when they slow down', 'Cyclists ride faster than cars', 'It is illegal to be behind a bicycle', 'Cyclists cannot hear cars'],
    'Leave extra room behind cyclists; they may slow or stop without warning lights.',
    'gr', 'Sharing the road with other road users'),

  Q('h-cyclist-signal', 'sharing', 2, 'A cyclist holds their right arm straight out. What does it mean?',
    ['They are turning right', 'They are turning left', 'They are stopping', 'They want you to pass'],
    'Cyclists may signal a right turn by extending their right arm straight out. Drivers use the left arm bent up.',
    'gr', 'Sharing the road with other road users'),

  Q('h-door-open', 'sharing', 1, 'When getting out of your car on a busy street, you should open your door:',
    ['Only when you are sure it can be done safely, checking for cyclists first', 'Quickly, so traffic is blocked for less time', 'Whenever traffic stops', 'Only after signalling'],
    'Never open a door into traffic. The "Dutch reach", opening the door with your right hand, forces a shoulder check. Watch for cyclists close to parked cars.',
    'faq', 'Parking along roadways'),

  Q('h-children-bikes', 'sharing', 2, 'Why do children on bicycles need extra caution?',
    ['They may lack training and may not know the rules of the road', 'They ride faster than adults', 'They always ride on the left', 'They have the right-of-way everywhere'],
    'Watch especially for children on oversized bicycles, who may not be able to control them.',
    'gr', 'Sharing the road with other road users'),

  // ---------- Motorcycles ----------
  Q('h-motorcycle-pass', 'sharing', 1, 'If you want to pass a motorcycle, you should:',
    ['Change lanes and pass just as you would another car', 'Pass in the same lane, beside it', 'Flash your lights and squeeze by', 'Never pass a motorcycle'],
    'Motorcycles use a full lane. Moving to one side of the lane is not an invitation to pass in the same lane.',
    'faq', 'Changing positions'),

  Q('h-motorcycle-signal', 'sharing', 2, 'An oncoming motorcycle has its turn signal on. Why should you be careful turning left in front of it?',
    ['Many motorcycle signals do not shut off automatically; the rider may not be turning', 'Motorcycles always turn', 'Motorcycles must yield to left turns', 'Motorcycle signals are brighter'],
    'Make sure the motorcyclist is actually turning before you go.',
    'gr', 'Sharing the road with other road users'),

  Q('h-small-vehicles-left', 'sharing', 2, 'You are turning left behind a motorcycle or moped that is also turning left. What should you do?',
    ['Stay behind it and turn when the way is clear', 'Pull up beside it and turn together', 'Pass it in the intersection', 'Sound your horn'],
    'Smaller vehicles turn left like larger ones. Do not pull up beside them to turn at the same time.',
    'gr', 'Changing directions'),

  // ---------- Large vehicles ----------
  Q('h-truck-mirror', 'sharing', 1, 'If you cannot see a truck driver\'s face in their side mirror, what does it mean?',
    ['The driver cannot see you', 'You are at a safe distance', 'The driver is not paying attention', 'You should honk'],
    'Large vehicles have big blind spots on both sides and directly behind. Stay out of them.',
    'gr', 'Sharing the road with other road users'),

  Q('h-truck-right-turn', 'sharing', 2, 'A large truck ahead swings wide to the left before turning right. What should you do?',
    ['Stay back; do not move into the space that opens on its right', 'Pass it on the right while there is room', 'Honk to tell it to stay in its lane', 'Pull up beside the cab'],
    'Once the front clears the corner, the trailer moves back to the right. A car in that space can be squeezed against the curb.',
    'gr', 'Sharing the road with other road users'),

  Q('h-truck-cut-in', 'sharing', 2, 'After passing a large truck, why should you not cut in close in front of it?',
    ['Trucks need much more distance to stop', 'It is rude but safe', 'Trucks cannot see their front', 'It is only illegal at night'],
    'Cutting in closely takes away the cushion a large vehicle needs to stop safely. Allow more room when passing.',
    'gr', 'Sharing the road with other road users'),

  Q('h-truck-rollback', 'sharing', 2, 'Why should you leave plenty of room when stopped behind a large vehicle on a hill?',
    ['It may roll back when the driver releases the brakes', 'Its exhaust is hot', 'It may reverse without warning', 'Large vehicles must stop twice'],
    'Large vehicles can roll back a little when starting. Leave space.',
    'gr', 'Sharing the road with other road users'),

  Q('h-truck-fatalities', 'sharing', 3, 'According to the handbook, most fatalities in collisions involving large commercial trucks result from:',
    ['The actions of the other driver, not the truck driver', 'Truck mechanical failures', 'Truck drivers speeding', 'Bad weather'],
    'Recent data show most such fatalities are not caused by the truck driver. Know trucks\' blind spots, stopping distances and wide turns.',
    'gr', 'Sharing the road with other road users'),

  Q('h-truck-turbulence', 'sharing', 3, 'A large truck passes you on the highway and your car is pushed by a wall of wind. What causes this?',
    ['Air turbulence created by the large vehicle', 'Your tires being underinflated', 'Hydroplaning', 'The truck\'s brakes'],
    'Large vehicles create heavy turbulence and spray. Keep a firm grip and give them room.',
    'gr', 'Sharing the road with other road users'),

  Q('h-lcv', 'sharing', 3, 'A long commercial vehicle (LCV) is a double trailer that can be up to how long?',
    ['40 m', '15 m', '25 m', '60 m'],
    'Recognize LCVs by their rear placard, and plan for their length and limited speed before passing.',
    'gr', 'Signs'),

  // ---------- Buses and streetcars ----------
  Q('h-bus-bay', 'sharing', 2, 'A bus in a bus bay flashes its left signal to show it is ready to leave. You are in the lane beside the bay. What must you do?',
    ['Allow the bus to re-enter traffic', 'Speed up to pass it first', 'Sound your horn', 'Change into the bus bay'],
    'You must let a bus signalling from a bus bay re-enter traffic. The YIELD sign on the back of transit buses is a reminder.',
    'gr', 'Sharing the road with other road users', { sign: 'yield-to-bus' }),

  Q('h-streetcar-2m', 'sharing', 2, 'A streetcar is stopped to take on or let off passengers and there is no safety island. What does the law require?',
    ['Stop at least 2 m behind the rearmost door where passengers are getting on or off, and proceed only when safe', 'Stop 3 m behind the streetcar', 'Pass on the left', 'Slow down and pass on the right'],
    'Stay at least two metres behind the rear doors until passengers are safely on the sidewalk.',
    ['sample', 'practice', 'faq', 'guide'], 'Changing positions'),

  Q('h-streetcar-island', 'sharing', 2, 'A streetcar is stopped at a stop with a safety island. What does the law require?',
    ['Pass at a reasonable speed and be ready for pedestrians to make sudden moves', 'Stop 2 m behind the rear door', 'Pass on the left', 'Stop and wait for the streetcar to move'],
    'The 2 m rule does not apply where an area is set aside for passengers or there is a safety island, but pass carefully.',
    'faq', 'Changing positions'),

  Q('h-streetcar-side', 'sharing', 2, 'On which side must you pass a moving streetcar on a two-way street?',
    ['On the right', 'On the left', 'Either side', 'You may not pass streetcars'],
    'Pass streetcars on the right unless you are on a one-way road.',
    'gr', 'Changing positions'),

  // ---------- School buses ----------
  Q('h-school-bus-20m', 'sharing', 1, 'You approach a stopped school bus from behind. Its red lights are flashing and the stop arm is out. Where must you stop?',
    ['At least 20 m behind the bus', 'At least 5 m behind the bus', 'Two car lengths behind the bus', '2 m from the rear of the bus'],
    'Stop at least 20 metres back and do not go until the bus moves or the lights stop flashing.',
    ['sample', 'guide'], 'Stopping'),

  Q('h-school-bus-law', 'sharing', 1, 'A school bus with its red lights flashing is stopped ahead. What does the law require when you meet it from the front or overtake it?',
    ['Stop until the bus moves or the signal lights stop flashing', 'Slow to 20 km/h and pass with care', 'Stop, then pass when no children are visible', 'Stop only if you are behind it'],
    'Traffic in both directions must stop unless a median divides the road. Stay stopped until the arm folds and lights stop.',
    ['practice', 'faq'], 'Stopping'),

  Q('h-school-bus-median', 'sharing', 2, 'You are on a road divided by a median and meet a stopped school bus with red lights flashing on the other side. What do you do?',
    ['Continue carefully; only vehicles behind the bus must stop', 'Stop until the bus moves', 'Stop only during school hours', 'Stop 20 m in front of the bus'],
    'On a road with a median strip, only vehicles coming from behind the bus must stop.',
    'gr', 'Stopping'),

  Q('h-school-bus-anytime', 'sharing', 2, 'When does the school bus law apply?',
    ['At any time, on any road, no matter the number of lanes or speed limit', 'Only during school hours', 'Only on roads posted 50 km/h or less', 'Only on school days'],
    'Be prepared to stop for a school bus at any time, not just within school hours.',
    'guide', 'Stopping'),

  Q('h-school-bus-amber', 'sharing', 2, 'A school bus has its overhead amber (yellow) lights flashing. What does it mean?',
    ['It is about to stop to pick up or drop off passengers; slow down and prepare to stop', 'It is about to leave', 'It is broken down', 'You may pass quickly'],
    'Amber lights mean the bus is coming to a stop. Prepare to stop whether you are behind it or approaching it.',
    'gr', 'Sharing the road with other road users'),

  Q('h-school-bus-owner', 'sharing', 3, 'A bus driver reports your car for illegally passing a school bus, but you were not identified as the driver. As registered owner, what can apply to you?',
    ['The fine, but not demerit points or jail', 'Demerit points only', 'Nothing, since you were not identified', 'Jail time only'],
    'School bus drivers and witnesses can report vehicles. Owners may be fined, but demerit points and jail apply only to the convicted driver.',
    'gr', 'Stopping'),

  // ---------- Slow vehicles ----------
  Q('h-farm', 'sharing', 1, 'Farm machinery displaying an orange and red slow-moving vehicle sign is travelling at:',
    ['40 km/h or less', '60 km/h or less', '20 km/h or less', '50 km/h or less'],
    'Slow down, stay well back, and pass only when it is safe. Farmers may turn directly into fields.',
    ['guide'], 'Sharing the road with other road users', { sign: 'slow-moving-vehicle' }),

  Q('h-horse-oncoming', 'sharing', 2, 'A horse-drawn vehicle is approaching from the opposite direction. What should you do?',
    ['Move to the far right of your lane', 'Sound your horn', 'Flash your headlights', 'Speed up to pass it quickly'],
    'Give as much space as possible. Passing too close could startle the horse.',
    'gr', 'Sharing the road with other road users'),

  Q('h-farm-dark', 'sharing', 3, 'When are you especially likely to meet farm machinery on the road after dark?',
    ['During peak planting and harvesting seasons', 'In midwinter', 'Only on weekends', 'Never; it is illegal after dark'],
    'Farmers are often on the road after dark in planting and harvest season. Watch for wide, slow equipment.',
    'gr', 'Sharing the road with other road users'),

  // ---------- Workers and other ----------
  Q('h-workers-move-over', 'sharing', 2, 'Roadside workers, surveyors or a disabled vehicle are on the shoulder ahead. What should you do?',
    ['Slow down, pass with caution and move over a lane if safe', 'Keep your speed', 'Honk as you pass', 'Stop in your lane'],
    'The handbook asks you to slow down and, if safe, move over a lane to increase space between you and the hazard.',
    'gr', 'Dealing with particular situations'),

  Q('h-e-scooters', 'sharing', 1, 'Why does the handbook ask for more awareness of e-bikes and e-scooters?',
    ['They are new types of vehicles appearing more often on roadways', 'They are not allowed on any roads', 'They always have the right-of-way', 'They are slower than pedestrians'],
    'As new technology brings more e-bikes and e-scooters, all road users need increased awareness.',
    'gr', 'Sharing the road with other road users'),
];
