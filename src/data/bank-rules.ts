import { Q } from './q';

// Rules of the Road: intersections, right-of-way, turns, lights, lanes,
// passing, parking, speed and stopping rules.
export const rulesBank = [
  // ---------- Intersections, stopping and right-of-way ----------
  Q('r-stop-sign', 'rules', 1, 'Upon approaching a stop sign, a driver must:',
    ['Stop, and when it is safe to do so, proceed', 'Slow down and, if the way is clear, proceed', 'Slow down, sound the horn, then proceed', 'Stop, sound the horn, then proceed'],
    'A stop sign always means a complete stop. You may go only once the way is clear. Rolling through, even slowly, is not a stop.',
    ['sample', 'practice', 'faq'], 'Driving through intersections', { sign: 'stop' }),

  Q('r-stop-position', 'rules', 2, 'You face a stop sign at an intersection with no stop line, no crosswalk and no sidewalk. Where must you stop?',
    ['At the edge of the intersection', 'Right beside the stop sign', 'Wherever you can see clearly', 'Two car lengths before the sign'],
    'The handbook order is: stop line, then crosswalk (marked or not), then the edge of the sidewalk, then the edge of the intersection.',
    'sample', 'Stopping'),

  Q('r-stop-line-order', 'rules', 2, 'There is no stop line, but there is an unmarked crosswalk at a red light. Where do you stop?',
    ['At the crosswalk, even though it is not marked', 'Past the crosswalk, at the edge of the intersection', 'Beside the traffic light pole', 'Anywhere, as long as you stop completely'],
    'If there is no stop line, stop at the crosswalk, marked or not. Nearly all intersections have crosswalks even when no lines are painted.',
    'gr', 'Stopping'),

  Q('r-yield-sign', 'rules', 1, 'Upon approaching a yield sign, what does the law require you to do?',
    ['Slow down, stop if necessary, and yield the right-of-way', 'Always come to a complete stop', 'Speed up to merge ahead of other traffic', 'Sound your horn and proceed'],
    'A yield sign means you must let traffic in the intersection or close to it go first. Stop if you need to, and go only when the way is clear.',
    ['practice', 'faq'], 'Signs', { sign: 'yield' }),

  Q('r-uncontrolled-same-time', 'rules', 1, 'Two vehicles reach an uncontrolled intersection from different roads at the same time. Who has the right-of-way?',
    ['The vehicle approaching from the right', 'The vehicle approaching from the left', 'The larger vehicle', 'Whichever driver signals first'],
    'At an intersection without signs or lights, yield to a vehicle that arrives first. If you arrive at the same time, the driver on the left yields to the driver on the right.',
    'practice', 'Driving through intersections'),

  Q('r-all-way-stop', 'rules', 1, 'At an intersection with stop signs at all corners, who goes first?',
    ['The first vehicle to come to a complete stop', 'The vehicle on the left', 'The vehicle going straight', 'The vehicle that is turning'],
    'At an all-way stop, yield to the first vehicle that came to a complete stop. If two stop at the same time, the vehicle on the left yields to the vehicle on the right.',
    'gr', 'Driving through intersections'),

  Q('r-all-way-tie', 'rules', 2, 'You and another car stop at an all-way stop at the same moment. The other car is on your right. What do you do?',
    ['Let the car on your right go first', 'Go first because you are on the left', 'Wave the other driver through and go together', 'Whoever is going straight goes first'],
    'When two vehicles stop at the same time at an all-way stop, the vehicle on the left must yield to the vehicle on the right.',
    'gr', 'Driving through intersections'),

  Q('r-straight-vs-left', 'rules', 2, 'Two drivers enter an uncontrolled intersection from opposite directions at the same time. One is going straight and the other is turning left. Who has the right-of-way?',
    ['The driver going straight', 'The driver turning left', 'The driver who signals first', 'Neither; both must stop'],
    'A driver turning left must wait for approaching traffic to pass or turn. The vehicle going straight has the right-of-way.',
    'faq', 'Driving through intersections'),

  Q('r-blocked-intersection', 'rules', 1, 'You are approaching an intersection on a main road and see that the road beyond it is blocked with traffic. You should:',
    ['Stop before entering the intersection and wait until traffic ahead moves on', 'Proceed slowly into the intersection until traffic ahead moves', 'Keep as close as possible to the car ahead', 'Sound your horn to warn the cars ahead'],
    'Never enter an intersection you cannot clear. If the light changes you would block cross traffic. This rule does not apply if you are turning left or right.',
    ['sample', 'practice', 'faq'], 'Driving through intersections'),

  Q('r-driveway-entry', 'rules', 1, 'What must a driver do before entering a highway from a private road or driveway?',
    ['Yield the right-of-way to all vehicles approaching on the highway', 'Enter or cross the highway as quickly as possible', 'Sound the horn and proceed with caution', 'Give a hand signal and then take the right-of-way'],
    'When entering a road from a private road or driveway, you must yield to vehicles on the road and to pedestrians on the sidewalk.',
    ['mto', 'practice'], 'Driving through intersections'),

  Q('r-signal-not-right-of-way', 'rules', 2, 'Does turning on your signal give you the right-of-way?',
    ['No. You must still make sure the way is clear before you move', 'Yes, once you signal others must let you in', 'Yes, but only on multi-lane roads', 'Only if you signal for at least five seconds'],
    'Signalling tells others what you plan to do. It never gives you the right-of-way. Other drivers expect you to yield even when you signal.',
    'gr', 'Driving through intersections'),

  Q('r-turn-yield-peds', 'rules', 1, 'You are turning right on a green light and a pedestrian is crossing the road you are turning onto. You must:',
    ['Wait for the pedestrian to cross', 'Turn quickly before the pedestrian reaches your lane', 'Sound your horn so the pedestrian hurries', 'Turn because the green light gives you the right-of-way'],
    'At any intersection where you turn left or right, you must yield to pedestrians in or approaching your path.',
    'gr', 'Driving through intersections'),

  // ---------- Traffic lights ----------
  Q('r-red-straight', 'rules', 1, 'The traffic light facing you is red and you want to go straight through the intersection. What must you do?',
    ['Stop, then proceed only when the signal turns green and the way is clear', 'Stop, then proceed when no cars are coming', 'Slow down and proceed with caution', 'Proceed if a pedestrian signal shows walk'],
    'A red light means come to a complete stop and wait until the light turns green and the intersection is clear.',
    ['practice', 'faq'], 'Traffic lights', { sign: 'light-red' }),

  Q('r-right-on-red', 'rules', 1, 'In Ontario, it is legal to turn right on a red light:',
    ['Only after coming to a complete stop and yielding the right-of-way', 'Only from a one-way street to another one-way street', 'Only from a two-way street to another two-way street', 'Never'],
    'Unless a sign tells you not to, you may turn right on red after a complete stop, once the way is clear. Signal and yield to pedestrians and others using the road.',
    'sample', 'Changing directions'),

  Q('r-right-on-red-how', 'rules', 2, 'When a right turn on a red light is permitted, what must you do before entering the intersection?',
    ['Stop, signal, and make the turn without interfering with other traffic, including pedestrians', 'Slow down and turn if no cars are coming', 'Wait for the light to turn green', 'Sound the horn and turn'],
    'Come to a complete stop first, signal, then turn only when it will not interfere with traffic or pedestrians.',
    ['practice', 'faq'], 'Changing directions'),

  Q('r-left-on-red', 'rules', 2, 'When may a driver legally turn left on a red light in Ontario?',
    ['From a one-way road onto a one-way road, after a complete stop and when the way is clear', 'From a two-way road onto a one-way road, after a complete stop', 'From a one-way road onto a two-way road, after a complete stop', 'Never; left turns on red are always illegal'],
    'The handbook allows a left turn on red only from a one-way road onto a one-way road, after a complete stop and yielding to pedestrians and traffic. (The uploaded sample test gives "two-way to one-way" as one answer; the handbook does not allow that.)',
    ['sample', 'practice'], 'Traffic lights'),

  Q('r-amber-light', 'rules', 1, 'The signal light changes from green to amber (yellow) as you approach the intersection. What should you do?',
    ['Stop if you can do so safely; otherwise go through with caution', 'Speed up to get through before it turns red', 'Always stop immediately, even if you are very close', 'Continue at the same speed; amber means caution only'],
    'A yellow light means the red light is about to appear. Stop if you can do so safely. If you are so close that you cannot stop safely, drive through with caution.',
    'faq', 'Traffic lights', { sign: 'light-yellow' }),

  Q('r-flashing-amber', 'rules', 1, 'A flashing amber (yellow) light at an intersection means:',
    ['Slow down and drive with increased caution', 'Come to a full stop', 'Danger: dead-end road', 'The signal is out of order, so treat it as a stop'],
    'A flashing yellow light means you should drive with caution when approaching and moving through the intersection.',
    ['sample', 'practice', 'faq'], 'Traffic lights', { sign: 'light-flash-yellow' }),

  Q('r-flashing-red', 'rules', 1, 'A flashing red light at an intersection means:',
    ['Come to a complete stop and proceed only when it is safe', 'Slow down and proceed with caution', 'The intersection is closed', 'Yield only to traffic on your right'],
    'Treat a flashing red light like a stop sign: come to a complete stop and move through only when it is safe.',
    ['practice', 'faq'], 'Traffic lights', { sign: 'light-flash-red' }),

  Q('r-flashing-green', 'rules', 1, 'A flashing green light at an intersection where turns are allowed means you may:',
    ['Turn left, go straight or turn right from the proper lane', 'Only turn left', 'Only go straight', 'Only proceed after stopping'],
    'A flashing green light (an advance green) lets you turn left, go straight or turn right from the proper lane because oncoming traffic still faces a red light.',
    ['practice', 'faq'], 'Traffic lights', { sign: 'light-advance-green' }),

  Q('r-green-arrow-red', 'rules', 1, 'A red light with a green arrow pointing left is shown. What does it mean?',
    ['You may turn left from the left-turn lane in the direction of the arrow', 'Stop and wait for a full green light', 'The arrow is for pedestrians only', 'Only buses may turn left'],
    'With a left-turn green arrow and a red light you may turn left from the left-turn lane. Drivers from the opposite direction may also be turning left on their own arrow.',
    ['sample', 'practice', 'faq'], 'Traffic lights', { sign: 'light-green-arrow' }),

  Q('r-yellow-arrow', 'rules', 2, 'A yellow left-turn arrow appears after the green arrow. What should you do?',
    ['Do not start your turn; stop if you can do so safely', 'Hurry to start your turn before the light changes', 'Turn left; the yellow arrow means oncoming traffic must stop', 'Treat it as a flashing red light'],
    'A yellow arrow means the green light is about to appear for traffic in one or both directions. Do not start the turn. Stop if you safely can; otherwise complete the turn with caution.',
    'gr', 'Traffic lights', { sign: 'light-yellow-arrow' }),

  Q('r-transit-signal', 'rules', 3, 'A round signal on top of a regular traffic light shows a white vertical bar. Who may go?',
    ['Only public transit vehicles; other traffic must yield', 'All traffic going straight', 'Pedestrians only', 'Emergency vehicles only'],
    'That is a transit priority signal. It lets transit vehicles go through or turn while all conflicting traffic faces a red light.',
    'gr', 'Traffic lights', { sign: 'light-transit' }),

  Q('r-lights-out', 'rules', 1, 'You approach an intersection where the traffic lights are not working. You should:',
    ['Treat it as an all-way stop', 'Slow down and proceed with caution', 'Stop and wait until the lights work again', 'Proceed if you are on the busier road'],
    'During a power loss, use the intersection the same way you would an intersection with all-way stop signs.',
    ['sample', 'faq'], 'Traffic lights'),

  Q('r-fully-protected-left', 'rules', 3, 'At an intersection with a separate signal for left turns (a fully protected left turn), the left-turn signal shows red but traffic going straight has a green light. Can you turn left?',
    ['No. Wait for the next left-turn green arrow', 'Yes, once oncoming traffic clears', 'Yes, after a complete stop', 'Yes, if no pedestrians are crossing'],
    'At these intersections you may not begin turning left after the green light appears for straight-through traffic. Wait for your green arrow.',
    'gr', 'Traffic lights'),

  Q('r-police-overrides', 'rules', 1, 'The traffic light facing you is red and a police officer waves you through. You should:',
    ['Obey the officer and go through when safe', 'Stop and wait for the green light', 'Ask the officer to confirm', 'Turn right instead'],
    'When police officers direct traffic, you must follow their directions even if they are different from traffic lights or signs.',
    ['practice', 'faq'], 'Driving along'),

  Q('r-ped-flashing-green', 'rules', 3, 'Is a pedestrian allowed to start crossing on a flashing green light or a left-turn green arrow?',
    ['No, unless a pedestrian signal tells them to', 'Yes, pedestrians always cross on green', 'Yes, but only in a crosswalk', 'Only if no cars are turning'],
    'Pedestrians must not cross on a flashing green light or a left-turn green arrow unless a pedestrian signal tells them to.',
    'gr', 'Pedestrian signals'),

  // ---------- Pavement markings and lanes ----------
  Q('r-solid-line-left', 'rules', 1, 'There is a solid line at the left of your lane. What does it mean?',
    ['It is unsafe to pass', 'You may pass if the way is clear', 'Your lane is ending', 'You may only pass on the right'],
    'A solid line at the left of your lane means it is unsafe to pass. A broken line means you may pass if the way is clear.',
    ['sample', 'practice', 'faq'], 'Pavement markings', { sign: 'mark-solid' }),

  Q('r-broken-line', 'rules', 1, 'A broken centre line at the left of your lane means you may:',
    ['Pass if the way is clear', 'Never pass', 'Pass only on the right', 'Make a U-turn'],
    'A broken line at the left of your lane means you may pass if the way is clear and there are enough broken lines ahead to finish the pass safely.',
    'practice', 'Pavement markings', { sign: 'mark-broken' }),

  Q('r-yellow-white', 'rules', 1, 'What do yellow lines on the road separate?',
    ['Traffic travelling in opposite directions', 'Traffic travelling in the same direction', 'Parking lanes from driving lanes', 'Bicycle lanes from driving lanes'],
    'Yellow lines separate traffic going in opposite directions. White lines separate traffic going in the same direction.',
    'gr', 'Pavement markings'),

  Q('r-broken-white', 'rules', 1, 'Where are broken white lines (dashes) used?',
    ['Between lanes of traffic moving in the same direction', 'Between lanes moving in opposite directions', 'Only at the edge of the road', 'Only in parking lots'],
    'White lines separate traffic going the same way, such as on a one-way street or multi-lane highway.',
    'faq', 'Pavement markings'),

  Q('r-continuity-left', 'rules', 2, 'You see continuity lines (wide, closely spaced broken lines) on your left. What does it usually mean?',
    ['Your lane is ending or exiting; change lanes to keep going straight', 'Your lane continues unaffected', 'You may not change lanes', 'A bus lane begins'],
    'Continuity lines on your left usually mean your lane is ending or exiting. Continuity lines on your right mean your lane continues.',
    'gr', 'Pavement markings', { sign: 'mark-continuity' }),

  Q('r-white-arrow', 'rules', 1, 'A white arrow is painted on your lane. What does it mean?',
    ['You may move only in the direction of the arrow', 'It is a suggestion for the best route', 'The lane is for buses', 'Passing is allowed'],
    'A white arrow painted on a lane means you may move only in the direction shown.',
    'gr', 'Pavement markings'),

  Q('r-solid-lines-objects', 'rules', 3, 'Two solid lines are painted on the pavement leading up to a bridge pier. What do they do?',
    ['Guide traffic away from the fixed object', 'Mark a bike lane', 'Mark a no-stopping zone', 'Show where to stop for a train'],
    'Two solid lines guide traffic away from fixed objects like bridge piers or concrete islands. Yellow and black markings may also be painted on the object itself.',
    'gr', 'Pavement markings'),

  Q('r-keep-right', 'rules', 1, 'Except when passing or preparing to turn left, where should you drive?',
    ['In the right-hand lane, keeping well to the right', 'In the left lane', 'In the centre lane', 'In any lane you like'],
    'Keep to the right of the road, or in the right-hand lane on multi-lane roads, unless you want to turn left or pass. This matters most when you drive slower than others.',
    'practice', 'Driving along'),

  Q('r-lane-change-never', 'rules', 1, 'Never change lanes in traffic without:',
    ['Giving the proper signal and looking to make sure the move can be made safely', 'Looking in the rear-view mirror only', 'Blowing your horn and looking to the rear', 'Decreasing speed and giving the correct signal'],
    'Check your mirrors, check your blind spot over your shoulder, signal, check again, then steer gradually into the new lane.',
    ['mto', 'sample', 'practice', 'faq'], 'Changing positions'),

  Q('r-lane-change-multi', 'rules', 1, 'When changing lanes on a multi-lane highway, a driver should:',
    ['Check mirrors and blind spot, signal, and move only when it is safe', 'Move quickly before someone else takes the space', 'Slow down first, then move over', 'Signal and move right away'],
    'Steps: mirrors, shoulder check, signal, check again, then steer gradually. Keep your speed or increase it gently; do not slow down.',
    ['sample', 'faq'], 'Changing positions'),

  Q('r-lane-change-speed', 'rules', 2, 'While moving into the next lane, what should you do with your speed?',
    ['Keep the same speed or increase it gently', 'Slow down so others can see you', 'Brake lightly to signal your move', 'Stop if the gap looks small'],
    'Steer gradually into the new lane without slowing down. Maintain your speed or gently increase it.',
    'gr', 'Changing positions'),

  Q('r-two-way-left-lane', 'rules', 2, 'How do you use a two-way left-turn lane in the centre of the road?',
    ['Signal, move into it shortly before your turn, slow down, and turn when the way is clear', 'Use it to pass slow traffic', 'Drive in it until you find the street you want', 'Stop in it to let passengers out'],
    'Move into the centre lane shortly before your turn. Vehicles from the other direction use it too, and it must not be used for passing.',
    'gr', 'Changing directions', { sign: 'two-way-left-turn' }),

  // ---------- Turns and turning around ----------
  Q('r-right-turn-lane', 'rules', 1, 'In what part of the road should you be when you intend to make a right turn?',
    ['Close to the right-hand side of the roadway', 'Close to the left side of the roadway', 'Close to the centre line', 'It does not matter'],
    'Unless signs or markings say otherwise, begin and end a right turn close to the right side of the road.',
    ['sample', 'practice'], 'Changing directions'),

  Q('r-left-turn-two-way', 'rules', 2, 'On a road with traffic moving in both directions, where must you be before making a left turn?',
    ['In the lane closest to the centre line, just to the right of it', 'Close to the right curb', 'Straddling the centre line', 'In the oncoming lane'],
    'Move into the far left lane in your direction, still to the right of the centre line, so you do not block oncoming traffic.',
    ['practice', 'faq'], 'Changing directions'),

  Q('r-left-turn-one-way', 'rules', 2, 'Before making a left turn from a one-way street, where should you be?',
    ['Close to the left side of the roadway (the left curb lane)', 'In the right lane', 'In the centre lane', 'Anywhere, as long as you signal'],
    'On a one-way road, make a left turn from the left curb lane.',
    'practice', 'Changing directions'),

  Q('r-left-turn-wheels', 'rules', 2, 'You are stopped in an intersection waiting to turn left while oncoming traffic passes. How should your front wheels be?',
    ['Straight, until you can complete the turn', 'Turned left, ready to go', 'Turned right, away from traffic', 'It does not matter'],
    'With your wheels turned left, a rear-end crash could push you into oncoming traffic. Keep them straight until you can turn.',
    'gr', 'Changing directions'),

  Q('r-two-left-turners', 'rules', 3, 'Two vehicles from opposite directions are waiting to turn left in an intersection. How should they turn?',
    ['Each turns to the left of the other, after yielding to pedestrians and oncoming traffic', 'Each turns to the right of the other', 'The one that arrived second goes first', 'One must go around the block'],
    'Opposing left-turners pass in front of each other: each turns to the left of the other.',
    'gr', 'Changing directions'),

  Q('r-uturn-first', 'rules', 1, 'When deciding whether to make a U-turn, what should you check first?',
    ['Traffic regulations (signs that prohibit it)', 'Trees, fire hydrants or poles near the curb', 'The turning radius of your car', 'The height of the curb'],
    'Before a U-turn, first make sure there is no sign saying not to, and that you can see well in both directions.',
    'mto', 'Changing directions'),

  Q('r-uturn-150', 'rules', 2, 'Never make a U-turn unless you can see at least how far in both directions?',
    ['150 m', '60 m', '100 m', '125 m'],
    'Never make a U-turn unless you can see at least 150 metres in both directions. (Do not mix it up with parking, which needs a 125 m clear view.)',
    'guide', 'Changing directions'),

  Q('r-uturn-illegal', 'rules', 2, 'Under which of the following conditions is it dangerous and unlawful to make a U-turn?',
    ['On a curve or hill with a clear view of less than 150 m in either direction', 'On a railway crossing or within 30 m of one', 'Within 150 m of a bridge, viaduct or tunnel if your view is obstructed', 'All of the above'],
    'All of these are illegal places for a U-turn. The handbook: never on a curve, on or near a railway crossing or hilltop, or near a bridge or tunnel that blocks your view.',
    ['practice', 'fines'], 'Changing directions', { fixed: true, answer: 3 }),

  Q('r-reverse-divided', 'rules', 3, 'On what kind of road is it illegal to drive in reverse, including on the shoulder?',
    ['A divided road with a speed limit over 80 km/h', 'Any road with a speed limit over 50 km/h', 'Any one-way street', 'Any road in a school zone'],
    'It is illegal to reverse on a divided road with a speed limit of more than 80 km/h, on the road or the shoulder, unless you are helping someone in trouble.',
    'guide', 'Changing directions'),

  Q('r-reverse-look', 'rules', 1, 'You are backing up straight back. Where should you look?',
    ['Turn your body and head to the right and look back over your right shoulder', 'Use only the rear-view mirror', 'Use only the backup camera', 'Look over your left shoulder only'],
    'When reversing straight back or to the right, turn and look over your right shoulder. Also check the opposite shoulder and watch for children and cyclists.',
    'gr', 'Changing directions'),

  Q('r-reverse-seatbelt', 'rules', 3, 'Are you allowed to take off your seatbelt while backing up?',
    ['Yes, if you need to turn to see properly, but buckle up before moving forward', 'No, never', 'Only in a parking lot', 'Only if you are a fully licensed driver'],
    "The handbook says you don't have to wear a seatbelt while backing up if you need to turn your body to see. Buckle up again before you drive forward.",
    'gr', 'Changing directions'),

  Q('r-turn-around-safest', 'rules', 1, 'What is the simplest and safest way to turn around when you miss a turn?',
    ['Drive around the block', 'Make a U-turn at the next hill', 'Make a three-point turn on a curve', 'Back up to the missed turn'],
    'Driving around the block is the simplest and safest way. Use a U-turn or three-point turn only when that is not possible.',
    'gr', 'Changing directions'),

  // ---------- Roundabouts ----------
  Q('r-roundabout', 'rules', 1, 'When you are in a roundabout, you should:',
    ['Keep to the right of the centre island and drive counter-clockwise until your exit', 'Drive clockwise around the island', 'Stop inside to let others enter', 'Change lanes to reach your exit'],
    'Travel counter-clockwise, keep right of the island, do not stop except to avoid a collision, and do not change lanes or pass large vehicles.',
    'faq', 'Changing directions', { sign: 'roundabout-ahead' }),

  Q('r-roundabout-entry', 'rules', 2, 'Who has the right-of-way when you enter a roundabout?',
    ['Traffic already in the roundabout', 'Traffic entering the roundabout', 'The vehicle on your right', 'The fastest vehicle'],
    'Circulating traffic has the right-of-way. Look left, adjust speed or stop at the yield sign, and enter when there is a safe gap.',
    'gr', 'Changing directions'),

  Q('r-roundabout-left', 'rules', 2, 'You want to turn left at a two-lane roundabout. Which lane do you use to enter?',
    ['The left lane', 'The right lane', 'Either lane', 'The right lane, then change lanes inside'],
    'Use the left lane to turn left or go straight, and the right lane to turn right or go straight. Do not enter from the right lane to turn left.',
    'gr', 'Changing directions'),

  Q('r-roundabout-missed', 'rules', 3, 'You are in the inside lane of a roundabout and miss your exit. What do you do?',
    ['Continue around until you reach your exit again', 'Cut across the outer lane to exit', 'Stop and wait for a gap', 'Reverse back to the exit'],
    'Do not change lanes in a roundabout. If you miss your exit from the inside lane, keep going around.',
    'gr', 'Changing directions'),

  Q('r-roundabout-emergency', 'rules', 3, 'You are inside a roundabout when an emergency vehicle approaches. What should you do?',
    ['Exit at your intended exit and pull over beyond the traffic island', 'Stop immediately inside the roundabout', 'Pull onto the centre island', 'Keep circling until it passes'],
    'Exit at your intended exit and go beyond the island before pulling over. If you have not entered yet, pull to the right and wait.',
    'gr', 'Changing directions'),

  // ---------- Passing ----------
  Q('r-being-passed', 'rules', 1, 'When the driver of another vehicle is about to overtake and pass your vehicle, you must:',
    ['Move to the right and allow the vehicle to pass', 'Speed up so passing is not necessary', 'Move to the left to prevent passing', 'Signal the other driver not to pass'],
    'When faster traffic wants to pass, move to the right and let it pass safely. Speeding up while being passed is unlawful and dangerous.',
    ['mto', 'practice', 'faq'], 'Changing positions'),

  Q('r-being-passed-speed', 'rules', 1, 'Another driver signals that they want to pass you. What must you do?',
    ['Give way and do not increase your speed until they have passed', 'Speed up to keep your position', 'Move left to block them', 'Brake hard so they get by quickly'],
    'Give way and do not speed up. On an undivided road, move to the right side of your lane and be ready to slow down to let them in.',
    'faq', 'Changing positions'),

  Q('r-pass-right', 'rules', 2, 'When is passing on the right permitted?',
    ['On multi-lane or one-way roads, or when overtaking a streetcar or a left-turning vehicle', 'Whenever the right shoulder is clear', 'Never', 'Only at night'],
    'Most passing is on the left. You may pass on the right on multi-lane or one-way roads, and when overtaking a streetcar or a vehicle turning left.',
    'faq', 'Changing positions'),

  Q('r-pass-shoulder', 'rules', 3, 'When may you drive on the shoulder to pass?',
    ['Only on the right shoulder, if it is paved, to pass a vehicle turning left', 'On either shoulder if it is paved', 'On the left shoulder to pass slow trucks', 'Never'],
    'You may use the right shoulder only to pass a vehicle turning left and only if the shoulder is paved. You may never pass on the left shoulder.',
    'gr', 'Changing positions'),

  Q('r-pass-bridge', 'rules', 3, 'Passing left of the centre line is not permitted within how many metres of a bridge, viaduct or tunnel?',
    ['30 m', '15 m', '60 m', '150 m'],
    'Passing left of a centre line is not permitted within 30 metres of a bridge, viaduct or tunnel.',
    'gr', 'Changing positions'),

  Q('r-pass-crossover', 'rules', 2, 'You may not pass any vehicle within how far of a pedestrian crossover?',
    ['30 m', '15 m', '20 m', '50 m'],
    'You must not pass any vehicle within 30 metres of a pedestrian crossover. A stopped vehicle may be hiding a pedestrian.',
    'guide', 'Stopping'),

  Q('r-pass-return', 'rules', 2, 'After passing a vehicle, when is it safe to move back into the lane?',
    ['When you can see the entire front of the vehicle you passed in your inside mirror', 'As soon as your rear bumper clears its front bumper', 'Immediately after you signal', 'After counting to two'],
    'Signal, and return when you can see the whole front of the passed vehicle in your rear-view mirror, so you do not cut it off.',
    'gr', 'Changing positions'),

  Q('r-pass-night', 'rules', 3, 'When passing at night, when should you switch on your high beams?',
    ['As you move alongside the vehicle you are passing', 'While you are following it within 60 m', 'Before you pull out, to warn the driver', 'Never use high beams when passing'],
    'Use low beams as you come up behind. Switch to high beams once you are alongside to see more of the road ahead.',
    'gr', 'Changing positions'),

  Q('r-pass-race', 'rules', 2, 'You start to pass and the other vehicle speeds up. What should you do?',
    ['Do not race; go back to your original lane', 'Speed up to complete the pass', 'Sound your horn', 'Stay beside it until it slows'],
    'If the vehicle you are passing speeds up, do not race. Return to your lane.',
    'gr', 'Changing positions'),

  Q('r-truck-lane', 'rules', 3, 'On a road with three or more lanes each way where trucks may not use the far-left lane, which lane is the truck passing lane?',
    ['The lane next to the far-left lane', 'The far-right lane', 'The far-left lane', 'The shoulder'],
    'Trucks pass in the lane next to the far-left lane. If a truck wants to pass you there, move right as soon as you can.',
    'gr', 'Changing positions'),

  // ---------- Speed ----------
  Q('r-50-limit', 'rules', 1, 'Unless otherwise posted, the maximum speed limit in cities, towns, villages and built-up areas is:',
    ['50 km/h', '40 km/h', '60 km/h', '30 km/h'],
    'Where no speed limit is posted, the maximum is 50 km/h in cities, towns and villages, and 80 km/h elsewhere.',
    ['sample', 'practice', 'fines', 'guide'], 'Driving along'),

  Q('r-80-limit', 'rules', 1, 'Unless otherwise posted, the maximum speed limit on a highway outside a city, town or built-up area is:',
    ['80 km/h', '90 km/h', '100 km/h', '70 km/h'],
    'Where no limit is posted, it is 80 km/h outside cities, towns and villages.',
    'practice', 'Driving along'),

  Q('r-safe-speed', 'rules', 1, 'You should, under all conditions, drive at a speed that will allow you to:',
    ['Stop within a safe distance', 'Stop within 150 m (500 ft)', 'Stop within 90 m (300 ft)', 'Stop within 60 m (200 ft)'],
    'Always drive at a speed that lets you stop safely. That means below the posted maximum in bad weather, heavy traffic or construction zones.',
    ['mto', 'sample', 'practice'], 'Driving along'),

  Q('r-max-speed-when', 'rules', 2, 'On a highway, when may you drive at the maximum speed limit?',
    ['Only when traffic and road conditions allow that speed to be driven safely', 'At all times', 'Only at night', 'Only in the left lane'],
    'The limit is a maximum, not a target. Drive slower in bad weather, heavy traffic or construction zones.',
    'faq', 'Driving along'),

  Q('r-radar-detector', 'rules', 3, 'Is it legal to drive with a radar detector (speed measuring warning device) in Ontario?',
    ['No. It is illegal and carries a fine and demerit points', 'Yes, if it is turned off', 'Yes, on private roads only', 'Yes, for fully licensed drivers'],
    'Speed measuring warning devices are illegal. Driving with one brings a fine and 3 demerit points.',
    'gr', 'Driving along'),

  Q('r-cruise-control', 'rules', 2, 'When should you NOT use cruise control?',
    ['On wet, icy or snowy roads, in heavy traffic, or when you are tired', 'On freeways', 'In clear daytime conditions', 'When the speed limit is 100 km/h'],
    'Cruise control can save fuel on open freeways, but do not use it in bad conditions, heavy traffic or when fatigued.',
    'gr', 'Driving along'),

  // ---------- Following distance ----------
  Q('r-two-second', 'rules', 1, 'What is the minimum safe following distance in good conditions?',
    ['At least two seconds behind the vehicle ahead', 'One car length', 'One second', 'Five seconds'],
    'Keep at least two seconds behind the vehicle in front. Leave more in bad weather, behind motorcycles or large trucks, or with a heavy load.',
    ['faq', 'guide'], 'Driving along'),

  Q('r-two-second-how', 'rules', 2, 'How do you check a two-second following distance?',
    ['When the vehicle ahead passes a fixed marker, count "one thousand and one, one thousand and two" until you reach it', 'Count the number of car lengths', 'Look at your speedometer', 'Wait until you can see the vehicle\'s licence plate'],
    'Pick a marker such as a sign or pole. Start counting when the rear of the vehicle ahead passes it. If you reach it before "one thousand and two," you are too close.',
    'faq', 'Driving along'),

  // ---------- Freeway ----------
  Q('r-freeway-enter', 'rules', 2, 'When entering a freeway, after signalling you should:',
    ['Use the acceleration lane to match the speed of freeway traffic, then merge smoothly', 'Stop at the end of the ramp and wait for a gap', 'Merge slowly so others can see you', 'Move directly into the left lane'],
    'In the acceleration lane, speed up to the speed of freeway traffic before merging. Freeway drivers should move over, if safe, to leave room.',
    'practice', 'Freeway driving'),

  Q('r-freeway-missed-exit', 'rules', 1, 'You miss your freeway exit. What should you do?',
    ['Continue to the next exit', 'Stop on the shoulder and reverse', 'Make a U-turn through the median', 'Slow down in the lane and back up'],
    'Never stop or reverse on a freeway. Take the next exit.',
    'faq', 'Freeway driving'),

  Q('r-freeway-exit-slow', 'rules', 2, 'When should you start slowing down to leave a freeway?',
    ['After you move into the deceleration lane', 'Before you signal, while still in the driving lane', 'Only at the stop sign at the end of the ramp', 'One kilometre before the exit'],
    'Signal and move into the deceleration lane without slowing down, then reduce speed gradually to the ramp speed.',
    'gr', 'Freeway driving'),

  Q('r-velocitization', 'rules', 3, 'After a long time at freeway speed, you may feel you are going slower than you are. What is this called?',
    ['Velocitization (speed adaptation)', 'Highway hypnosis', 'Hydroplaning', 'Overdriving'],
    'Losing your sense of speed is called velocitization. Check your speedometer when you leave the freeway.',
    'gr', 'Freeway driving'),

  Q('r-freeway-left-lane', 'rules', 1, 'On a multi-lane freeway, what is the far-left lane for?',
    ['Passing slower traffic, then moving back right', 'Cruising at the speed limit', 'Large trucks', 'Slower vehicles'],
    'Keep right and use the left lanes for passing. Do not stay in the far-left lane.',
    'gr', 'Freeway driving'),

  Q('r-freeway-scan', 'rules', 2, 'At freeway speeds, how far ahead should you look?',
    ['Where you will be in the next 15 to 20 seconds', 'Two seconds ahead', 'Just past the vehicle in front', 'Five seconds ahead'],
    'On freeways, look ahead to where you will be in 15 to 20 seconds, or as far as you can see.',
    'gr', 'Freeway driving'),

  Q('r-hov-who', 'rules', 2, 'Who may use a High Occupancy Vehicle (HOV) lane on a provincial highway?',
    ['Vehicles carrying at least two people, plus buses, taxis and green-plate vehicles', 'Any vehicle during off-peak hours', 'Only buses', 'Large trucks with two or more people'],
    'HOV lanes are for vehicles with at least two people, buses, licensed taxis, green-plate vehicles, airport limousines, motorcycles, HOT permit holders and emergency vehicles. Large trucks are never allowed.',
    'gr', 'Freeway driving', { sign: 'hov-lane' }),

  Q('r-hov-buffer', 'rules', 3, 'An HOV lane is separated from the general lanes by a striped buffer zone. May you cross it?',
    ['No. It is illegal and unsafe to cross the striped buffer', 'Yes, whenever it is safe', 'Yes, if you signal', 'Only at night'],
    'Crossing the striped buffer is illegal. Enter and leave the HOV lane only at the marked entry/exit zones.',
    'gr', 'Freeway driving'),

  // ---------- Emergency vehicles ----------
  Q('r-siren-two-way', 'rules', 1, 'On a two-way street you hear the siren of an approaching emergency vehicle. What does the law require you to do?',
    ['Pull to the right as far as possible and stop', 'Speed up and get out of the way', 'Signal the driver to pass', 'Continue at the same speed'],
    'When an emergency vehicle approaches from any direction with lights or siren, bring your vehicle to an immediate stop as near as practical to the right curb.',
    ['sample', 'practice', 'faq'], 'Dealing with particular situations'),

  Q('r-siren-one-way', 'rules', 2, 'You are on a one-way street and an ambulance with its siren on is coming from behind. What does the law require?',
    ['Pull to the nearest curb and stop', 'Pull to the left only and stop', 'Pull to the right only and stop', 'Slow down and let it pass on your right'],
    'On a one-way road or a divided highway with more than two lanes, move to the closest curb or edge of the road and stop. Do not stop on the shoulder.',
    'sample', 'Dealing with particular situations'),

  Q('r-siren-intersection', 'rules', 3, 'You are in an intersection preparing to turn when an emergency vehicle approaches. What should you do?',
    ['Abandon the turn, go straight through when safe, then pull right and stop', 'Complete your turn quickly', 'Stop where you are in the intersection', 'Back out of the intersection'],
    'Clear the intersection by going straight when safe, then pull to the right and stop. This avoids conflict if the emergency vehicle passes on the side you meant to turn to.',
    'gr', 'Dealing with particular situations'),

  Q('r-move-over', 'rules', 2, 'You approach a stopped emergency vehicle or tow truck with its lights flashing in your direction of travel on a multi-lane road. What must you do?',
    ['Slow down, pass with caution and move into a lane away from it if safe', 'Keep your speed and lane', 'Stop behind it and wait', 'Sound your horn as you pass'],
    "This is Ontario's Move Over law: slow down and pass carefully, and if there are two or more lanes in your direction, move into a lane away from the vehicle when safe.",
    ['fines', 'guide'], 'Dealing with particular situations'),

  Q('r-follow-fire', 'rules', 2, 'It is illegal to follow within how far of a fire vehicle responding to an alarm?',
    ['150 m', '60 m', '100 m', '300 m'],
    'It is illegal to follow within 150 metres of a fire vehicle responding to an alarm.',
    'guide', 'Dealing with particular situations'),

  Q('r-green-flash-responder', 'rules', 3, 'A private car shows a flashing green light. What does it mean?',
    ['A volunteer firefighter or medical responder is going to an emergency; yield to them', 'The driver is a learner', 'A funeral procession', 'A slow-moving farm vehicle'],
    'Some firefighters and volunteer medical responders use a flashing green light in their own vehicles. Yield the right-of-way to help them.',
    'gr', 'Dealing with particular situations'),

  Q('r-red-light-front', 'rules', 3, 'Which vehicles may carry a red light visible from the front?',
    ['Emergency vehicles responding to a call', 'Commercial motor vehicles', 'Bicycles', 'Any passenger vehicle'],
    'Only emergency vehicles may show a red light to the front. Emergency vehicles use flashing red, or red and blue, lights.',
    ['sample', 'faq'], 'Dealing with particular situations'),

  Q('r-shoulder-emergency', 'rules', 2, 'Why should you not drive on or block the shoulder of a freeway when emergency vehicles are coming?',
    ['Emergency vehicles may use the shoulder if all lanes are blocked', 'It is reserved for trucks', 'It is only for buses', 'It damages the road'],
    'Keep shoulders, intersections and ramps clear. Emergency vehicles use the shoulder when lanes are blocked.',
    'gr', 'Dealing with particular situations'),

  // ---------- Railway crossings ----------
  Q('r-rail-stop-5', 'rules', 2, 'A train is coming, or a crossing signal is warning of one. Where must you stop?',
    ['At least 5 m from the nearest rail or gate', 'At least 1 m from the gate', 'At least 3 m from the stop line', 'At least 15 m from the crossing'],
    'Stop at least five metres from the nearest rail or gate. Wait until the lights stop flashing and any gate has risen before crossing.',
    ['sample', 'practice', 'fines', 'guide'], 'Stopping'),

  Q('r-rail-gate', 'rules', 1, 'The railway gate is going up after a train passes. When may you cross?',
    ['After the gate has fully risen and the lights have stopped flashing, and you are sure no other train is coming', 'As soon as the train passes', 'While the gate is rising, if you are careful', 'When the driver ahead goes'],
    'Never drive around, under or through a gate while it is down, being lowered or being raised. There may be a second train.',
    'gr', 'Stopping', { sign: 'railway-signals' }),

  Q('r-rail-train-stop', 'rules', 2, 'How far can it take a train to stop under full emergency braking?',
    ['Up to 2 km', 'About 50 m', 'About 150 m', 'About 500 m'],
    'A train can take up to two kilometres to stop. It cannot stop for you, so never race a train to a crossing.',
    'gr', 'Stopping'),

  Q('r-rail-trapped', 'rules', 2, 'Your vehicle gets stuck on a railway crossing. What should you do first?',
    ['Get everyone out and away from the vehicle, then contact authorities', 'Try to restart the engine', 'Push the vehicle off the tracks', 'Stay in the vehicle and call for help'],
    'If trapped on a crossing, get everyone out and away immediately, move to a safe place, then contact authorities.',
    'gr', 'Stopping'),

  Q('r-rail-gears', 'rules', 3, 'What should you avoid while crossing railway tracks?',
    ['Shifting gears and stopping on the tracks', 'Looking both ways', 'Slowing down before the crossing', 'Listening for trains'],
    'Avoid shifting gears on the tracks, and make sure there is room to clear the tracks completely before you start across.',
    'gr', 'Stopping'),

  Q('r-rail-buses', 'rules', 2, 'Which vehicles must stop at every railway crossing, even ones with gates or signals?',
    ['School buses', 'Taxis', 'Motorcycles', 'Pickup trucks'],
    'School buses must stop at all railway crossings, and they do not use their red lights for these stops. Be ready to stop behind them.',
    ['guide'], 'Stopping'),

  Q('r-rail-flagman', 'rules', 3, 'You approach a railway crossing with a stop sign. When may you go through without stopping?',
    ['Only when a flagman directs you to', 'When no train is visible', 'When the lights are off', 'Never stop at railway crossings'],
    'At a railway crossing with a stop sign you must stop unless a flagman directs you otherwise.',
    'gr', 'Stopping'),

  // ---------- Parking ----------
  Q('r-park-hydrant', 'rules', 1, 'How close to a fire hydrant may you legally park?',
    ['No closer than 3 m', 'No closer than 1 m', 'No closer than 6 m', 'No closer than 9 m'],
    'Do not park within 3 metres of a fire hydrant.',
    ['practice', 'fines', 'guide'], 'Parking along roadways'),

  Q('r-park-view', 'rules', 2, 'Do not park on a curve, hill or anywhere you do not have a clear view for at least how far in both directions?',
    ['125 m', '60 m', '100 m', '150 m'],
    'You need a 125 m clear view in both directions to park. (A U-turn needs 150 m.)',
    ['fines', 'guide'], 'Parking along roadways'),

  Q('r-park-bridge', 'rules', 2, 'You may not park on a bridge or within how far of one?',
    ['100 m', '30 m', '50 m', '125 m'],
    'Do not park on or within 100 metres of a bridge.',
    ['fines', 'guide'], 'Parking along roadways'),

  Q('r-park-rail', 'rules', 2, 'You may not park within how far of the nearest rail of a level railway crossing?',
    ['15 m', '5 m', '9 m', '30 m'],
    'No parking within 15 metres of the nearest rail. (Stopping for a train is 5 m; parking is 15 m.)',
    ['fines', 'guide'], 'Parking along roadways'),

  Q('r-park-intersection', 'rules', 2, 'You may not park within how far of an intersection that is NOT controlled by traffic lights?',
    ['9 m', '3 m', '6 m', '15 m'],
    'Do not park within 9 metres of an intersection, or within 15 metres if it is controlled by traffic lights.',
    'fines', 'Parking along roadways'),

  Q('r-park-signal-intersection', 'rules', 2, 'How far from an intersection controlled by traffic lights must you park?',
    ['At least 15 m', 'At least 6 m', 'At least 9 m', 'At least 30 m'],
    'Within 15 metres of a signalized intersection is a no-parking area. Other intersections: 9 metres.',
    'guide', 'Parking along roadways'),

  Q('r-park-entrance', 'rules', 3, 'You may not park within how far of a public entrance to a hotel, theatre or public hall while it is open?',
    ['6 m', '3 m', '9 m', '15 m'],
    'No parking within 6 metres of a public entrance to a hotel, theatre or public hall when it is open to the public.',
    'gr', 'Parking along roadways'),

  Q('r-park-block', 'rules', 1, 'Where must you never park?',
    ['Where you would block a sidewalk, crosswalk, pedestrian crossing or road entrance', 'On a residential street', 'In a marked parking space', 'More than 30 cm from the curb'],
    'Do not park where you will block a sidewalk, crosswalk, pedestrian crossing, road entrance, or a vehicle already parked.',
    'fines', 'Parking along roadways'),

  Q('r-park-travelled', 'rules', 1, 'If you must stop on a rural road, where should you park?',
    ['Off the road on the shoulder, never on the travelled part of the road', 'In your lane with hazard lights on', 'On a curve where traffic is slow', 'Across both lanes'],
    'Never park on the travelled part of a road. Drive onto the shoulder if you must stop.',
    'gr', 'Parking along roadways'),

  Q('r-park-downhill', 'rules', 1, 'Before leaving your car parked facing downhill beside a curb, you should:',
    ['Turn your front wheels to the right (toward the curb) and set the parking brake', 'Turn your front wheels to the left and set the parking brake', 'Leave the wheels straight and set the parking brake', 'Set the parking brake only'],
    'Facing downhill, turn the wheels toward the curb or right shoulder so the car rolls off the road, not into traffic, if the brakes fail.',
    ['sample', 'practice', 'faq'], 'Parking along roadways'),

  Q('r-park-uphill-curb', 'rules', 2, 'You park facing uphill beside a curb. Which way should you turn your front wheels?',
    ['To the left, toward the road, so the tires catch the curb', 'To the right, toward the curb', 'Straight ahead', 'It does not matter'],
    'Uphill with a curb: turn the wheels to the left. If the car rolls back, the front tires catch the curb.',
    'gr', 'Parking along roadways'),

  Q('r-park-uphill-nocurb', 'rules', 2, 'When parking uphill on a street without a curb, angle your front wheels:',
    ['Sharply to the right', 'To the left', 'Straight ahead', 'It does not matter if you use the parking brake'],
    'Uphill without a curb, turn the wheels sharply right. If the vehicle rolls, it goes off the road rather than into traffic.',
    'sample', 'Parking along roadways'),

  Q('r-park-curb-distance', 'rules', 3, 'During a roadside stop, about how far from the curb or edge of the road should your vehicle be?',
    ['No more than about 30 cm', 'About 1 m', 'About 60 cm', 'Exactly 15 cm'],
    'Stop parallel to the curb or edge of the road, no more than about 30 centimetres away.',
    'gr', 'Parking along roadways'),

  Q('r-parallel-space', 'rules', 2, 'How long should a space be for parallel parking?',
    ['About one and a half times the length of your vehicle', 'Exactly the length of your vehicle', 'Twice the length of your vehicle', 'Three car lengths'],
    'Find a space about one and one-half times longer than your vehicle. Pull up about a metre beside the car ahead before reversing in.',
    'gr', 'Parking along roadways'),

  Q('r-pull-out', 'rules', 1, 'Before moving your car from a parked position, you should:',
    ['Check other traffic, signal, and pull out when it is safe', 'Signal and pull out right away', 'Sound your horn and pull out', 'Pull out slowly; others will see you'],
    'Always signal and check for traffic and cyclists (mirrors and blind spot), pulling out only when it is safe.',
    ['practice', 'faq'], 'Parking along roadways'),

  Q('r-after-parking', 'rules', 1, 'After parking your vehicle, you should:',
    ['Turn off the engine and lights, remove the key and lock the doors', 'Leave the engine running if you will be quick', 'Leave the keys in case it must be moved', 'Leave a child inside with the windows open'],
    'Turn off the ignition and lights, remove the key and lock the door. Do not leave children or animals in the vehicle.',
    'gr', 'Parking along roadways'),

  Q('r-accessible-parking', 'rules', 2, 'When may you park in a space reserved for people with disabilities?',
    ['Only when an Accessible Parking Permit belonging to you or a passenger is displayed', 'For up to 15 minutes', 'When no other spaces are free', 'After 6 p.m.'],
    'The permit is issued to a person, not a vehicle. It must be displayed and belong to the driver or a passenger.',
    'gr', 'Parking along roadways', { sign: 'accessible-parking' }),

  // ---------- Misc rules ----------
  Q('r-trailer-people', 'rules', 2, 'While travelling on a highway, the driver is not permitted to carry what in a house or boat trailer?',
    ['People (passengers)', 'Firearms', 'Flammable material', 'Pets'],
    'You may not carry any person in any trailer, including a house or boat trailer, while it is being towed.',
    ['sample', 'practice', 'faq'], 'Towing'),

  Q('r-trailer-one', 'rules', 3, 'How many trailers may you tow behind a non-commercial vehicle?',
    ['One', 'Two', 'Three', 'As many as the hitch can hold'],
    'It is against the law to tow more than one trailer behind a non-commercial vehicle.',
    'gr', 'Towing'),

  Q('r-trailer-weight', 'rules', 3, 'With a G1, G2 or G licence, you may tow a trailer with a gross weight of up to:',
    ['4,600 kg', '1,360 kg', '2,500 kg', '11,000 kg'],
    'A Class G1, G2 or G licence allows towing a trailer up to 4,600 kg gross weight.',
    'guide', 'Towing'),

  Q('r-trailer-brakes', 'rules', 3, 'A trailer with a gross weight of how much or more must have its own brakes?',
    ['1,360 kg', '500 kg', '2,000 kg', '4,600 kg'],
    'If the trailer and load weigh 1,360 kg or more, it must have brakes strong enough to stop and hold it.',
    'guide', 'Towing'),

  Q('r-trailer-chains', 'rules', 3, 'If safety chains are used on a trailer, how must they be attached?',
    ['Crossed under the tongue', 'Running straight back', 'Wrapped around the bumper', 'Left loose on top of the hitch'],
    'Crossed chains stop the tongue from dropping to the road if the hitch comes apart.',
    'gr', 'Towing'),

  Q('r-trailer-back', 'rules', 3, 'When backing a trailer and you want its rear to go right, which way do you steer?',
    ['To the left', 'To the right', 'Straight', 'Steer right, then quickly left'],
    'To back the trailer to the right, steer left; to back it left, steer right. Back slowly with someone guiding you.',
    'gr', 'Towing'),

  Q('r-trailer-hitch', 'rules', 3, 'About how much of a trailer\'s total weight should rest on the hitch?',
    ['5 to 10 per cent', '1 per cent', '25 per cent', '50 per cent'],
    'About five to 10 per cent of the trailer\'s weight should be on the hitch, with more of the load ahead of the axle. Poor balance causes sway.',
    'gr', 'Towing'),

  Q('r-construction-zone', 'rules', 1, 'When approaching a construction area, drivers should:',
    ['Slow down, obey signs and traffic-control people, and yield if necessary', 'Speed up to get through quickly', 'Change lanes often to find the fastest one', 'Sound the horn to warn workers'],
    'In a construction zone, drive carefully, obey all signs and traffic-control people, do not change lanes, and be ready for sudden stops.',
    'faq', 'Dealing with particular situations', { sign: 'construction-zone' }),

  Q('r-blocked-lane-detour', 'rules', 3, 'Your lane is blocked by road work and no one is directing traffic. What should you do?',
    ['Yield to the driver coming from the opposite direction, then go around carefully', 'Go first because you are in the blocked lane', 'Sound your horn and go', 'Wait for a worker to arrive'],
    'If your lane is blocked and no one is directing traffic, yield to drivers from the opposite direction. When clear, move slowly around the obstacle.',
    'gr', 'Dealing with particular situations'),

  Q('r-stop-slow-sign', 'rules', 2, 'A traffic-control person holds up a sign that says SLOW. What should you do?',
    ['Slow down and proceed with caution, watching for further instructions', 'Stop until the sign changes', 'Pass the worker quickly', 'Ignore it if the lane looks clear'],
    'It is an offence to disobey STOP or SLOW signs shown by a traffic-control person. STOP means stop; SLOW means proceed slowly with care.',
    'gr', 'Dealing with particular situations', { sign: 'tcp-paddle' }),
];
