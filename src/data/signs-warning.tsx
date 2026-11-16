import { Arrow, Bike, Bus, C, CarSide, Deer, Diamond, Octagon, Person, Plate, Snowmobile, T, TrafficLight, Truck } from './sign-art';
import { stripes } from './sign-geom';
import { sign, type SignDef } from './sign-types';

const L = ({ d, w = 13, c = C.black, dash }: { d: string; w?: number; c?: string; dash?: string }) => (
  <path d={d} stroke={c} strokeWidth={w} fill="none" strokeLinecap="butt" strokeLinejoin="round" strokeDasharray={dash} />
);

function Roundabout() {
  const r = 34;
  const arcs = [0, 120, 240].map((k) => {
    const a0 = ((k + 70) * Math.PI) / 180;
    const a1 = ((k + 70 - 74) * Math.PI) / 180;
    const p0 = [100 + r * Math.cos(a0), 100 + r * Math.sin(a0)];
    const p1 = [100 + r * Math.cos(a1), 100 + r * Math.sin(a1)];
    const headAngle = k + 70 - 74 - 90;
    return (
      <Arrow key={k} d={`M${p0[0].toFixed(1)} ${p0[1].toFixed(1)} A${r} ${r} 0 0 0 ${p1[0].toFixed(1)} ${p1[1].toFixed(1)}`}
        x={p1[0]} y={p1[1]} a={headAngle} w={10} hl={16} hw={26} />
    );
  });
  return <Diamond>{arcs}</Diamond>;
}

function Checkerboard() {
  const cells: JSX.Element[] = [];
  const n = 10;
  const s = 14;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      const edge = i < 2 || j < 2 || i >= n - 2 || j >= n - 2;
      if (edge && (i + j) % 2 === 0) cells.push(<rect key={`${i}-${j}`} x={30 + i * s} y={30 + j * s} width={s} height={s} fill={C.black} />);
    }
  }
  return (
    <g>
      <g transform="rotate(45 100 100)">
        <rect x="30" y="30" width="140" height="140" fill={C.yellow} stroke={C.black} strokeWidth="1.5" />
        {cells}
      </g>
      <Arrow d="M66 100 L114 100" x={114} y={100} a={0} w={14} hl={22} hw={36} />
    </g>
  );
}

