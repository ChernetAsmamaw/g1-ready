import { Arrow, Bike, C, Children, Crossbuck, Diamond, Flagger, HandSignal, Octagon, Pentagon, Person, Plane, Plate, Road, SignalHead, Surveyor, T, TopCar, Wheelchair, Worker } from './sign-art';
import { sign, type SignDef } from './sign-types';

const L = ({ d, w = 13, c = C.black, dash }: { d: string; w?: number; c?: string; dash?: string }) => (
  <path d={d} stroke={c} strokeWidth={w} fill="none" strokeLinejoin="round" strokeDasharray={dash} />
);

const Flash = ({ cx, cy, r }: { cx: number; cy: number; r: number }) => (
  <g>
    <circle cx={cx} cy={cy} r={r + 6} fill={C.black} />
    <circle cx={cx} cy={cy} r={r} fill="#FFC107" className="sig-flash" />
  </g>
);

const CentreSolid = () => <rect x="98" y="0" width="4" height="200" fill={C.lineYellow} />;
const CentreBroken = () => (
  <g>{[0, 1, 2, 3].map((i) => <rect key={i} x="98" y={8 + i * 52} width="4" height="28" fill={C.lineYellow} />)}</g>
);
const Ped = ({ children }: { children: React.ReactNode }) => (
  <g>
    <rect x="0" y="0" width="200" height="200" rx="14" fill="#E6ECF3" />
    <rect x="30" y="30" width="140" height="140" rx="14" fill={C.black} />
    {children}
  </g>
);

export const schoolSigns: SignDef[] = [
  sign('school-zone', 'School zone', 'school', 'Five-sided fluorescent yellow-green sign with two children walking',
    () => <Pentagon><Children y={124} s={1.05} /></Pentagon>,
    {
      short: 'You are entering a school zone',
      meaning: 'The five-sided shape is used only for school signs. Children may be walking to or from school.',
      action: 'Slow down, drive with extra caution and watch for children.',
      doShort: 'Slow down and watch for children',
      where: 'Near schools.',
      mistake: 'Calling it a playground sign. The five-sided shape always means a school.',
    }, ['school-crossing', 'school-zone-speed', 'pedestrian-ahead']),

  sign('school-crossing', 'School crossing', 'school', 'Five-sided fluorescent yellow-green sign with children above crosswalk lines',
    () => (
      <Pentagon>
        <Children y={112} s={0.95} />
        <rect x="34" y="156" width="132" height="6" fill={C.black} />
        <rect x="34" y="172" width="132" height="6" fill={C.black} />
      </Pentagon>
    ),
    {
      short: 'A school crossing is ahead',
      meaning: 'Children cross the road here on the way to and from school, often helped by a crossing guard.',
      action: 'Slow down, watch for children, and stop for anyone crossing or for a crossing guard’s stop sign.',
      doShort: 'Slow down and stop for children or a crossing guard',
      where: 'Near schools.',
      mistake: 'Driving on before the crossing guard and every child are off the road.',
    }, ['school-zone', 'pedestrian-crossover', 'pedestrian-ahead']),

  sign('school-zone-speed', 'School zone speed limit', 'school', 'School sign above a MAXIMUM 40 km/h WHEN FLASHING tab with yellow flashing lights',
    () => (
      <g>
        <Pentagon scale={0.5} ty={0}><Children y={124} s={1.05} /></Pentagon>
        <Plate x={50} y={98} w={100} h={96}>
          <T x={100} y={120} s={13} w={800}>MAXIMUM</T>
          <T x={100} y={152} s={32} w={800}>40</T>
          <T x={100} y={168} s={13} w={800}>km/h</T>
          <T x={100} y={185} s={11} w={800} max={84}>WHEN FLASHING</T>
        </Plate>
        <Flash cx={28} cy={146} r={13} />
        <Flash cx={172} cy={146} r={13} />
      </g>
    ),
    {
      short: 'Obey the lower school speed limit when the lights flash',
      meaning: 'During school hours, when the yellow lights are flashing, the speed limit shown applies.',
      action: 'Slow to the posted limit whenever the lights are flashing.',
      doShort: 'Drive no faster than the limit shown while lights flash',
      where: 'In front of schools.',
      mistake: 'Ignoring it because no children are in sight.',
    }, ['school-zone', 'speed-limit', 'community-safety-zone']),

  sign('stop-for-school-bus', 'School bus stop arm', 'school', 'Red stop sign arm extended from the side of a yellow school bus',
    () => (
      <g>
        <rect x="0" y="34" width="200" height="132" rx="10" fill="#F5B800" />
        <rect x="12" y="46" width="40" height="34" rx="4" fill="#26303B" />
        <rect x="12" y="120" width="176" height="6" fill={C.black} />
        <Octagon cx={124} cy={100} r={58} size={28} />
      </g>
    ),
    {
      short: 'A stopped school bus: traffic in both directions must stop',
      meaning: 'When a school bus has its upper red lights flashing and its stop arm out, children are getting on or off.',
      action: 'Stop. From behind, stop at least 20 m away. From the front, stop at a safe distance. Wait until the bus moves or the lights stop flashing. On a road with a median, only traffic behind the bus must stop.',
      doShort: 'Stop and wait until the lights stop flashing',
      where: 'On every school bus.',
      mistake: 'Passing the bus from the opposite direction on an undivided road. That is illegal.',
    }, ['stop', 'school-bus-loading-zone', 'hidden-school-bus-stop'], 'sharing'),
];

