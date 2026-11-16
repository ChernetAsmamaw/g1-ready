import { Arrow, Bike, Bus, C, CarSide, GreenRing, NoRing, Octagon, Person, Plate, Snowmobile, T, TrafficLight, Wheelchair, octagonPoints } from './sign-art';
import { sign, type SignDef } from './sign-types';

const Ring = ({ children }: { children?: React.ReactNode }) => (
  <Plate>
    {children}
    <NoRing />
  </Plate>
);

/** Reserved-lane sign: black panel with a white diamond, symbol on the right, arrow down. */
const Reserved = ({ children }: { children?: React.ReactNode }) => (
  <Plate>
    <rect x="27" y="27" width="50" height="146" rx="4" fill={C.black} />
    <path d="M52 62 L68 100 L52 138 L36 100 Z" fill="none" stroke={C.white} strokeWidth="5" />
    {children}
    <Arrow d="M126 140 L126 150" x={126} y={150} a={90} w={10} hl={16} hw={28} />
  </Plate>
);

const Yield = ({ children }: { children?: React.ReactNode }) => (
  <g>
    <polygon points="100,184 6,20 194,20" fill={C.red} stroke={C.black} strokeWidth="1.5" strokeLinejoin="round" />
    <polygon points="100,150 36,38 164,38" fill={C.white} />
    {children}
  </g>
);