export const warningSigns: SignDef[] = [
  sign('curve-right', 'Curve ahead', 'warning', 'Yellow diamond with an arrow curving to the right',
    () => <Diamond><Arrow d="M86 156 L86 118 Q86 76 116 60" x={116} y={60} a={-30} w={14} hl={24} hw={38} /></Diamond>,
    {
      short: 'The road curves ahead in the direction shown',
      meaning: 'There is a curve ahead. A gentle curve is shown with a curved arrow.',
      action: 'Slow down before the curve and keep to your lane.',
      doShort: 'Slow down before the curve',
      where: 'Rural and highway roads before bends.',
      mistake: 'Braking hard in the middle of the curve instead of slowing before it.',
    }, ['sharp-turn-right', 'winding-road', 'chevron']),

  sign('sharp-turn-right', 'Sharp turn ahead', 'warning', 'Yellow diamond with an arrow that bends sharply to the right',
    () => <Diamond><Arrow d="M86 156 L86 92 L112 92" x={112} y={92} a={0} w={14} hl={24} hw={38} /></Diamond>,
    {
      short: 'A sharp turn ahead in the direction shown',
      meaning: 'The road turns sharply ahead. A right-angle arrow shows a sharp turn rather than a gentle curve.',
      action: 'Slow down well before the turn, and watch for an advisory speed tab.',
      doShort: 'Slow right down before the sharp turn',
      where: 'Country roads and ramps.',
      mistake: 'Treating it like a gentle curve and entering too fast.',
    }, ['curve-right', 'checkerboard-turn', 'advisory-speed']),

  sign('winding-road', 'Winding road', 'warning', 'Yellow diamond with a snake-shaped arrow',
    () => (
      <Diamond>
        <Arrow d="M88 160 Q66 140 88 122 Q112 104 88 86 Q72 74 92 60" x={94} y={58} a={-45} w={13} hl={20} hw={32} />
      </Diamond>
    ),
    {
      short: 'A winding road with a series of curves ahead',
      meaning: 'There are several curves in a row ahead.',
      action: 'Slow down, stay in your lane and do not pass.',
      doShort: 'Slow down and stay in your lane through the curves',
      where: 'Hilly and rural roads.',
      mistake: 'Passing on a winding road where you cannot see oncoming traffic.',
    }, ['curve-right', 'slippery', 'sharp-turn-right']),

  sign('chevron', 'Chevron (curve marker)', 'warning', 'Yellow rectangle with a black chevron pointing right',
    () => (
      <g>
        <rect x="50" y="20" width="100" height="160" rx="6" fill={C.yellow} stroke={C.black} strokeWidth="1.5" />
        <polygon points="72,44 130,100 72,156 72,126 100,100 72,74" fill={C.black} />
      </g>
    ),
    {
      short: 'Sharp change in direction; follow the chevrons around the curve',
      meaning: 'Chevrons are posted in groups on the outside of a sharp curve to guide you through it.',
      action: 'Slow down and steer in the direction the chevrons point.',
      doShort: 'Slow down and follow the curve the chevrons show',
      where: 'The outside edge of sharp curves.',
      mistake: 'Ignoring them at night, when they are most useful.',
    }, ['checkerboard-turn', 'curve-right', 'hazard-marker']),

  sign('checkerboard-turn', 'Checkerboard turn warning', 'warning', 'Yellow diamond with a black checkerboard border and an arrow pointing right',
    () => <Checkerboard />,
    {
      short: 'Caution: sharp turn ahead in the direction of the arrow',
      meaning: 'The road changes direction sharply. The checkerboard border warns of a hazard you could run into if you miss the turn.',
      action: 'Slow down and turn in the direction of the arrow.',
      doShort: 'Slow down and turn the way the arrow points',
      where: 'Where a road ends at a T or turns sharply.',
      mistake: 'Thinking it means "road ends". The arrow shows you must turn.',
    }, ['chevron', 'sharp-turn-right', 'hazard-marker']),

  sign('advisory-speed', 'Advisory speed tab', 'warning', 'Yellow square reading 40 km/h',
    () => (
      <Plate x={30} y={30} w={140} h={140} fill={C.yellow}>
        <T x={100} y={112} s={70} w={800}>40</T>
        <T x={100} y={150} s={26} w={800}>km/h</T>
      </Plate>
    ),
    {
      short: 'The recommended safe speed for the curve or hazard',
      meaning: 'This yellow tab, under a warning sign, shows the speed recommended for that curve or hazard in good conditions.',
      action: 'Slow to the speed shown, or slower in bad conditions.',
      doShort: 'Slow to the advised speed for the hazard',
      where: 'Under curve, ramp and hazard warning signs.',
      mistake: 'Mixing it up with the white speed limit sign. Yellow advises; white is the law.',
    }, ['speed-limit', 'sharp-turn-right', 'curve-right']),

  sign('intersection-ahead', 'Intersection ahead', 'warning', 'Yellow diamond with an upward arrow crossed by a horizontal line',
    () => (
      <Diamond>
        <rect x="46" y="96" width="108" height="16" fill={C.black} />
        <Arrow d="M100 158 L100 76" x={100} y={74} a={-90} w={16} hl={22} hw={38} />
      </Diamond>
    ),
    {
      short: 'An intersection is ahead',
      meaning: 'There is an intersection ahead. Traffic may cross or enter from the side roads.',
      action: 'Slow down, look both ways and be ready to stop.',
      doShort: 'Slow down and watch for crossing traffic',
      where: 'Rural roads and highways, where intersections can be hard to see.',
      mistake: 'Assuming you have the right-of-way because there is no sign on your road.',
    }, ['side-road', 'roundabout-ahead', 'signal-ahead']),

  sign('side-road', 'Side road ahead', 'warning', 'Yellow diamond with an upward arrow and a road branching off at an angle',
    () => (
      <Diamond>
        <L d="M100 118 L134 84" w={14} />
        <Arrow d="M100 158 L100 76" x={100} y={74} a={-90} w={16} hl={22} hw={38} />
      </Diamond>
    ),
    {
      short: 'A road branches off ahead',
      meaning: 'A side road joins your road ahead, on the side and at the angle shown.',
      action: 'Watch for vehicles entering from the side road.',
      doShort: 'Watch for vehicles entering from the side road',
      where: 'Highways and rural roads.',
      mistake: 'Confusing it with the merge sign, where a lane joins yours.',
    }, ['intersection-ahead', 'merge', 'truck-entrance']),

  sign('roundabout-ahead', 'Roundabout ahead', 'warning', 'Yellow diamond with three arrows circling counter-clockwise',
    () => <Roundabout />,
    {
      short: 'A roundabout is ahead',
      meaning: 'There is a roundabout ahead. Traffic in a roundabout travels counter-clockwise.',
      action: 'Slow down, and get ready to yield to traffic already in the roundabout.',
      doShort: 'Slow down and prepare to yield to traffic in the circle',
      where: 'Before roundabouts, often with an advisory speed tab.',
      mistake: 'Stopping inside the roundabout to let others in.',
    }, ['intersection-ahead', 'yield', 'advisory-speed'], 'rules'),

  sign('narrow-bridge', 'Narrow bridge', 'warning', 'Yellow diamond with two lines narrowing toward a bridge',
    () => (
      <Diamond>
        <L d="M58 56 L78 74 L78 126 L58 144" w={10} />
        <L d="M142 56 L122 74 L122 126 L142 144" w={10} />
      </Diamond>
    ),
    {
      short: 'A narrow bridge is ahead',
      meaning: 'The bridge ahead is narrower than the road, and there may not be room to pass oncoming vehicles.',
      action: 'Slow down and check for oncoming traffic before driving onto the bridge.',
      doShort: 'Slow down and check for oncoming traffic before crossing',
      where: 'Rural roads with older bridges.',
      mistake: 'Racing an oncoming vehicle onto the bridge.',
    }, ['pavement-narrows', 'right-lane-ends', 'lift-bridge']),

  sign('pavement-narrows', 'Pavement narrows', 'warning', 'Yellow diamond with two thick lines that bend inward',
    () => (
      <Diamond>
        <L d="M70 158 L70 118 Q70 102 88 92 L88 44" w={14} />
        <L d="M130 158 L130 118 Q130 102 112 92 L112 44" w={14} />
      </Diamond>
    ),
    {
      short: 'The road becomes narrower ahead',
      meaning: 'The pavement ahead is narrower than the road you are on.',
      action: 'Slow down and watch for traffic coming the other way.',
      doShort: 'Slow down; the road gets narrower',
      where: 'Rural roads and at the ends of wider sections.',
      mistake: 'Confusing it with "divided highway ends".',
    }, ['narrow-bridge', 'right-lane-ends', 'divided-ends']),

  sign('right-lane-ends', 'Right lane ends', 'warning', 'Yellow diamond with two lanes where the right lane line bends in',
    () => (
      <Diamond>
        <L d="M72 160 L72 42" w={12} />
        <L d="M100 156 L100 128" w={6} dash="14 10" />
        <L d="M130 160 L130 118 Q130 98 106 84 L106 42" w={12} />
      </Diamond>
    ),
    {
      short: 'The right lane ends ahead',
      meaning: 'The right lane is ending. Traffic in it must merge left.',
      action: 'If you are in the right lane, signal and merge left when it is safe. If you are in the left lane, help others merge.',
      doShort: 'Merge left safely if you are in the right lane',
      where: 'Highways where lanes drop.',
      mistake: 'Speeding up to block a driver who is merging.',
    }, ['merge', 'lane-closed', 'pavement-narrows']),

  sign('merge', 'Merging traffic', 'warning', 'Yellow diamond with a vertical line joined by a curved line from the right',
    () => (
      <Diamond>
        <L d="M86 160 L86 42" w={14} />
        <L d="M138 160 Q138 112 94 88" w={12} />
      </Diamond>
    ),
    {
      short: 'Traffic is joining from the side; be ready to let it in',
      meaning: 'Two roads or lanes join ahead. Traffic will be entering your lane from the side shown.',
      action: 'Watch for merging traffic and adjust your speed or lane so vehicles can merge safely.',
      doShort: 'Adjust your speed to let traffic merge',
      where: 'Freeway on-ramps and where two roads join.',
      mistake: 'Assuming the merging driver will always wait. Both drivers share responsibility.',
    }, ['right-lane-ends', 'side-road', 'yield']),

  sign('divided-begins', 'Divided highway begins', 'warning', 'Yellow diamond with arrows splitting around a median',
    () => (
      <Diamond>
        <rect x="93" y="40" width="14" height="52" rx="7" fill={C.black} />
        <Arrow d="M112 162 L112 132 Q112 118 126 106 L126 82" x={126} y={80} a={-90} w={11} hl={18} hw={30} />
        <Arrow d="M74 68 L74 104 Q74 116 88 128 L88 136" x={88} y={138} a={90} w={11} hl={18} hw={30} />
      </Diamond>
    ),
    {
      short: 'A divided highway begins ahead',
      meaning: 'The road ahead becomes a divided highway with a median between opposing traffic.',
      action: 'Keep to the right of the median.',
      doShort: 'Keep to the right of the median ahead',
      where: 'Where an undivided road becomes divided.',
      mistake: 'Mixing it up with "divided highway ends" (median at the bottom).',
    }, ['divided-ends', 'keep-right', 'two-way-traffic']),

  sign('divided-ends', 'Divided highway ends', 'warning', 'Yellow diamond with arrows coming together after a median',
    () => (
      <Diamond>
        <rect x="93" y="108" width="14" height="52" rx="7" fill={C.black} />
        <Arrow d="M126 166 L126 120 Q126 104 112 92 L112 76" x={112} y={74} a={-90} w={11} hl={18} hw={30} />
        <Arrow d="M88 40 L88 76 Q88 90 74 102 L74 122" x={74} y={124} a={90} w={11} hl={18} hw={30} />
      </Diamond>
    ),
    {
      short: 'The divided highway ends; keep to the right',
      meaning: 'The median ends ahead and traffic in both directions will share one road.',
      action: 'Keep to the right. Oncoming traffic will no longer be separated from you.',
      doShort: 'Keep right; two-way traffic is ahead',
      where: 'Where a divided highway becomes a two-way road.',
      mistake: 'Staying in the left lane after the median ends.',
    }, ['divided-begins', 'two-way-traffic', 'pavement-narrows']),

  sign('two-way-traffic', 'Two-way traffic', 'warning', 'Yellow diamond with one arrow pointing up and one pointing down',
    () => (
      <Diamond>
        <Arrow d="M82 56 L82 128" x={82} y={130} a={90} w={13} hl={22} hw={34} />
        <Arrow d="M118 146 L118 74" x={118} y={72} a={-90} w={13} hl={22} hw={34} />
      </Diamond>
    ),
    {
      short: 'Two-way traffic ahead; share the road with oncoming traffic',
      meaning: 'The road ahead carries traffic in both directions.',
      action: 'Keep to the right and watch for oncoming vehicles.',
      doShort: 'Keep right and expect oncoming traffic',
      where: 'After a one-way section or divided highway ends.',
      mistake: 'Passing as though you were still on a one-way road.',
    }, ['divided-ends', 'one-way', 'do-not-pass']),

  sign('slippery', 'Slippery when wet', 'warning', 'Yellow diamond with a car and two wavy skid marks',
    () => (
      <Diamond>
        <CarSide x={100} y={78} s={0.72} bg={C.yellow} />
        <L d="M80 108 Q66 124 80 138 Q94 152 80 166" w={7} />
        <L d="M120 108 Q106 124 120 138 Q134 152 120 166" w={7} />
      </Diamond>
    ),
    {
      short: 'The road ahead is slippery when wet',
      meaning: 'The pavement can lose grip when wet.',
      action: 'Slow down, increase your following distance and avoid sudden braking or steering.',
      doShort: 'Slow down and avoid sudden moves when wet',
      where: 'Bridges, curves and roads with smooth pavement.',
      mistake: 'Braking hard in the curve instead of slowing before it.',
    }, ['winding-road', 'bump', 'pavement-ends']),

  sign('stop-ahead', 'Stop sign ahead', 'warning', 'Yellow diamond with a small stop sign and an upward arrow',
    () => (
      <Diamond>
        <Octagon cx={100} cy={78} r={34} size={18} />
        <Arrow d="M100 160 L100 134" x={100} y={132} a={-90} w={12} hl={18} hw={30} />
      </Diamond>
    ),
    {
      short: 'A stop sign is ahead',
      meaning: 'There is a stop sign ahead, often hidden by a curve or hill.',
      action: 'Slow down and be ready to stop at the intersection.',
      doShort: 'Slow down and get ready to stop',
      where: 'Before stop signs that are hard to see.',
      mistake: 'Thinking this sign itself requires a stop. The stop is at the intersection.',
    }, ['stop', 'signal-ahead', 'intersection-ahead']),

  sign('signal-ahead', 'Traffic signal ahead', 'warning', 'Yellow diamond with a traffic light',
    () => <Diamond><TrafficLight s={0.95} /></Diamond>,
    {
      short: 'Traffic lights are ahead',
      meaning: 'There are traffic lights ahead, often around a curve or over a hill.',
      action: 'Slow down and be ready to stop if the light is red or turns yellow.',
      doShort: 'Slow down and be ready to stop for the lights',
      where: 'Before signals that are hard to see in time.',
      mistake: 'Confusing it with a railway crossing warning.',
    }, ['stop-ahead', 'intersection-ahead', 'railway-ahead']),

  sign('steep-hill', 'Steep hill', 'warning', 'Yellow diamond with a truck on a downhill slope',
    () => (
      <Diamond>
        <polygon points="50,128 150,152 50,152" fill={C.black} />
        <g transform="rotate(13 100 112)"><Truck x={96} y={108} s={0.62} /></g>
      </Diamond>
    ),
    {
      short: 'A steep hill is ahead',
      meaning: 'There is a steep downgrade ahead.',
      action: 'Slow down, and shift to a lower gear to help control your speed.',
      doShort: 'Slow down and use a lower gear on the hill',
      where: 'Before long or steep descents.',
      mistake: 'Riding the brakes all the way down until they overheat.',
    }, ['falling-rock', 'truck-entrance', 'bump']),

  sign('bump', 'Bump ahead', 'warning', 'Yellow diamond reading BUMP',
    () => <Diamond><T x={100} y={113} s={38} w={800}>BUMP</T></Diamond>,
    {
      short: 'There is a bump or uneven pavement ahead',
      meaning: 'There is a bump or rough patch in the road ahead.',
      action: 'Slow down and keep control of your vehicle.',
      doShort: 'Slow down for the bump',
      where: 'Damaged roads, rail lines and speed humps.',
      mistake: 'Hitting it at full speed and losing control.',
    }, ['pavement-ends', 'slippery', 'steep-hill']),

  sign('deer-crossing', 'Deer crossing', 'warning', 'Yellow diamond with a leaping deer',
    () => <Diamond><Deer s={1} y={104} /></Diamond>,
    {
      short: 'Deer regularly cross this road',
      meaning: 'Deer often cross in this area, especially at dawn, dusk and night.',
      action: 'Slow down, scan the sides of the road and be ready to stop.',
      doShort: 'Slow down and scan for animals',
      where: 'Rural and wooded roads.',
      mistake: 'Swerving into another lane or the ditch to avoid an animal.',
    }, ['snowmobile-crossing', 'falling-rock', 'pedestrian-ahead'], 'safe'),

  sign('falling-rock', 'Falling rock', 'warning', 'Yellow diamond with a cliff and falling rocks',
    () => (
      <Diamond>
        <path d="M100 150 Q98 82 138 58 L148 64 L148 150 Z" fill={C.black} />
        {[[82, 80, 7], [70, 104, 8], [86, 122, 6], [66, 140, 7], [88, 146, 5]].map(([x, y, r]) => <circle key={`${x}${y}`} cx={x} cy={y} r={r} fill={C.black} />)}
      </Diamond>
    ),
    {
      short: 'Watch for falling rocks',
      meaning: 'Rocks may fall onto the road, or may already be lying on it.',
      action: 'Stay alert and be ready to steer around or stop for rocks on the road.',
      doShort: 'Watch for rocks on the road',
      where: 'Roads cut through rock, common in northern Ontario.',
      mistake: 'Mixing it up with the steep hill sign.',
    }, ['steep-hill', 'deer-crossing', 'bump']),

  sign('snowmobile-crossing', 'Snowmobile crossing', 'warning', 'Yellow diamond with a snowmobile',
    () => (
      <Diamond>
        <rect x="56" y="76" width="12" height="52" fill={C.black} />
        <Snowmobile x={112} y={104} s={0.82} />
      </Diamond>
    ),
    {
      short: 'Snowmobiles cross this road',
      meaning: 'Snowmobile trails cross the road here.',
      action: 'Watch for snowmobiles in winter and be ready to stop.',
      doShort: 'Watch for snowmobiles crossing',
      where: 'Rural and northern roads.',
      mistake: 'Confusing it with the green "snowmobiles permitted" sign.',
    }, ['snowmobiles-permitted', 'deer-crossing', 'bicycle-crossing']),

  sign('low-clearance', 'Low clearance', 'warning', 'Yellow diamond with arrows pointing up and down around 3.9 m',
    () => (
      <Diamond>
        <Arrow d="M100 76 L100 74" x={100} y={74} a={-90} w={10} hl={22} hw={40} />
        <T x={100} y={114} s={34} w={800}>3.9 m</T>
        <Arrow d="M100 124 L100 126" x={100} y={126} a={90} w={10} hl={22} hw={40} />
      </Diamond>
    ),
    {
      short: 'Overhead clearance is limited to the height shown',
      meaning: 'There is low overhead clearance ahead, such as a bridge or underpass. The sign shows the maximum height.',
      action: 'Do not continue if your vehicle and load are taller than the height shown.',
      doShort: 'Do not enter if your vehicle is taller than shown',
      where: 'Before low bridges, underpasses and tunnels.',
      mistake: 'Forgetting about roof racks, bikes or cargo on top of the vehicle.',
    }, ['narrow-bridge', 'truck-entrance', 'lift-bridge']),

  sign('hazard-marker', 'Hazard marker', 'warning', 'Yellow and black diagonal stripes on a tall rectangle',
    () => (
      <g>
        <rect x="64" y="14" width="72" height="172" rx="5" fill={C.yellow} stroke={C.black} strokeWidth="1.5" />
        {stripes(64, 14, 136, 186, 16).map((p) => <polygon key={p} points={p} fill={C.black} />)}
      </g>
    ),
    {
      short: 'An obstruction is close to the road',
      meaning: 'There is an object, such as a bridge pier or the end of a guardrail, close to the edge of the road. The stripes slope down toward the side you should pass on.',
      action: 'Pass on the side the stripes slope down toward.',
      doShort: 'Steer past the obstruction on the safe side',
      where: 'Bridge supports, narrow shoulders and road edges.',
      mistake: 'Not noticing them at night until the last moment.',
    }, ['keep-right', 'chevron', 'checkerboard-turn']),

  sign('pavement-ends', 'Pavement ends', 'warning', 'Yellow diamond reading PAVEMENT ENDS',
    () => (
      <Diamond>
        <T x={100} y={96} s={25} w={800} max={118}>PAVEMENT</T>
        <T x={100} y={126} s={27} w={800}>ENDS</T>
      </Diamond>
    ),
    {
      short: 'The paved surface changes to gravel or dirt ahead',
      meaning: 'The road surface changes from pavement to gravel or earth.',
      action: 'Slow down before the change; loose surfaces give less grip.',
      doShort: 'Slow down for the gravel surface',
      where: 'Rural roads.',
      mistake: 'Braking hard on the gravel.',
    }, ['bump', 'slippery', 'pavement-narrows']),

  sign('bicycle-crossing', 'Bicycle crossing', 'warning', 'Yellow diamond with a bicycle',
    () => <Diamond><Bike s={1} /></Diamond>,
    {
      short: 'Cyclists often cross or ride on this road',
      meaning: 'There is a bicycle crossing or cyclists often use this road.',
      action: 'Watch for cyclists and be ready to share the road or stop.',
      doShort: 'Watch for cyclists',
      where: 'Where trails cross roads and near popular cycling routes.',
      mistake: 'Confusing it with the no-bicycles sign (red ring and slash).',
    }, ['bicycle-route', 'share-the-road', 'no-bicycles'], 'sharing'),

  sign('pedestrian-ahead', 'Pedestrians ahead', 'warning', 'Yellow diamond with a walking person',
    () => <Diamond><Person y={104} s={1.05} /></Diamond>,
    {
      short: 'Watch for pedestrians crossing',
      meaning: 'People may be walking on or crossing the road ahead.',
      action: 'Slow down and be ready to stop for pedestrians.',
      doShort: 'Slow down and watch for people crossing',
      where: 'Near parks, trails, and crossings without signals.',
      mistake: 'Confusing it with the pedestrian crossover sign, where you must stop.',
    }, ['pedestrian-crossover', 'school-crossing', 'no-pedestrians'], 'sharing'),

  sign('truck-entrance', 'Truck entrance', 'warning', 'Yellow diamond with a truck',
    () => <Diamond><Truck s={0.8} /></Diamond>,
    {
      short: 'Trucks may be entering the road',
      meaning: 'Trucks may be entering or leaving the road ahead, from a side road or driveway.',
      action: 'Watch for slow-moving trucks pulling in or out.',
      doShort: 'Watch for trucks pulling onto the road',
      where: 'Near quarries, plants and distribution centres.',
      mistake: 'Not leaving room for a truck that needs a wide turn.',
    }, ['side-road', 'steep-hill', 'slow-moving-vehicle'], 'sharing'),

  sign('lift-bridge', 'Bridge lifts or swings', 'warning', 'Yellow diamond with a raised bridge span over water',
    () => (
      <Diamond>
        <L d="M44 112 L82 112" w={8} />
        <L d="M84 112 L124 74" w={8} />
        <L d="M126 112 L156 112" w={8} />
        <rect x="76" y="112" width="10" height="20" fill={C.black} />
        <rect x="120" y="112" width="10" height="20" fill={C.black} />
        <L d="M54 144 q8 -8 16 0 t16 0 t16 0 t16 0 t16 0 t16 0" w={5} />
      </Diamond>
    ),
    {
      short: 'The bridge ahead lifts or swings to let boats pass',
      meaning: 'The bridge ahead opens for boats. You may have to wait.',
      action: 'Watch for signals and gates, and stop when the bridge is opening or open.',
      doShort: 'Be ready to stop for the opening bridge',
      where: 'Canals and waterways such as the Welland Canal.',
      mistake: 'Treating it like a narrow bridge sign.',
    }, ['narrow-bridge', 'low-clearance', 'railway-ahead']),

  sign('hidden-school-bus-stop', 'School bus stop ahead', 'warning', 'Yellow diamond with a school bus',
    () => (
      <Diamond>
        <Bus y={92} s={0.8} bg={C.yellow} />
        <T x={100} y={140} s={18} w={800} max={96}>STOP AHEAD</T>
      </Diamond>
    ),
    {
      short: 'A school bus stop is ahead, hidden from view',
      meaning: 'There is a school bus stop ahead that you may not see until you are close, because of a hill or curve.',
      action: 'Slow down, watch for children and for a stopped school bus with flashing red lights.',
      doShort: 'Slow down and watch for a stopped school bus',
      where: 'Rural roads with hills and curves.',
      mistake: 'Coming over the hill too fast to stop for a bus.',
    }, ['stop-for-school-bus', 'school-zone', 'stop-ahead'], 'sharing'),

  sign('share-the-road', 'Share the road', 'warning', 'Yellow diamond with a bicycle above a car',
    () => (
      <Diamond>
        <Bike x={100} y={72} s={0.62} />
        <CarSide x={100} y={128} s={0.62} bg={C.yellow} />
      </Diamond>
    ),
    {
      short: 'Drivers and cyclists must share the lane',
      meaning: 'Cyclists and drivers share this road, which may be narrow.',
      action: 'Give cyclists room, and leave at least one metre when passing.',
      doShort: 'Give cyclists at least 1 m when passing',
      where: 'Narrow roads popular with cyclists.',
      mistake: 'Squeezing past a cyclist in the same lane.',
    }, ['bicycle-crossing', 'bicycle-route', 'mark-sharrow'], 'sharing'),

  sign('slow-moving-vehicle', 'Slow-moving vehicle', 'warning', 'Orange triangle with a red border pointing up',
    () => (
      <g>
        <polygon points="100,16 188,172 12,172" fill={C.red} stroke={C.black} strokeWidth="1.5" strokeLinejoin="round" />
        <polygon points="100,56 154,152 46,152" fill={C.orange} />
      </g>
    ),
    {
      short: 'A slow-moving vehicle, usually 40 km/h or less',
      meaning: 'This emblem on the back of a vehicle means it travels at 40 km/h or less, such as farm tractors and road equipment.',
      action: 'Slow down early and pass only when it is safe and legal.',
      doShort: 'Slow down early and pass only when safe',
      where: 'On the back of farm machinery and road maintenance vehicles.',
      mistake: 'Closing in too fast. These vehicles may be far slower than you expect.',
    }, ['yield', 'truck-entrance', 'slow-traffic-keep-right'], 'sharing'),
];