export const constructionSigns: SignDef[] = [
  sign('construction-ahead', 'Construction ahead', 'construction', 'Orange diamond reading CONSTRUCTION AHEAD',
    () => (
      <Diamond fill={C.orange}>
        <T x={100} y={98} s={18} w={800} max={120}>CONSTRUCTION</T>
        <T x={100} y={124} s={24} w={800}>AHEAD</T>
      </Diamond>
    ),
    {
      short: 'A construction zone is ahead',
      meaning: 'Orange signs mark temporary conditions in construction and maintenance zones.',
      action: 'Slow down, stay alert, and be ready for lane changes and workers.',
      doShort: 'Slow down and get ready for the work zone',
      where: 'Before road work.',
      mistake: 'Ignoring orange signs because no one seems to be working.',
    }, ['road-work', 'construction-zone', 'fines-doubled']),

  sign('road-work', 'Road work', 'construction', 'Orange diamond with a worker shovelling',
    () => <Diamond fill={C.orange}><Worker y={102} s={1} /></Diamond>,
    {
      short: 'Road work ahead: workers on or near the road',
      meaning: 'People are working on or near the road ahead.',
      action: 'Slow down, obey all signs and traffic-control people, and be ready to stop.',
      doShort: 'Slow down and watch for workers',
      where: 'Construction and maintenance zones.',
      mistake: 'Treating it as a flagger sign. It warns of work, not a person directing traffic.',
    }, ['flagger-ahead', 'survey-crew', 'construction-ahead']),

  sign('flagger-ahead', 'Traffic-control person ahead', 'construction', 'Orange diamond with a person holding a flag',
    () => <Diamond fill={C.orange}><Flagger y={102} s={1} /></Diamond>,
    {
      short: 'A traffic-control person is directing traffic ahead',
      meaning: 'A person ahead is directing traffic with a STOP/SLOW sign.',
      action: 'Slow down and follow the traffic-control person’s directions.',
      doShort: 'Follow the traffic-control person’s directions',
      where: 'Construction zones where one lane is closed.',
      mistake: 'Driving past a STOP paddle because the road looks clear.',
    }, ['road-work', 'tcp-paddle', 'survey-crew']),

  sign('survey-crew', 'Survey crew', 'construction', 'Orange diamond with a surveyor and tripod',
    () => <Diamond fill={C.orange}><Surveyor y={102} s={1} /></Diamond>,
    {
      short: 'A survey crew is working on the road ahead',
      meaning: 'Surveyors are measuring on or near the road ahead.',
      action: 'Slow down and watch for workers and equipment.',
      doShort: 'Slow down and watch for the survey crew',
      where: 'Before planned road work.',
      mistake: 'Not noticing workers who are standing still.',
    }, ['road-work', 'flagger-ahead', 'construction-ahead']),

  sign('construction-zone', 'Construction zone', 'construction', 'Orange sign reading CONSTRUCTION ZONE',
    () => (
      <Plate x={14} y={44} w={172} h={112} fill={C.orange}>
        <T x={100} y={94} s={26} w={800} max={150}>CONSTRUCTION</T>
        <T x={100} y={130} s={30} w={800}>ZONE</T>
      </Plate>
    ),
    {
      short: 'You are entering a construction zone',
      meaning: 'You are entering an area where roads are being built or repaired. Conditions may change suddenly.',
      action: 'Slow down, obey signs and traffic-control people, avoid lane changes and be ready to stop.',
      doShort: 'Slow down, obey signs and avoid lane changes',
      where: 'The start of a work zone.',
      mistake: 'Speeding up once you think you are past the workers.',
    }, ['construction-ahead', 'fines-doubled', 'road-work'], 'rules'),

  sign('detour', 'Detour', 'construction', 'Orange sign reading DETOUR with an arrow to the right',
    () => (
      <Plate x={14} y={50} w={172} h={100} fill={C.orange}>
        <T x={80} y={112} s={34} w={800} max={104}>DETOUR</T>
        <Arrow d="M150 100 L156 100" x={154} y={100} a={0} w={10} hl={18} hw={30} />
      </Plate>
    ),
    {
      short: 'Follow the detour route around the closed road',
      meaning: 'The road ahead is closed. Follow the signs to get around it.',
      action: 'Follow the detour signs until you are back on your route.',
      doShort: 'Follow the detour signs',
      where: 'Around road closures.',
      mistake: 'Trying to drive through the closure.',
    }, ['lane-closed', 'construction-ahead', 'arrow-board']),

  sign('lane-closed', 'Lane closed ahead', 'construction', 'Orange diamond showing the right lane ending',
    () => (
      <Diamond fill={C.orange}>
        <L d="M72 160 L72 42" w={12} />
        <L d="M100 156 L100 128" w={6} dash="14 10" />
        <L d="M130 160 L130 118 Q130 98 106 84 L106 42" w={12} />
      </Diamond>
    ),
    {
      short: 'A lane is closed ahead for construction',
      meaning: 'A lane is closed ahead because of work on the road.',
      action: 'Merge into the open lane early and smoothly, and let others merge.',
      doShort: 'Merge into the open lane early',
      where: 'Construction zones.',
      mistake: 'Racing to the end of the closed lane and forcing your way in.',
    }, ['right-lane-ends', 'arrow-board', 'detour']),

  sign('fines-doubled', 'Speeding fines doubled', 'construction', 'Sign reading CONSTRUCTION ZONE, SPEEDING FINES DOUBLED WHEN WORKERS PRESENT',
    () => (
      <Plate x={18} y={20} w={164} h={160} border={C.orange}>
        <rect x="28" y="30" width="144" height="40" rx="4" fill={C.orange} />
        <T x={100} y={57} s={17} w={800} max={134}>CONSTRUCTION ZONE</T>
        <T x={100} y={96} s={20} w={800}>SPEEDING FINES</T>
        <T x={100} y={122} s={24} w={800}>DOUBLED</T>
        <T x={100} y={148} s={15} w={800}>WHEN WORKERS</T>
        <T x={100} y={166} s={15} w={800}>PRESENT</T>
      </Plate>
    ),
    {
      short: 'Speeding fines are doubled when workers are present',
      meaning: 'Fines for speeding in a construction zone are doubled while workers are present.',
      action: 'Slow down to the posted speed for the whole work zone.',
      doShort: 'Obey the work-zone speed limit',
      where: 'Construction zones on provincial highways.',
      mistake: 'Assuming the fine is normal because the zone looks quiet.',
    }, ['construction-zone', 'community-safety-zone', 'speed-limit'], 'licence'),

  sign('tcp-paddle', 'Traffic-control STOP / SLOW sign', 'construction', 'Hand-held sign showing STOP on a red octagon and SLOW on an orange diamond',
    () => (
      <g>
        <rect x="64" y="128" width="8" height="66" fill="#555" />
        <Octagon cx={68} cy={84} r={52} size={26} />
        <rect x="134" y="140" width="8" height="54" fill="#555" />
        <g transform="rotate(45 138 104)">
          <rect x="110" y="76" width="56" height="56" rx="5" fill={C.orange} stroke={C.black} strokeWidth="2.5" />
        </g>
        <T x={138} y={112} s={20} w={800}>SLOW</T>
      </g>
    ),
    {
      short: 'STOP means stop; SLOW means proceed slowly with care',
      meaning: 'Traffic-control people use a sign with STOP on one side and SLOW on the other to control traffic through a work zone.',
      action: 'Stop when STOP is shown. When SLOW is shown, drive slowly through the zone and watch for further directions.',
      doShort: 'Obey the side shown: stop for STOP, go slowly for SLOW',
      where: 'Construction zones and some emergency scenes.',
      mistake: 'Treating SLOW as permission to drive normally.',
    }, ['flagger-ahead', 'stop', 'road-work'], 'rules'),

  sign('arrow-board', 'Lighted arrow board', 'construction', 'Black board with a yellow lighted arrow pointing right',
    () => (
      <g>
        <rect x="10" y="50" width="180" height="100" rx="8" fill={C.black} />
        {[30, 50, 70, 90, 110, 130].map((x) => <circle key={x} cx={x} cy={100} r="6" fill="#FFC107" />)}
        {[[146, 70], [158, 82], [170, 100], [158, 118], [146, 130], [134, 100]].map(([x, y]) => <circle key={`${x}-${y}`} cx={x} cy={y} r="6" fill="#FFC107" />)}
      </g>
    ),
    {
      short: 'Lane closed: move into the lane the arrow points to',
      meaning: 'A lighted arrow board on a work vehicle or trailer shows the lane ahead is closed and which way to move.',
      action: 'Slow down and move over in the direction of the arrow when it is safe.',
      doShort: 'Move into the lane the arrow points to',
      where: 'Highway lane closures and moving maintenance work.',
      mistake: 'Waiting until the last moment to move over.',
    }, ['lane-closed', 'detour', 'right-lane-ends']),
];