export const regulatorySigns: SignDef[] = [
  sign('stop', 'Stop', 'regulatory', 'Red octagon with the word STOP',
    () => <Octagon />,
    {
      short: 'Come to a complete stop',
      meaning: 'The eight-sided stop sign means you must come to a full stop. You may go only when the way is clear and it is your turn.',
      action: 'Stop at the stop line. If there is none, stop at the crosswalk; if there is none, at the edge of the sidewalk; if there is none, at the edge of the intersection. Yield to pedestrians and traffic before moving on.',
      doShort: 'Stop completely, then go when it is safe',
      where: 'Intersections, at the end of side streets, and on school bus stop arms.',
      mistake: 'Rolling stops. Slowing to a crawl is not a stop, and the wheels must stop turning.',
    }, ['yield', 'stop-ahead', 'stop-for-school-bus']),

  sign('yield', 'Yield', 'regulatory', 'Downward-pointing triangle with a red border and white centre',
    () => <Yield />,
    {
      short: 'Give the right-of-way to other traffic',
      meaning: 'You must let traffic in the intersection, or close to it, go first. Slow down, and stop if you need to.',
      action: 'Slow down and look. Stop if traffic or pedestrians are coming, and go only once the way is clear.',
      doShort: 'Slow down, and stop if needed to let others go first',
      where: 'Freeway on-ramps, roundabout entrances, and minor roads joining busier ones.',
      mistake: 'Thinking a yield sign never requires a stop. You must stop whenever traffic is close.',
    }, ['stop', 'yield-to-bus', 'merge']),

  sign('do-not-enter', 'Do not enter', 'regulatory', 'Red circle with a white horizontal bar on a white square',
    () => (
      <Plate>
        <circle cx="100" cy="100" r="64" fill={C.red} />
        <rect x="56" y="88" width="88" height="24" rx="3" fill={C.white} />
      </Plate>
    ),
    {
      short: 'Do not enter this road',
      meaning: 'Traffic is not allowed to go this way. It usually marks the wrong end of a one-way road or an exit ramp.',
      action: 'Do not drive past the sign. Turn the other way or find another route.',
      doShort: 'Do not drive into the road; find another route',
      where: 'The exit end of one-way streets and freeway off-ramps.',
      mistake: 'Confusing it with a "no stopping" or "prohibited" sign. This one bars entry entirely.',
    }, ['one-way', 'red-circle', 'no-straight-through']),

  sign('no-left-turn', 'No left turn', 'regulatory', 'Black left-turn arrow crossed by a red circle and slash',
    () => <Ring><Arrow d="M118 152 L118 108 Q118 88 98 88 L80 88" x={80} y={88} a={180} /></Ring>,
    {
      short: 'No left turn allowed',
      meaning: 'You may not turn left at this intersection.',
      action: 'Go straight or turn right instead.',
      doShort: 'Do not turn left; go straight or turn right',
      where: 'Busy intersections and driveways where left turns would block traffic.',
      mistake: 'Making a U-turn instead. If left turns are banned, U-turns usually are too.',
    }, ['no-right-turn', 'no-u-turn', 'no-straight-through']),

  sign('no-right-turn', 'No right turn', 'regulatory', 'Black right-turn arrow crossed by a red circle and slash',
    () => <Ring><Arrow d="M82 152 L82 108 Q82 88 102 88 L120 88" x={120} y={88} a={0} /></Ring>,
    {
      short: 'No right turn allowed',
      meaning: 'You may not turn right at this intersection.',
      action: 'Go straight or turn left instead.',
      doShort: 'Do not turn right; go straight or turn left',
      where: 'Intersections where a right turn would conflict with pedestrians or another road.',
      mistake: 'Mixing it up with "no right turn on red", which only bans the turn while the light is red.',
    }, ['no-left-turn', 'no-right-on-red', 'no-straight-through']),

  sign('no-u-turn', 'No U-turn', 'regulatory', 'Black U-shaped arrow crossed by a red circle and slash',
    () => <Ring><Arrow d="M74 152 L74 94 Q74 64 100 64 Q126 64 126 94 L126 104" x={126} y={104} a={90} hl={24} hw={38} /></Ring>,
    {
      short: 'No U-turns allowed',
      meaning: 'You may not turn around to go back the way you came.',
      action: 'Continue on and turn around legally somewhere else, for example by going around the block.',
      doShort: 'Do not turn around here',
      where: 'Busy roads, near hills and curves, and at some intersections.',
      mistake: 'Making a U-turn just past the sign. The ban covers the area the sign controls.',
    }, ['no-left-turn', 'no-right-turn', 'do-not-enter']),

  sign('no-straight-through', 'No straight through', 'regulatory', 'Black upward arrow crossed by a red circle and slash',
    () => <Ring><Arrow d="M100 162 L100 82" x={100} y={82} a={-90} /></Ring>,
    {
      short: 'Do not go straight through the intersection',
      meaning: 'You may not continue straight ahead at this intersection.',
      action: 'Turn left or right, where those turns are allowed.',
      doShort: 'Turn left or right; do not go straight',
      where: 'Intersections where the road ahead is closed to through traffic.',
      mistake: 'Reading the arrow as "straight ahead allowed". The red slash means the move is banned.',
    }, ['no-left-turn', 'no-right-turn', 'do-not-enter']),

  sign('no-right-on-red', 'No right turn on red', 'regulatory', 'Right-turn arrow crossed by a red circle and slash, above a red traffic light',
    () => (
      <Plate x={46} y={8} w={108} h={184}>
        <Arrow d="M88 92 L88 66 Q88 54 100 54 L108 54" x={108} y={54} a={0} w={9} hl={14} hw={22} />
        <NoRing cx={100} cy={62} r={36} w={8} />
        <TrafficLight x={100} y={142} s={0.58} lit="red" />
      </Plate>
    ),
    {
      short: 'No right turn while the light is red',
      meaning: 'Normally you may turn right on a red light after a full stop. This sign removes that permission at this intersection.',
      action: 'Wait for a green light before turning right.',
      doShort: 'Wait for the green light before turning right',
      where: 'Intersections with heavy pedestrian traffic or poor sight lines.',
      mistake: 'Turning right after stopping, out of habit. Here you must wait for green.',
    }, ['no-right-turn', 'light-red', 'no-left-turn']),

  sign('no-stopping', 'No stopping', 'regulatory', 'Black octagon crossed by a red circle and slash, with arrows pointing left and right',
    () => (
      <Plate>
        <polygon points={octagonPoints(100, 92, 30)} fill={C.black} />
        <NoRing cx={100} cy={92} r={52} w={11} />
        <Arrow d="M88 166 L64 166" x={64} y={166} a={180} w={6} hl={12} hw={18} />
        <Arrow d="M112 166 L136 166" x={136} y={166} a={0} w={6} hl={12} hw={18} />
      </Plate>
    ),
    {
      short: 'No stopping in the area between the signs',
      meaning: 'You may not stop your vehicle in this area, even for a moment, except to obey a traffic sign, signal or police officer.',
      action: 'Keep moving through the area. Do not stop to pick up or drop off passengers.',
      doShort: 'Keep moving; do not stop here at all',
      where: 'Busy streets, rush-hour routes and near intersections.',
      mistake: 'Thinking a quick pick-up is fine. "No stopping" is the strictest of the three rules.',
    }, ['no-standing', 'no-parking', 'stop']),

  sign('no-standing', 'No standing', 'regulatory', 'White sign reading NO STANDING with arrows',
    () => (
      <Plate x={30} y={20} w={140} h={160}>
        <T x={100} y={78} s={40} fill={C.red} w={800}>NO</T>
        <T x={100} y={118} s={27} w={800}>STANDING</T>
        <Arrow d="M88 152 L64 152" x={64} y={152} a={180} w={6} hl={12} hw={18} />
        <Arrow d="M112 152 L136 152" x={136} y={152} a={0} w={6} hl={12} hw={18} />
      </Plate>
    ),
    {
      short: 'No stopping except to pick up or drop off passengers',
      meaning: 'You may stop only long enough to let passengers get in or out. You may not stop to load or unload goods.',
      action: 'Stop only briefly for passengers, then move on.',
      doShort: 'Stop only to pick up or drop off passengers',
      where: 'Hotel fronts, schools, transit stops and busy downtown curbs.',
      mistake: 'Waiting at the curb for someone to come out. Standing still and waiting is not allowed.',
    }, ['no-stopping', 'no-parking', 'school-bus-loading-zone']),

  sign('no-parking', 'No parking', 'regulatory', 'Black letter P crossed by a red circle and slash',
    () => <Ring><T x={100} y={134} s={96} w={800}>P</T></Ring>,
    {
      short: 'No parking in this area',
      meaning: 'You may not park here, except while loading or unloading goods or passengers.',
      action: 'You may stop briefly to load or unload, but do not leave the vehicle parked.',
      doShort: 'Stop only briefly to load or unload',
      where: 'Streets near intersections, fire hydrants, driveways and busy shopping areas.',
      mistake: 'Leaving the car "for just a minute" to run an errand. That is parking.',
    }, ['no-stopping', 'no-standing', 'parking-permitted']),

  sign('parking-permitted', 'Parking permitted', 'regulatory', 'Black letter P inside a green circle',
    () => (
      <Plate>
        <GreenRing />
        <T x={100} y={134} s={96} w={800}>P</T>
      </Plate>
    ),
    {
      short: 'Parking is allowed here',
      meaning: 'A green circle means the activity is allowed. You may park here, within the times or limits shown on any tab below the sign.',
      action: 'Park legally, and check any time limits shown.',
      doShort: 'Park here, within the posted limits',
      where: 'Streets and lots where parking is allowed during set hours.',
      mistake: 'Ignoring the time limit tab under the sign.',
    }, ['no-parking', 'green-circle', 'accessible-parking']),

  sign('no-bicycles', 'No bicycles', 'regulatory', 'Black bicycle crossed by a red circle and slash',
    () => <Ring><Bike s={1.05} /></Ring>,
    {
      short: 'Bicycles are not allowed on this road',
      meaning: 'Cyclists may not use this road. It is common at freeway entrances.',
      action: 'If you are cycling, use another route.',
      doShort: 'Do not ride a bicycle on this road',
      where: 'Freeway on-ramps and some bridges or tunnels.',
      mistake: 'Confusing it with the reserved bicycle lane sign, which has a white diamond and no red ring.',
    }, ['no-pedestrians', 'bike-lane', 'bicycle-crossing']),

  sign('no-pedestrians', 'No pedestrians', 'regulatory', 'Black walking person crossed by a red circle and slash',
    () => <Ring><Person y={104} s={1.1} /></Ring>,
    {
      short: 'Pedestrians are not allowed on this road',
      meaning: 'People may not walk on or along this road.',
      action: 'Walkers must use another route. Drivers should not expect people on foot, but must still watch for them.',
      doShort: 'Do not walk here; drivers stay alert anyway',
      where: 'Freeway on-ramps and highway bridges.',
      mistake: 'Reading it as "pedestrian crossing". The red slash means pedestrians are banned.',
    }, ['no-bicycles', 'pedestrian-ahead', 'pedestrian-crossover']),

  sign('do-not-pass', 'Do not pass', 'regulatory', 'Red car beside a black car, crossed by a red circle and slash',
    () => (
      <Ring>
        <CarSide x={72} y={104} s={0.6} c={C.red} />
        <CarSide x={130} y={104} s={0.6} />
      </Ring>
    ),
    {
      short: 'Passing is not allowed',
      meaning: 'You may not pass other vehicles on this stretch of road.',
      action: 'Stay in your lane behind the vehicle ahead until the restriction ends.',
      doShort: 'Stay behind the vehicle ahead; do not pass',
      where: 'Hills, curves, bridges and other places where you cannot see far enough ahead.',
      mistake: 'Starting a pass just before the sign and finishing it in the no-passing zone.',
    }, ['no-passing-crossing', 'mark-solid', 'two-way-traffic']),

  sign('keep-right', 'Keep right of the median', 'regulatory', 'Black arrow curving down and to the right of a black island',
    () => (
      <Plate x={44} y={12} w={112} h={176}>
        <ellipse cx="80" cy="128" rx="13" ry="36" fill={C.black} />
        <Arrow d="M84 46 Q120 62 120 112" x={120} y={112} a={90} w={13} hl={24} hw={36} />
      </Plate>
    ),
    {
      short: 'Keep to the right of the median or island',
      meaning: 'There is a traffic island, median or obstacle ahead. Traffic must pass on its right side.',
      action: 'Stay to the right of the island.',
      doShort: 'Pass on the right side of the island',
      where: 'The start of medians, traffic islands and bridge piers.',
      mistake: 'Cutting left around the island to make a turn sooner.',
    }, ['divided-begins', 'keep-right-except-to-pass', 'hazard-marker']),

  sign('speed-limit', 'Maximum speed', 'regulatory', 'White sign reading MAXIMUM 50 km/h',
    () => (
      <Plate x={40} y={12} w={120} h={176}>
        <T x={100} y={50} s={20} w={800}>MAXIMUM</T>
        <T x={100} y={138} s={84} w={800}>50</T>
        <T x={100} y={170} s={22} w={700}>km/h</T>
      </Plate>
    ),
    {
      short: 'The maximum legal speed under good conditions',
      meaning: 'This is the highest speed you may drive. It does not mean that speed is safe in rain, snow, fog or heavy traffic.',
      action: 'Drive at or below the limit, and slower when conditions are poor.',
      doShort: 'Drive no faster than the posted limit',
      where: 'Every road. With no sign, the limit is 50 km/h in cities, towns and villages and 80 km/h elsewhere.',
      mistake: 'Treating the limit as a target in bad weather.',
    }, ['speed-change-ahead', 'advisory-speed', 'school-zone-speed']),

  sign('speed-change-ahead', 'Speed limit change ahead', 'regulatory', 'White sign reading MAXIMUM 60 AHEAD',
    () => (
      <Plate x={40} y={12} w={120} h={176}>
        <T x={100} y={48} s={20} w={800}>MAXIMUM</T>
        <T x={100} y={124} s={74} w={800}>60</T>
        <rect x="52" y="140" width="96" height="34" rx="3" fill={C.black} />
        <T x={100} y={166} s={24} fill={C.white} w={800}>AHEAD</T>
      </Plate>
    ),
    {
      short: 'The speed limit changes ahead',
      meaning: 'A new speed limit begins a short distance ahead.',
      action: 'Get ready to adjust your speed so you are at the new limit when you reach it.',
      doShort: 'Prepare to change speed to the new limit',
      where: 'Approaching towns, school areas and construction zones.',
      mistake: 'Waiting until you pass the next sign to start slowing down.',
    }, ['speed-limit', 'advisory-speed', 'community-safety-zone']),

  sign('slow-traffic-keep-right', 'Slow traffic keep right', 'regulatory', 'White sign reading SLOW TRAFFIC KEEP RIGHT',
    () => (
      <Plate x={26} y={30} w={148} h={140}>
        <T x={100} y={74} s={27} w={800}>SLOW</T>
        <T x={100} y={108} s={27} w={800}>TRAFFIC</T>
        <T x={100} y={142} s={27} w={800}>KEEP RIGHT</T>
      </Plate>
    ),
    {
      short: 'Drive in the right lane if you are slower than other traffic',
      meaning: 'On multi-lane roads, slower vehicles should use the right-hand lane.',
      action: 'If you are driving slower than the traffic around you, move to the right lane.',
      doShort: 'Use the right lane if you are driving slower',
      where: 'Multi-lane highways and freeways.',
      mistake: 'Cruising in the left lane while traffic stacks up behind.',
    }, ['keep-right-except-to-pass', 'keep-right', 'slow-moving-vehicle']),

  sign('keep-right-except-to-pass', 'Keep right except to pass', 'regulatory', 'White sign reading KEEP RIGHT EXCEPT TO PASS',
    () => (
      <Plate x={26} y={30} w={148} h={140}>
        <T x={100} y={74} s={27} w={800}>KEEP RIGHT</T>
        <T x={100} y={108} s={27} w={800}>EXCEPT</T>
        <T x={100} y={142} s={27} w={800}>TO PASS</T>
      </Plate>
    ),
    {
      short: 'Use the left lane only to pass',
      meaning: 'On multi-lane highways, stay in the right lane and use the left lane only to pass.',
      action: 'Pass in the left lane, then return to the right lane when it is safe.',
      doShort: 'Pass on the left, then move back right',
      where: 'Multi-lane highways.',
      mistake: 'Staying in the passing lane after the pass is done.',
    }, ['slow-traffic-keep-right', 'keep-right', 'do-not-pass']),

  sign('community-safety-zone', 'Community safety zone', 'regulatory', 'White sign reading COMMUNITY SAFETY ZONE',
    () => (
      <Plate x={26} y={30} w={148} h={140}>
        <T x={100} y={74} s={24} w={800}>COMMUNITY</T>
        <T x={100} y={108} s={30} w={800}>SAFETY</T>
        <T x={100} y={142} s={30} w={800}>ZONE</T>
      </Plate>
    ),
    {
      short: 'Fines are increased in this area',
      meaning: 'Public safety is a special concern here, so fines for most traffic offences, including speeding, are increased.',
      action: 'Slow down and take extra care, especially with children and pedestrians.',
      doShort: 'Drive with extra care; fines are higher here',
      where: 'Near schools, parks, seniors’ homes and some residential streets.',
      mistake: 'Treating it as advice. Increased fines apply whenever the zone is posted.',
    }, ['school-zone', 'fines-doubled', 'speed-limit']),

  sign('one-way', 'One way', 'regulatory', 'Black sign with a white arrow reading ONE WAY',
    () => (
      <g>
        <rect x="8" y="58" width="184" height="84" rx="7" fill={C.black} stroke={C.white} strokeWidth="3" />
        <polygon points="22,86 138,86 138,70 180,100 138,130 138,114 22,114" fill={C.white} />
        <T x={82} y={107} s={20} w={800}>ONE WAY</T>
      </g>
    ),
    {
      short: 'Traffic may travel only in the direction of the arrow',
      meaning: 'All traffic on this road moves in one direction.',
      action: 'Drive only in the direction the arrow points.',
      doShort: 'Travel only in the direction of the arrow',
      where: 'Downtown streets.',
      mistake: 'Turning into the street against the arrow. Check for a "do not enter" sign on the far side.',
    }, ['do-not-enter', 'keep-right', 'lane-designation']),

  sign('two-way-left-turn', 'Two-way left-turn lane', 'regulatory', 'Black sign with two white arrows curving left in opposite directions',
    () => (
      <Plate fill={C.black} border={C.white}>
        <Arrow d="M124 172 L124 136 Q124 120 108 120 L88 120" x={88} y={120} a={180} w={12} hl={22} hw={34} c={C.white} />
        <Arrow d="M76 28 L76 64 Q76 80 92 80 L112 80" x={112} y={80} a={0} w={12} hl={22} hw={34} c={C.white} />
      </Plate>
    ),
    {
      short: 'The centre lane is for left turns in both directions',
      meaning: 'The centre lane is shared by drivers going both ways who want to turn left.',
      action: 'Enter the centre lane only to make a left turn, and watch for drivers coming the other way in the same lane.',
      doShort: 'Use the centre lane only to turn left',
      where: 'Commercial roads with many driveways and plazas.',
      mistake: 'Using the centre lane to pass, or driving in it for a long stretch.',
    }, ['lane-designation', 'no-left-turn', 'one-way']),

  sign('lane-designation', 'Lane use', 'regulatory', 'White sign with a left-turn arrow over one lane and a straight arrow over the other',
    () => (
      <Plate>
        <Arrow d="M80 162 L80 108 Q80 88 60 88 L54 88" x={54} y={88} a={180} w={12} hl={20} hw={32} />
        <line x1="100" y1="40" x2="100" y2="166" stroke={C.black} strokeWidth="3" strokeDasharray="12 9" />
        <Arrow d="M136 162 L136 78" x={136} y={78} a={-90} w={12} hl={20} hw={32} />
      </Plate>
    ),
    {
      short: 'Each lane must travel in the direction shown',
      meaning: 'Lane-use signs show which way traffic in each lane must go. Here the left lane must turn left and the right lane must go straight.',
      action: 'Get into the right lane for your direction well before the intersection.',
      doShort: 'Pick the lane for your direction before the intersection',
      where: 'Above or beside lanes approaching busy intersections.',
      mistake: 'Going straight from a turn-only lane.',
    }, ['two-way-left-turn', 'one-way', 'no-left-turn']),

  sign('pedestrian-crossover', 'Pedestrian crossover', 'regulatory', 'White sign with a walking person between two X marks, reading STOP FOR PEDESTRIANS',
    () => (
      <Plate x={26} y={14} w={148} h={172}>
        <Person x={100} y={86} s={0.95} />
        <T x={52} y={96} s={40} w={800}>X</T>
        <T x={148} y={96} s={40} w={800}>X</T>
        <T x={100} y={146} s={21} w={800}>STOP FOR</T>
        <T x={100} y={170} s={19} w={800}>PEDESTRIANS</T>
      </Plate>
    ),
    {
      short: 'Stop for pedestrians at the crossover',
      meaning: 'A pedestrian crossover is a place where people may cross and drivers must yield. It is marked with these signs, a painted X or "shark teeth", and sometimes flashing lights.',
      action: 'Stop at the yield line and wait until pedestrians have completely crossed the road before you go.',
      doShort: 'Stop and wait until pedestrians have fully crossed',
      where: 'Mid-block crossings and some intersections without traffic lights.',
      mistake: 'Driving on once the person has passed your half of the road. They must reach the far side first.',
    }, ['pedestrian-ahead', 'school-crossing', 'no-passing-crossing']),

  sign('hov-lane', 'High-occupancy vehicle (HOV) lane', 'regulatory', 'Reserved lane sign with a white diamond, HOV and 2+',
    () => (
      <Reserved>
        <T x={126} y={70} s={30} w={800}>HOV</T>
        <T x={126} y={118} s={42} w={800}>2+</T>
      </Reserved>
    ),
    {
      short: 'Lane reserved for vehicles carrying at least two people',
      meaning: 'This lane is reserved for certain vehicles, such as cars with at least two people, buses and motorcycles, during the days and times shown.',
      action: 'Use the lane only if your vehicle qualifies. Otherwise stay out during the posted times.',
      doShort: 'Use the lane only with the required number of people',
      where: 'Freeways and busy city arterial roads.',
      mistake: 'Using it as a passing lane while driving alone.',
    }, ['bike-lane', 'lane-designation', 'yield-to-bus']),

  sign('bike-lane', 'Reserved bicycle lane', 'regulatory', 'Reserved lane sign with a white diamond and a bicycle',
    () => <Reserved><Bike x={126} y={86} s={0.78} /></Reserved>,
    {
      short: 'This lane is for bicycles only',
      meaning: 'The lane is reserved for cyclists.',
      action: 'Do not drive or park in the lane. Check it carefully before turning right across it.',
      doShort: 'Keep out of the lane; check it before turning right',
      where: 'City streets with painted bike lanes.',
      mistake: 'Turning right without checking the bike lane and your blind spot.',
    }, ['no-bicycles', 'bicycle-route', 'hov-lane']),

  sign('bicycle-route', 'Bicycle route', 'regulatory', 'Green sign with a white bicycle',
    () => <Plate fill={C.green} border={C.white}><Bike s={1.1} c={C.white} /></Plate>,
    {
      short: 'This is a designated bicycle route',
      meaning: 'Cyclists are likely to use this road. It may or may not have a bike lane.',
      action: 'Watch for cyclists and leave at least one metre when passing them.',
      doShort: 'Watch for cyclists and pass with at least 1 m',
      where: 'Signed cycling routes through cities and countryside.',
      mistake: 'Passing cyclists too closely when there is no painted lane.',
    }, ['bike-lane', 'share-the-road', 'bicycle-crossing']),

  sign('snowmobiles-permitted', 'Snowmobiles permitted', 'regulatory', 'Black snowmobile inside a green circle',
    () => <Plate><GreenRing /><Snowmobile s={0.95} /></Plate>,
    {
      short: 'Snowmobiles may use this road',
      meaning: 'A green circle means the activity is allowed. Snowmobiles may travel on this road.',
      action: 'Expect snowmobiles on the road and shoulder in winter.',
      doShort: 'Expect snowmobiles to share the road',
      where: 'Rural and northern roads.',
      mistake: 'Confusing it with the yellow snowmobile crossing warning sign.',
    }, ['snowmobile-crossing', 'green-circle', 'parking-permitted']),

  sign('green-circle', 'Green circle (permissive)', 'regulatory', 'Plain green circle on a white sign',
    () => <Plate><GreenRing r={66} /></Plate>,
    {
      short: 'The activity shown is allowed',
      meaning: 'A green circle on a regulatory sign means you may do the activity shown inside it.',
      action: 'You may do the activity, within any limits on the sign.',
      doShort: 'Go ahead with the activity shown',
      where: 'Parking, snowmobile and other permissive signs.',
      mistake: 'Thinking all regulatory signs forbid something. Green ones permit.',
    }, ['red-circle', 'parking-permitted', 'snowmobiles-permitted']),

  sign('red-circle', 'Red circle and slash (prohibited)', 'regulatory', 'Plain red circle with a slash on a white sign',
    () => <Plate><NoRing r={66} /></Plate>,
    {
      short: 'The activity shown is not allowed',
      meaning: 'A red circle with a line through it means the activity shown inside is prohibited.',
      action: 'Do not do the activity shown.',
      doShort: 'Do not do the activity shown',
      where: 'Turn bans, parking bans, and roads closed to certain users.',
      mistake: 'Reading the symbol inside and missing the slash.',
    }, ['green-circle', 'do-not-enter', 'no-left-turn']),

  sign('yield-to-bus', 'Yield to buses', 'regulatory', 'Yield triangle containing a bus, shown on the back of a bus',
    () => (
      <Yield>
        <Bus x={100} y={66} s={0.62} />
        <T x={100} y={110} s={16} w={800}>YIELD</T>
      </Yield>
    ),
    {
      short: 'Let the bus pull back into traffic',
      meaning: 'This sign on the back of a bus reminds you that buses signalling to leave a stop in a 60 km/h or slower zone have the right-of-way.',
      action: 'When the bus signals to pull out from a stop, slow down and let it merge.',
      doShort: 'Let the bus pull out from the stop',
      where: 'On the back of city transit buses.',
      mistake: 'Speeding up to get past the bus before it pulls out.',
    }, ['yield', 'stop-for-school-bus', 'hov-lane'], 'sharing'),

  sign('no-passing-crossing', 'No passing at crossover', 'regulatory', 'Sign with NO PASSING in white on red, and HERE TO CROSSING in black on white',
    () => (
      <Plate x={36} y={8} w={128} h={184}>
        <rect x="41" y="13" width="118" height="86" rx="5" fill={C.red} />
        <T x={100} y={50} s={32} fill={C.white} w={800}>NO</T>
        <T x={100} y={86} s={25} fill={C.white} w={800}>PASSING</T>
        <T x={100} y={136} s={23} w={800}>HERE TO</T>
        <T x={100} y={168} s={22} w={800}>CROSSING</T>
      </Plate>
    ),
    {
      short: 'Do not pass any vehicle within 30 m of the crossing',
      meaning: 'Passing is not allowed from this sign to the pedestrian crossing ahead. A vehicle ahead may be stopping for a pedestrian you cannot see.',
      action: 'Stay behind the vehicle ahead. Do not change lanes to pass within 30 m of the crossing.',
      doShort: 'Do not pass any vehicle before the crossing',
      where: 'About 30 m before pedestrian crossovers and crossings.',
      mistake: 'Passing a car that has stopped. It is usually stopped for a pedestrian.',
    }, ['pedestrian-crossover', 'do-not-pass', 'school-crossing']),

  sign('school-bus-loading-zone', 'School bus loading zone', 'regulatory', 'White sign reading SCHOOL BUS LOADING ZONE',
    () => (
      <Plate x={26} y={30} w={148} h={140}>
        <T x={100} y={74} s={24} w={800}>SCHOOL BUS</T>
        <T x={100} y={108} s={27} w={800}>LOADING</T>
        <T x={100} y={142} s={27} w={800}>ZONE</T>
      </Plate>
    ),
    {
      short: 'A school bus stops here to load and unload children',
      meaning: 'This stretch is reserved for school buses picking up or dropping off children.',
      action: 'Do not stop, stand or park in the zone, and watch for children.',
      doShort: 'Keep the zone clear and watch for children',
      where: 'In front of schools.',
      mistake: 'Dropping off your own child in the bus zone.',
    }, ['stop-for-school-bus', 'school-zone', 'no-standing'], 'sharing'),

  sign('accessible-parking', 'Accessible parking', 'regulatory', 'Blue square with a white wheelchair symbol, above the words BY PERMIT ONLY',
    () => (
      <Plate x={36} y={12} w={128} h={176}>
        <rect x="52" y="28" width="96" height="96" rx="6" fill={C.blue} />
        <Wheelchair x={102} y={82} s={0.85} />
        <T x={100} y={150} s={20} w={800}>BY PERMIT</T>
        <T x={100} y={174} s={20} w={800}>ONLY</T>
      </Plate>
    ),
    {
      short: 'Parking only for vehicles with an accessible parking permit',
      meaning: 'This space is reserved for a vehicle displaying a valid Accessible Parking Permit, carrying the permit holder.',
      action: 'Do not park here unless the permit is displayed and the permit holder is with you.',
      doShort: 'Park here only with a valid accessible permit',
      where: 'Parking lots and streets near entrances.',
      mistake: 'Parking "for a minute", or using someone else’s permit when they are not in the vehicle.',
    }, ['accessible-facility', 'parking-permitted', 'no-parking'], 'rules'),
];