export const informationSigns: SignDef[] = [
  sign('destination', 'Destination and distance', 'information', 'Green sign listing two towns and their distances',
    () => (
      <g>
        <rect x="6" y="50" width="188" height="100" rx="8" fill={C.green} stroke={C.white} strokeWidth="4" />
        <T x={20} y={92} s={26} fill={C.white} anchor="start">Barrie</T>
        <T x={180} y={92} s={26} fill={C.white} anchor="end">42</T>
        <T x={20} y={132} s={26} fill={C.white} anchor="start">Sudbury</T>
        <T x={180} y={132} s={26} fill={C.white} anchor="end">278</T>
      </g>
    ),
    {
      short: 'Shows the distance in kilometres to places ahead',
      meaning: 'Green guide signs show destinations, directions and distances in kilometres.',
      action: 'Use it to plan lane changes and exits early.',
      doShort: 'Use it to plan your route and lane',
      where: 'Highways and major roads.',
      mistake: 'Making late lane changes because you read the sign too late.',
    }, ['exit-number', 'tourism', 'airport']),

  sign('exit-number', 'Exit number', 'information', 'Green sign reading EXIT 25 with an arrow up and to the right',
    () => (
      <g>
        <rect x="20" y="44" width="160" height="112" rx="8" fill={C.green} stroke={C.white} strokeWidth="4" />
        <T x={100} y={88} s={26} fill={C.white} w={800}>EXIT</T>
        <T x={86} y={136} s={42} fill={C.white} w={800}>25</T>
        <Arrow d="M128 134 L142 120" x={142} y={120} a={-45} w={8} hl={14} hw={22} c={C.white} />
      </g>
    ),
    {
      short: 'Freeway exits are numbered by distance',
      meaning: 'Exit numbers on freeways usually match the distance in kilometres from the start of the highway.',
      action: 'Note your exit number early and move to the right lane in good time.',
      doShort: 'Move toward the exit lane in good time',
      where: 'Freeways.',
      mistake: 'Stopping or backing up on the freeway after missing an exit. Go to the next one.',
    }, ['destination', 'airport', 'hospital']),

  sign('hospital', 'Hospital', 'information', 'Blue square with a white letter H',
    () => <Plate fill={C.blue} border={C.white}><T x={100} y={140} s={120} fill={C.white} w={800}>H</T></Plate>,
    {
      short: 'A hospital is nearby',
      meaning: 'Blue signs show services. This one shows the way to a hospital with an emergency department.',
      action: 'Follow the signs if you need a hospital, and watch for ambulances.',
      doShort: 'Follow it if you need a hospital',
      where: 'Highways and city streets.',
      mistake: 'Confusing it with a hotel or housing sign.',
    }, ['accessible-facility', 'airport', 'tourism']),

  sign('airport', 'Airport', 'information', 'Green sign with a white airplane',
    () => <Plate fill={C.green} border={C.white}><Plane s={1.25} /></Plate>,
    {
      short: 'Route to an airport',
      meaning: 'This sign shows the route to an airport.',
      action: 'Follow the signs if you are going to the airport.',
      doShort: 'Follow it to get to the airport',
      where: 'Highways and roads near airports.',
      mistake: 'Thinking it warns of low-flying planes.',
    }, ['hospital', 'destination', 'tourism']),

  sign('accessible-facility', 'Accessible facility', 'information', 'Blue sign with a white wheelchair symbol',
    () => <Plate fill={C.blue} border={C.white}><Wheelchair s={1.25} y={106} /></Plate>,
    {
      short: 'The facility is accessible to people with disabilities',
      meaning: 'This sign shows a facility or route that is accessible to people with disabilities.',
      action: 'Follow it to the accessible entrance or facility.',
      doShort: 'Follow it to the accessible entrance',
      where: 'Buildings, parking areas and transit.',
      mistake: 'Treating it as permission to park. Accessible parking needs a permit.',
    }, ['accessible-parking', 'hospital', 'tourism']),

  sign('tourism', 'Tourism and recreation', 'information', 'Brown sign with a white tent',
    () => (
      <Plate fill={C.brown} border={C.white}>
        <polygon points="100,52 150,142 50,142" fill={C.white} />
        <polygon points="100,98 116,142 84,142" fill={C.brown} />
      </Plate>
    ),
    {
      short: 'A tourist attraction or recreation area is nearby',
      meaning: 'Brown signs point to tourism and recreation, such as parks, campgrounds and attractions.',
      action: 'Follow it if you are heading to the attraction.',
      doShort: 'Follow it to the attraction',
      where: 'Highways and rural roads.',
      mistake: 'Confusing brown tourism signs with green route signs.',
    }, ['destination', 'hospital', 'airport']),
];

export const railwaySigns: SignDef[] = [
  sign('railway-crossbuck', 'Railway crossing (crossbuck)', 'railway', 'White X-shaped sign with a red border',
    () => <Crossbuck />,
    {
      short: 'This is a railway crossing',
      meaning: 'The crossbuck marks a railway crossing. If more than one track crosses, a sign below shows how many.',
      action: 'Slow down, look and listen both ways, and be ready to stop. Stop at least 5 m from the nearest rail if a train is coming.',
      doShort: 'Slow down, look both ways and be ready to stop',
      where: 'At every public railway crossing.',
      mistake: 'Assuming a crossing with no lights or gates has no trains.',
    }, ['railway-signals', 'railway-ahead', 'intersection-ahead']),

  sign('railway-signals', 'Railway crossing signals', 'railway', 'Crossbuck above two red lights on a crossbar',
    () => (
      <g>
        <Crossbuck x={100} y={46} s={0.46} />
        <rect x="96" y="80" width="8" height="116" fill="#555" />
        <rect x="26" y="112" width="148" height="36" rx="18" fill={C.black} />
        <circle cx="52" cy="130" r="15" fill="#E53935" className="sig-flash" />
        <circle cx="148" cy="130" r="15" fill="#E53935" className="sig-flash-alt" />
      </g>
    ),
    {
      short: 'A train is coming when the red lights flash',
      meaning: 'Flashing red lights, bells and gates warn that a train is coming.',
      action: 'Stop at least 5 m from the nearest rail or gate. Do not cross until the lights stop flashing and any gate is fully up.',
      doShort: 'Stop and wait until the lights stop and the gate is up',
      where: 'Busier railway crossings.',
      mistake: 'Driving around a gate, or crossing as soon as one train passes. Another may be coming.',
    }, ['railway-crossbuck', 'light-flash-red', 'stop'], 'rules'),

  sign('railway-ahead', 'Railway crossing ahead', 'railway', 'Yellow diamond with a black X',
    () => (
      <Diamond>
        <L d="M66 66 L134 134" w={14} />
        <L d="M134 66 L66 134" w={14} />
      </Diamond>
    ),
    {
      short: 'A railway crossing is ahead',
      meaning: 'There is a railway crossing ahead.',
      action: 'Slow down, look and listen for trains, and be ready to stop.',
      doShort: 'Slow down and look and listen for trains',
      where: 'Before railway crossings.',
      mistake: 'Confusing it with the crossbuck, which is at the crossing itself.',
    }, ['railway-crossbuck', 'intersection-ahead', 'signal-ahead']),
];

export const signalSigns: SignDef[] = [
  sign('light-red', 'Red light', 'signals', 'Traffic light showing red',
    () => <SignalHead red />,
    {
      short: 'Stop and wait until the light turns green',
      meaning: 'A red light means stop. You may turn right (or left from a one-way road onto a one-way road) after a full stop, unless a sign forbids it.',
      action: 'Stop at the stop line, crosswalk or edge of the intersection. Wait for green and a clear intersection.',
      doShort: 'Stop and wait for green',
      where: 'Signalized intersections.',
      mistake: 'Turning right on red without stopping first and yielding to pedestrians.',
    }, ['light-flash-red', 'light-yellow', 'no-right-on-red'], 'rules'),

  sign('light-yellow', 'Yellow (amber) light', 'signals', 'Traffic light showing yellow',
    () => <SignalHead yellow />,
    {
      short: 'The light is about to turn red; stop if you safely can',
      meaning: 'A yellow light means the red light is about to appear.',
      action: 'Stop if you can do so safely. If you are too close to stop safely, go through with caution.',
      doShort: 'Stop if you safely can; otherwise go through carefully',
      where: 'Signalized intersections.',
      mistake: 'Speeding up to "beat the light".',
    }, ['light-red', 'light-flash-yellow', 'light-green'], 'rules'),

  sign('light-green', 'Green light', 'signals', 'Traffic light showing green',
    () => <SignalHead green />,
    {
      short: 'Go if the way is clear',
      meaning: 'A green light means you may turn left, go straight or turn right if the way is clear, unless a sign forbids a turn.',
      action: 'Go only when the intersection is clear. Yield to pedestrians and to vehicles already in the intersection.',
      doShort: 'Go when the intersection is clear',
      where: 'Signalized intersections.',
      mistake: 'Entering the intersection when traffic is backed up and you cannot clear it.',
    }, ['light-advance-green', 'light-yellow', 'light-green-arrow'], 'rules'),

  sign('light-flash-red', 'Flashing red light', 'signals', 'Traffic light with the red lamp flashing',
    () => <SignalHead red flash="red" />,
    {
      short: 'Treat it like a stop sign',
      meaning: 'A flashing red light means the same as a stop sign.',
      action: 'Come to a complete stop and go only when it is safe.',
      doShort: 'Stop completely, then go when safe',
      where: 'Intersections at night or with signal trouble.',
      mistake: 'Slowing without stopping, as if it were yellow.',
    }, ['light-red', 'light-flash-yellow', 'stop'], 'rules'),

  sign('light-flash-yellow', 'Flashing yellow light', 'signals', 'Traffic light with the yellow lamp flashing',
    () => <SignalHead yellow flash="yellow" />,
    {
      short: 'Slow down and drive with caution',
      meaning: 'A flashing yellow light means drive with caution when approaching and moving through the intersection.',
      action: 'Slow down, look and be ready to stop.',
      doShort: 'Slow down and go through with caution',
      where: 'Intersections and hazards.',
      mistake: 'Stopping completely when there is no need.',
    }, ['light-flash-red', 'light-yellow', 'light-advance-green'], 'rules'),

  sign('light-advance-green', 'Advance green (flashing green)', 'signals', 'Traffic light with the green lamp flashing',
    () => <SignalHead green flash="green" />,
    {
      short: 'You may turn left, go straight or turn right; oncoming traffic is held',
      meaning: 'A flashing green light, or a green arrow with a green light, is an advance green. Oncoming traffic still faces a red light.',
      action: 'You may turn left, go straight or turn right from the proper lane. Pedestrians may not cross yet unless their signal says so.',
      doShort: 'Turn or go straight; oncoming traffic is stopped',
      where: 'Busy intersections.',
      mistake: 'Thinking flashing green means caution, like flashing yellow.',
    }, ['light-green', 'light-green-arrow', 'light-flash-yellow'], 'rules'),

  sign('light-green-arrow', 'Red light with green left arrow', 'signals', 'Traffic light showing red with a green left-turn arrow',
    () => <SignalHead red arrow="green" />,
    {
      short: 'You may turn left from the left-turn lane',
      meaning: 'A red light with a left-pointing green arrow is a protected left turn. Oncoming traffic may also be turning left.',
      action: 'Turn left from the left-turn lane, in the direction of the arrow.',
      doShort: 'Turn left from the turning lane',
      where: 'Intersections with left-turn lanes.',
      mistake: 'Going straight while the arrow is green. Through traffic still faces red.',
    }, ['light-yellow-arrow', 'light-advance-green', 'light-red'], 'rules'),

  sign('light-yellow-arrow', 'Yellow left arrow', 'signals', 'Traffic light showing red with a yellow left-turn arrow',
    () => <SignalHead red arrow="yellow" />,
    {
      short: 'The protected turn is ending; do not start the turn',
      meaning: 'A yellow arrow means the green arrow is ending.',
      action: 'Do not start your turn. Stop if you can do so safely; otherwise complete the turn with caution.',
      doShort: 'Do not start the turn; stop if you safely can',
      where: 'Intersections with protected turns.',
      mistake: 'Speeding up to make the turn.',
    }, ['light-green-arrow', 'light-yellow', 'light-red'], 'rules'),

  sign('light-transit', 'Transit priority signal', 'signals', 'Round signal with a white vertical bar above a red light',
    () => <SignalHead red top />,
    {
      short: 'Only transit vehicles may go; other traffic waits',
      meaning: 'A white vertical bar on a transit signal lets buses and streetcars go while other traffic faces red.',
      action: 'If you are not driving a transit vehicle, obey your own light and yield to the transit vehicle.',
      doShort: 'Wait; the signal is for transit vehicles only',
      where: 'Intersections on transit routes.',
      mistake: 'Following a bus through on its signal.',
    }, ['light-red', 'light-green-arrow', 'yield-to-bus'], 'rules'),

  sign('ped-walk', 'Pedestrian walk signal', 'signals', 'Pedestrian signal showing a white walking person',
    () => <Ped><Person y={104} s={1.15} c={C.white} /></Ped>,
    {
      short: 'Pedestrians may start crossing',
      meaning: 'The walking person signal means pedestrians may start to cross.',
      action: 'As a driver, yield to pedestrians crossing, especially when turning.',
      doShort: 'Yield to people crossing, especially when turning',
      where: 'Signalized intersections.',
      mistake: 'Turning through a crosswalk while people are still in it.',
    }, ['ped-hand', 'pedestrian-crossover', 'light-green'], 'sharing'),

  sign('ped-hand', 'Pedestrian don’t-walk signal', 'signals', 'Pedestrian signal showing an orange raised hand',
    () => (
      <Ped>
        <g fill="#F28C28">
          <rect x="78" y="98" width="46" height="48" rx="12" />
          {[78, 90, 102, 114].map((x) => <rect key={x} x={x} y={58} width="10" height="50" rx="5" />)}
          <rect x="116" y="100" width="10" height="38" rx="5" transform="rotate(-35 121 119)" />
        </g>
      </Ped>
    ),
    {
      short: 'Pedestrians must not start to cross',
      meaning: 'A steady hand means do not start to cross. A flashing hand or countdown means do not start, and finish crossing if already in the road.',
      action: 'As a driver, still yield to anyone who is finishing their crossing.',
      doShort: 'Let anyone still in the crosswalk finish crossing',
      where: 'Signalized intersections.',
      mistake: 'Driving at people who are finishing their crossing on a flashing hand.',
    }, ['ped-walk', 'light-red', 'pedestrian-crossover'], 'sharing'),

  sign('hand-left', 'Hand signal: left turn', 'signals', 'Rear view of a car with the driver’s arm held straight out',
    () => <HandSignal kind="left" />,
    {
      short: 'I am turning left',
      meaning: 'The driver’s arm held straight out the window means a left turn.',
      action: 'Use it when your signal lights do not work, or to make your signal clearer.',
      doShort: 'Arm straight out to signal a left turn',
      where: 'When signal lights are not working, and by cyclists.',
      mistake: 'Mixing it up with the right-turn signal (arm bent up).',
    }, ['hand-right', 'hand-stop']),

  sign('hand-right', 'Hand signal: right turn', 'signals', 'Rear view of a car with the driver’s arm bent upward',
    () => <HandSignal kind="right" />,
    {
      short: 'I am turning right',
      meaning: 'The driver’s arm out the window and bent up at the elbow means a right turn.',
      action: 'Use it when your signal lights do not work.',
      doShort: 'Arm out and bent up to signal a right turn',
      where: 'When signal lights are not working, and by cyclists.',
      mistake: 'Thinking the arm bent up means "pass me".',
    }, ['hand-left', 'hand-stop']),

  sign('hand-stop', 'Hand signal: stop or slow down', 'signals', 'Rear view of a car with the driver’s arm bent downward',
    () => <HandSignal kind="stop" />,
    {
      short: 'I am slowing down or stopping',
      meaning: 'The driver’s arm out the window and bent down at the elbow means slowing down or stopping.',
      action: 'Use it when your brake lights do not work.',
      doShort: 'Arm out and bent down to signal stopping',
      where: 'When brake lights are not working, and by cyclists.',
      mistake: 'Holding the arm straight out, which means a left turn.',
    }, ['hand-left', 'hand-right']),

  sign('mark-solid', 'Solid centre line', 'signals', 'Road seen from above with a solid yellow centre line on the left of your lane',
    () => (
      <Road>
        <CentreSolid />
        <TopCar x={72} y={56} c="#7B8794" down />
        <TopCar x={128} y={138} c="#2F6FD6" label="You" />
      </Road>
    ),
    {
      short: 'Passing is not allowed: solid line on your side',
      meaning: 'A solid line at the left of your lane means it is unsafe to pass.',
      action: 'Stay in your lane. Do not cross the line to pass.',
      doShort: 'Stay in your lane; do not pass',
      where: 'Hills, curves and other no-passing zones.',
      mistake: 'Finishing a pass after the solid line begins.',
    }, ['mark-broken', 'do-not-pass', 'mark-continuity'], 'rules'),

  sign('mark-broken', 'Broken centre line', 'signals', 'Road seen from above with a broken yellow centre line',
    () => (
      <Road>
        <CentreBroken />
        <TopCar x={72} y={40} c="#7B8794" down />
        <TopCar x={128} y={138} c="#2F6FD6" label="You" />
      </Road>
    ),
    {
      short: 'You may pass when the way is clear',
      meaning: 'A broken line at the left of your lane means you may pass if it is safe and legal.',
      action: 'Pass only if the way is clear and there is room to finish before the line becomes solid.',
      doShort: 'Pass only when the way ahead is clear',
      where: 'Two-lane roads with good visibility.',
      mistake: 'Thinking a broken line means passing is always safe.',
    }, ['mark-solid', 'mark-continuity', 'two-way-traffic'], 'rules'),

  sign('mark-continuity', 'Continuity lines', 'signals', 'Two lanes going the same way, with wide short dashes on the left of your lane',
    () => (
      <Road>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => <rect key={i} x="96" y={4 + i * 20} width="8" height="10" fill={C.lane} />)}
        <TopCar x={72} y={60} c="#7B8794" />
        <TopCar x={128} y={138} c="#2F6FD6" label="You" />
      </Road>
    ),
    {
      short: 'Lines on your left: your lane is ending or exiting',
      meaning: 'Continuity lines are wide, closely spaced broken lines. On your left they usually mean your lane is ending or exiting. On your right they mean your lane continues.',
      action: 'If you want to keep going straight, move over before your lane ends.',
      doShort: 'Change lanes if you want to keep going straight',
      where: 'Freeway exits and lane drops.',
      mistake: 'Ending up on the exit ramp by not noticing the lines.',
    }, ['mark-broken', 'right-lane-ends', 'mark-solid'], 'rules'),

  sign('mark-crossover', 'Pedestrian crossover markings', 'signals', 'Road seen from above with double white lines across it and an X in each approaching lane',
    () => (
      <Road>
        <CentreSolid />
        <rect x="43" y="78" width="114" height="5" fill={C.lane} />
        <rect x="43" y="88" width="114" height="5" fill={C.lane} />
        <rect x="43" y="110" width="114" height="5" fill={C.lane} />
        <rect x="43" y="120" width="114" height="5" fill={C.lane} />
        <T x={128} y={170} s={40} fill={C.lane} w={800}>X</T>
        <T x={72} y={56} s={40} fill={C.lane} w={800}>X</T>
        <Person x={84} y={104} s={0.42} c="#F5C542" />
      </Road>
    ),
    {
      short: 'Pedestrian crossover: stop and let pedestrians fully cross',
      meaning: 'Double white lines across the road with an X in each approaching lane mark a pedestrian crossover.',
      action: 'Stop at the yield line and wait until pedestrians have completely crossed the road.',
      doShort: 'Stop and wait until pedestrians have fully crossed',
      where: 'Mid-block and unsignalized crossings.',
      mistake: 'Passing a vehicle within 30 m of the crossover.',
    }, ['pedestrian-crossover', 'mark-bike-box', 'no-passing-crossing'], 'sharing'),

  sign('mark-bike-box', 'Bike box', 'signals', 'Road seen from above with a green box containing a bicycle in front of the stop line',
    () => (
      <Road>
        <CentreSolid />
        {[48, 66, 84, 116, 134, 152].map((x) => <rect key={x} x={x - 6} y="26" width="10" height="22" fill={C.lane} />)}
        <rect x="102" y="58" width="55" height="46" fill="#2FA35A" />
        <Bike x={130} y={84} s={0.42} c={C.white} />
        <rect x="102" y="106" width="55" height="5" fill={C.lane} />
        <TopCar x={130} y={146} c="#2F6FD6" label="You" />
      </Road>
    ),
    {
      short: 'Stop behind the bike box at a red light',
      meaning: 'A bike box is a painted area in front of the stop line where cyclists wait at a red light so drivers can see them.',
      action: 'Stop behind the box. Never stop inside it, and watch for cyclists before turning.',
      doShort: 'Stop behind the box, never in it',
      where: 'City intersections with bike lanes.',
      mistake: 'Creeping into the green box while waiting.',
    }, ['mark-sharrow', 'bike-lane', 'mark-crossover'], 'sharing'),

  sign('mark-sharrow', 'Sharrow (shared lane)', 'signals', 'Lane seen from above with a bicycle symbol and two chevrons',
    () => (
      <Road>
        <CentreBroken />
        <L d="M114 82 L128 68 L142 82" w={6} c={C.lane} />
        <L d="M114 102 L128 88 L142 102" w={6} c={C.lane} />
        <Bike x={128} y={136} s={0.5} c={C.lane} />
      </Road>
    ),
    {
      short: 'The lane is shared by cyclists and drivers',
      meaning: 'A bicycle symbol with two chevrons (a sharrow) shows a lane shared by bicycles and vehicles, and where cyclists should ride.',
      action: 'Expect cyclists in the lane and change lanes to pass them when it is safe.',
      doShort: 'Expect cyclists and pass only when safe',
      where: 'City streets too narrow for a separate bike lane.',
      mistake: 'Thinking it marks a bicycle-only lane.',
    }, ['mark-bike-box', 'share-the-road', 'bike-lane'], 'sharing'),
];
