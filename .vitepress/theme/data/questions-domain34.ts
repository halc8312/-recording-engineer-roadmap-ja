import type { ExamQuestion } from './examQuestions'

// 全問、本サイト用に新規作成したオリジナル問題です。
// JAPRS公式問題・公式教材の問題文や選択肢は転載していません。
export const questionsDomain34: ExamQuestion[] = [
  {
    id: 'd3-001',
    domain: 3,
    topic: 'X/Y収音',
    prompt: 'X/Y stereo pairが左右の方向を表す主な手掛かりはどれですか。',
    choices: [
      '近接配置した2本の指向性によって生じるchannel間level差',
      '間隔を空けた2本のomniへ届く到達時間差',
      'MidとSideの信号をmatrix処理して作るlevel差',
      '2本のfigure-8を90°で交差させて得る前後の収音'
    ],
    correctIndex: 0,
    explanation: 'X/Yはcapsuleをほぼ同一点へ置き、micの向きと指向性で生じるlevel差を主に使います。mic間の時間差が小さいため、一般にmono互換を保ちやすい方式です。',
    lesson: '/exam/04-recording-advanced'
  },
  {
    id: 'd3-002',
    domain: 3,
    topic: 'A/B収音',
    prompt: 'spaced A/B pairの説明として最も適切なものはどれですか。',
    choices: [
      '2本のcapsuleを同一点に重ね、level差だけを使う',
      'mic間隔による到達時間差を主なstereo手掛かりにする',
      'MidとSideをmatrix処理して左右へdecodeする',
      '必ずfigure-8を90°で交差させる'
    ],
    correctIndex: 1,
    explanation: 'A/Bはmicを離すことで主に到達時間差を得ます。空間感を得やすい反面、間隔と音源配置によって中央像やmono時のcomb filteringを確認する必要があります。',
    lesson: '/exam/04-recording-advanced'
  },
  {
    id: 'd3-003',
    domain: 3,
    topic: 'M/S decode',
    prompt: 'M/S信号からRight channelを作る基本式はどれですか。',
    choices: ['Mid + Mid', 'Side + Side', 'Mid - Side', 'Left - Mid'],
    correctIndex: 2,
    explanation: '基本decodeはLeft = Mid + Side、Right = Mid - Sideです。Right側ではSideのpolarityを反転して加えるため、mono加算ではSide成分が相殺され、Midが残ります。',
    lesson: '/exam/04-recording-advanced'
  },
  {
    id: 'd3-004',
    domain: 3,
    topic: 'Blumlein pair',
    prompt: 'Blumlein pairの代表的な構成はどれですか。',
    choices: [
      'omni 2本を3 m離して平行に置く',
      'cardioid 2本を17 cm、110°に置く',
      'shotgun mic 2本を同じ方向へ向ける',
      'figure-8 mic 2本を同一点付近で90°交差させる'
    ],
    correctIndex: 3,
    explanation: 'Blumleinはfigure-8を90°で交差させるcoincident方式です。前方だけでなく背後の音も受けるため、roomの響きとnoiseを含めて設置場所を選びます。',
    lesson: '/exam/04-recording-advanced'
  },
  {
    id: 'd3-005',
    domain: 3,
    topic: 'ORTF',
    prompt: 'ORTF pairの出発点として知られる構成はどれですか。',
    choices: [
      'cardioid 2本、capsule間約17 cm、開き角約110°',
      'figure-8 1本とomni 1本を上下へ1 m離す',
      'cardioid 2本を完全同軸・同方向へ向ける',
      'omni 3本を正三角形に置く'
    ],
    correctIndex: 0,
    explanation: 'ORTFはcardioid 2本を約17 cm離し、約110°に開くnear-coincident方式です。level差と時間差の両方を使うため、stereo幅とmono互換を実際に確認します。',
    lesson: '/exam/04-recording-advanced'
  },
  {
    id: 'd3-006',
    domain: 3,
    topic: 'mono互換',
    prompt: 'spaced pairをmonoへ加算した時に音色が細くなりました。最初の確認として最も適切なものはどれですか。',
    choices: [
      'stereo幅を広げるため、左右をさらに強くhard panする',
      '到達時間差、polarity、levelを確認する',
      '片channelのpolarityだけを、比較せず常に反転する',
      '左右へ別々のEQを加え、相殺の有無を確認せず音色を補う'
    ],
    correctIndex: 1,
    explanation: '同系統音の時間差とpolarityは、mono加算時の周波数ごとの強め合い・相殺を左右します。見た目だけで波形を完全整列せず、stereoの奥行きとの交換も耳で判断します。',
    lesson: '/exam/04-recording-advanced'
  },
  {
    id: 'd3-007',
    domain: 3,
    topic: '到達時間',
    prompt: '音速を343 m/sとします。main micより音源に3 m近いspot micへ、音が早く届く時間に最も近いものはどれですか。',
    choices: ['0.87 ms', '2.9 ms', '8.7 ms', '87 ms'],
    correctIndex: 2,
    explanation: '距離差÷音速なので、3÷343 ≈ 0.00875 s、約8.7 msです。この差は定位とcomb filteringに影響しますが、spotを常に完全整列するのが正解とは限りません。',
    lesson: '/exam/04-recording-advanced'
  },
  {
    id: 'd3-008',
    domain: 3,
    topic: 'polarityとdelay',
    prompt: 'polarity reverseとtime delayの違いとして正しいものはどれですか。',
    choices: [
      'どちらも必ずsignalを無音にする',
      'polarity reverseは低域だけ、delayは高域だけへ作用する',
      'どちらも全周波数へ同じ位相角を与える',
      'polarity reverseは波形の符号を反転し、delayの位相角は周波数で変わる'
    ],
    correctIndex: 3,
    explanation: 'polarity reverseは正負を一括反転します。一方、一定時間のdelayは周波数が高いほど同じ時間内に進む周期数が多いため、位相差が周波数ごとに変わります。',
    lesson: '/exam/04-recording-advanced'
  },
  {
    id: 'd3-009',
    domain: 3,
    topic: 'orchestra main mic',
    prompt: 'orchestra録音でmain pairが担う中心的な役割はどれですか。',
    choices: [
      'ensemble全体のbalance、定位、hallとの関係を土台として捉える',
      '特定のsolo楽器だけを他から完全分離する',
      '客席後方の残響と拍手だけを補助的に捉える',
      '各sectionのattackだけをclose位置で補強する'
    ],
    correctIndex: 0,
    explanation: 'main pair／arrayはensemble全体と空間の土台です。spot micは不足する明瞭度やsectionを補い、ambience micはhallの後方・側方の響きを補う、と役割を分けます。',
    lesson: '/exam/04-recording-advanced'
  },
  {
    id: 'd3-010',
    domain: 3,
    topic: 'spot mic',
    prompt: 'orchestraのspot micの使い方として最も適切なものはどれですか。',
    choices: [
      'main micを必ずmuteし、全楽器をspotだけで作る',
      'mainで不足するsectionやsoloの明瞭度を必要量だけ補う',
      '客席後方の拍手だけを録る',
      'すべてのspotを最大level・同じpanで混ぜる'
    ],
    correctIndex: 1,
    explanation: 'spotはmainの空間像を置き換えるのでなく、必要なsectionを補助する使い方が出発点です。上げすぎると音像が前へ飛び出し、時間差で音色も変わります。',
    lesson: '/exam/04-recording-advanced'
  },
  {
    id: 'd3-011',
    domain: 3,
    topic: 'ambience mic',
    prompt: 'ambience micの役割として最も適切なものはどれですか。',
    choices: [
      'stage前方でensemble全体の直接音と定位を中心に捉える',
      '特定sectionの明瞭度をclose位置から補う',
      'hallの反射、客席、拍手、包囲感を捉える',
      '演奏者ごとのheadphone cueを独立して作る'
    ],
    correctIndex: 2,
    explanation: 'ambience／room micは空間の反射や客席の反応を捉えます。音源の直接音だけでなく空調noiseや観客noiseも入るため、位置と指向性を現場で選びます。',
    lesson: '/exam/04-recording-advanced'
  },
  {
    id: 'd3-012',
    domain: 3,
    topic: 'spotの時間調整',
    prompt: 'main micとspot micの時間調整について、最も適切な考え方はどれですか。',
    choices: [
      '波形の最初のpeakを必ず1 sample単位で一致させる',
      '時間差は音色や定位へ影響しないので確認不要である',
      'spotを必ず100 ms遅らせれば自然になる',
      '距離差を出発点に、定位・音色・奥行きを聴いて必要な調整を決める'
    ],
    correctIndex: 3,
    explanation: '距離差から物理的なdelayを推定できますが、完全整列すると自然な奥行きを失うこともあります。mainとの一体感、先行音効果、mono音色を総合して決めます。',
    lesson: '/exam/04-recording-advanced'
  },
  {
    id: 'd3-013',
    domain: 3,
    topic: 'drum overhead',
    prompt: 'drum overhead micの役割として最も適切なものはどれですか。',
    choices: [
      'cymbalだけでなくkit全体の像と左右関係を捉える',
      'cymbalだけをmonoで収音し、kit全体の像は一切含めない',
      '各close micのpolarityを自動的に完全一致させる',
      'kickとsnareの低域だけを独立して収音する'
    ],
    correctIndex: 0,
    explanation: 'overheadを「cymbal mic」とだけ考えず、kit全体のstereo像と各close micの基準として扱うと位相判断がしやすくなります。',
    lesson: '/exam/04-recording-advanced'
  },
  {
    id: 'd3-014',
    domain: 3,
    topic: 'DI入力',
    prompt: 'passive electric bassをDIまたはHi-Z入力へ接続する主な理由はどれですか。',
    choices: [
      'pickup出力をspeaker levelまで増幅してから受けるため',
      'pickupを過度にloadしない高い入力impedanceで受けるため',
      '低い入力impedanceでpickupの高域を意図せず減らすため',
      'unbalanced信号のまま長距離を高levelで伝送するため'
    ],
    correctIndex: 1,
    explanation: 'passive pickupは高い入力impedanceで受けないとlevelや高域が失われる場合があります。DIはimpedanceとbalanced伝送を整える役割を持ちます。',
    lesson: '/exam/04-recording-advanced'
  },
  {
    id: 'd3-015',
    domain: 3,
    topic: 'DIとamp mic',
    prompt: 'bass DIとamp micを同levelで混ぜると低域が減りました。原因として最初に疑うものはどれですか。',
    choices: [
      'DIとamp micを左右へhard panしたことだけ',
      '両経路へ同じlow-cut EQを加えたことだけ',
      '両経路のpolarityと到達・回路delayによる干渉',
      'sessionのsample rateが48 kHzであることだけ'
    ],
    correctIndex: 2,
    explanation: 'amp側には回路、speaker、空気伝搬の遅れがあり、DIとの位相関係が周波数ごとに変わります。polarity、delay、levelを順に確認します。',
    lesson: '/exam/04-recording-advanced'
  },
  {
    id: 'd3-016',
    domain: 3,
    topic: 'cue latency',
    prompt: 'overdub中、演奏者がheadphoneの遅れで弾きにくいと訴えました。最も適切な対応はどれですか。',
    choices: [
      'monitor signalへreverbを足し、dry signalの遅れを確認しない',
      'bufferを最大にし、安定性だけを優先する',
      'master faderだけをbypassし、cue経路のpluginを残す',
      'buffer、不要plugin、direct monitoringを含むcue経路を確認する'
    ],
    correctIndex: 3,
    explanation: '体感latencyはA/D、buffer、plugin、D/A、routingの合計です。bufferを下げるだけでなく、direct monitoringや低latency経路を使い、安定性も確認します。',
    lesson: '/exam/04-recording-advanced'
  },
  {
    id: 'd3-017',
    domain: 3,
    topic: 'Fukada Tree',
    prompt: 'Fukada Treeの代表的なmic構成と考え方として最も適切なものはどれですか。',
    choices: [
      'L/C/R/Ls/Rsに対応する5本のdirectional micと左右2本のomniを、大きなmain arrayとして扱う',
      '7本のclose micを各楽器へ1本ずつ置き、hall音を入れずに完全分離する',
      'front 3本をomni、rear 4本をshotgunに固定し、すべて同一点へ重ねる',
      '2本のfigure-8 micだけを90°で交差させ、7 channelsへ複製する'
    ],
    correctIndex: 0,
    explanation: 'Fukada Treeは代表的に5本のdirectional micでfront 3chとfront／rearのseparationを作り、左右2本のomniで側方のつながりとambienceを補う7本のsurround main arrayです。',
    lesson: '/exam/04-recording-advanced'
  },
  {
    id: 'd3-018',
    domain: 3,
    topic: 'directとdiffuse surround',
    prompt: 'direct surroundとdiffuse surroundの再生構造の違いとして正しいものはどれですか。',
    choices: [
      'directは残響専用、diffuseは直接音専用という録音素材だけの区別である',
      'directは少数の基準speakerで方向を伝え、diffuseはside／rearの複数speakerへ分散して包囲感を作る',
      'directは同系統信号を多数speakerへ分散し、diffuseは一つのspeakerから各channelを直接届ける',
      'directは広い客席の均一な包囲感、diffuseは一点の精密定位だけを優先する'
    ],
    correctIndex: 1,
    explanation: 'direct surroundは基準位置の少数speakerから個別channelを直接届け、精密な方向表現に向きます。diffuse surroundは複数speakerへ分散し、広い聴取範囲で包囲感を作ります。',
    lesson: '/exam/04-recording-advanced'
  },
  {
    id: 'd3-019',
    domain: 3,
    topic: 'fly-over',
    prompt: '水平5.1 channelだけで作るfly-over表現について正しい説明はどれですか。',
    choices: [
      'LFEのlevelだけを上下させ、物理的な高さ方向へ音を移動する',
      'すべてのspeakerへ同じlevelで送り、位置を固定したまま音色だけを変える',
      'frontからside／rearへlevelやtimingを連続的に移し、聴取者を越える前後移動を表す',
      '上層channelを必ず使い、天井から床への垂直移動だけを表す'
    ],
    correctIndex: 2,
    explanation: '水平5.1のfly-overはfrontとsurround間のlevelやtimingを連続的に変え、前後方向へ通過する印象を作ります。独立したheight channelによる垂直方向の移動とは区別します。',
    lesson: '/exam/04-recording-advanced'
  },
  {
    id: 'd3-020',
    domain: 3,
    topic: '高さ収音',
    prompt: 'immersive制作で高さ情報を独立して収音する方法として最も適切なものはどれですか。',
    choices: [
      'ear-levelのmain array全体を高くするだけで、必ず上下情報を分離できる',
      '既存のmain signalを複製してupper channelへ同levelで送ればよい',
      '天井反射を含むすべての音をLFEだけへ記録する',
      'ear-levelのmainに独立したheight／overhead mic layerを加え、相関・到達時間・downmixも確認する'
    ],
    correctIndex: 3,
    explanation: '高さ情報を分離するにはear-levelのmainとは別のheight／overhead mic layerを記録します。mainを単に高くするだけではdirect／reverberant比が変わるだけで、独立した上下情報にならない場合があります。',
    lesson: '/exam/04-recording-advanced'
  },
  {
    id: 'd3-021',
    domain: 3,
    topic: 'mixdown',
    prompt: 'mixdownの中心的な仕事はどれですか。',
    choices: [
      'multitrackのlevel、pan、音色、空間を最終channel構成へまとめる',
      '完成した複数曲の曲順、曲間、format、metadataを最終化する',
      '録音前に各楽器のmic位置とpreamp gainを決定する',
      'roomの遮音構造と空調経路を設計する'
    ],
    correctIndex: 0,
    explanation: 'mixdownではtrack間の関係と曲の展開を作り、stereoやsurround等の納品構成へまとめます。masteringは完成mixを作品全体・媒体・QCの視点で扱います。',
    lesson: '/exam/04-recording-advanced'
  },
  {
    id: 'd3-022',
    domain: 3,
    topic: 'mastering',
    prompt: 'masteringで行う判断として最も適切なものはどれですか。',
    choices: [
      '各録音trackのmic位置と演奏takeをsession中に決定する',
      '完成mix間のtonal balance、level、format、metadata、QCを整える',
      'multitrackの各楽器を最初からpanし、個別effectを作り込む',
      '音楽性や媒体を問わず、すべての曲を同じLUFSへ合わせる'
    ],
    correctIndex: 1,
    explanation: 'masteringは完成mixを別視点で評価し、作品全体と納品媒体を整える工程です。固定loudness値へ無条件に合わせるのではなく、音楽性と仕様の両方を確認します。',
    lesson: '/exam/04-recording-advanced'
  },
  {
    id: 'd3-023',
    domain: 3,
    topic: 'live 2mix',
    prompt: 'live会場でFOH consoleのstereo 2mixだけを録音すると、acoustic drumが録音上小さくなる場合があるのはなぜですか。',
    choices: [
      'drumはdigital録音できないから',
      'FOHは必ずdrum channelをmuteする規則だから',
      '客席へ直接届くdrum音が大きく、PA mixではあまり足されない場合があるから',
      'stereo fileには低音を記録できないから'
    ],
    correctIndex: 2,
    explanation: 'FOH mixは会場内のdirect soundを含めて客席balanceを作ります。console 2mixだけには会場の生音が十分入らないため、room micやmultitrackを併用します。',
    lesson: '/exam/04-recording-advanced'
  },
  {
    id: 'd3-024',
    domain: 3,
    topic: 'live冗長性',
    prompt: '一度しかないlive録音の事故riskを下げる方法として最も適切なものはどれですか。',
    choices: [
      '本番中だけstorage残量を初めて確認する',
      '一台のcomputerだけに全記録を任せる',
      '終演直前にrecordを開始する',
      'multitrackとは別系統の2mix recorderも回し、事前に再生確認する'
    ],
    correctIndex: 3,
    explanation: '独立性のあるbackup recorderはcomputer、DAW、multitrack routingの故障時に最低限の記録を残せます。電源や入力まで同じ単一点故障になっていないかも確認します。',
    lesson: '/exam/04-recording-advanced'
  },
  {
    id: 'd3-025',
    domain: 3,
    topic: 'timecode',
    prompt: 'timecodeが主に示すものはどれですか。',
    choices: [
      '作品timeline上の時・分・秒・frame位置',
      'digital audioのsampleを刻む周期',
      'video機器がframeを切り替える同期位相',
      'session開始からのsample数だけで表すsample address'
    ],
    correctIndex: 0,
    explanation: 'timecodeは「今どの位置か」を表します。sample周期をそろえるword clock、video frame周期をそろえるgenlockとは別の役割です。',
    lesson: '/exam/04-recording-advanced'
  },
  {
    id: 'd3-026',
    domain: 3,
    topic: 'word clock',
    prompt: 'digital audioのword clockが担う役割はどれですか。',
    choices: [
      '作品timeline上の時・分・秒・frame位置を機器間でそろえる',
      'audio sampleを取得・再生する時間間隔を機器間でそろえる',
      '複数video機器がframeを切り替える位相だけをそろえる',
      '異なるsample rateのaudioを自動的に同じrateへ変換する'
    ],
    correctIndex: 1,
    explanation: 'word clockはsample timingの基準です。機器間でclock masterが曖昧だったりrateが異なったりすると、click、dropout、長時間drift等の原因になります。',
    lesson: '/exam/04-recording-advanced'
  },
  {
    id: 'd3-027',
    domain: 3,
    topic: 'genlock',
    prompt: 'video reference／genlockの中心的な役割はどれですか。',
    choices: [
      'digital audioのsample取得周期を機器間でそろえる',
      'timeline上の時・分・秒・frame番号だけを伝える',
      '複数のvideo機器がframeを切り替える時間基準をそろえる',
      '異なるframe rateの映像を自動的に同じ速度へ変換する'
    ],
    correctIndex: 2,
    explanation: 'genlockはcamera、switcher、video recorder等のframe timingをそろえます。timecodeが同じ数字でも、genlockやsample clockが独立なら同期精度は別問題です。',
    lesson: '/exam/04-recording-advanced'
  },
  {
    id: 'd3-028',
    domain: 3,
    topic: 'drop-frame',
    prompt: '29.97 fpsのdrop-frame timecodeについて正しい説明はどれですか。',
    choices: [
      '一定間隔で映像frameそのものを削除する',
      '音声sampleを毎分削除する',
      '再生速度を29.97倍にする',
      '実時間との表示差を抑えるため、規則に従い一部のframe番号を飛ばす'
    ],
    correctIndex: 3,
    explanation: 'drop-frameはtimecodeの番号付けを調整する方式で、映像frameを捨てる方式ではありません。projectではframe rateとDF/NDFの両方を確認します。',
    lesson: '/exam/04-recording-advanced'
  },
  {
    id: 'd3-029',
    domain: 3,
    topic: '同期drift',
    prompt: '映像と音声が冒頭では合うのに、1時間後だけ徐々にずれています。最初に疑うべきものはどれですか。',
    choices: [
      'sample clock／frame rate設定や機器のclock同期',
      '全編で一定量だけずれるtimecode start offset',
      '5.1からstereoへのdownmix係数',
      'monitor画面だけに生じる一定の表示latency'
    ],
    correctIndex: 0,
    explanation: '開始位置だけのoffsetなら全編同じ量ずれますが、時間とともに増えるずれはrateやclockの不一致を疑います。末尾でも同期を確認する理由です。',
    lesson: '/exam/04-recording-advanced'
  },
  {
    id: 'd3-030',
    domain: 3,
    topic: 'LTC',
    prompt: 'LTCの説明として最も適切なものはどれですか。',
    choices: [
      'video frameの切替位相をそろえるreference信号である',
      'timecode情報をaudioのような連続波形として伝える方式である',
      'audio sample周期をそろえるword clockそのものである',
      'timecodeをMIDI messageとして断続的に伝える方式である'
    ],
    correctIndex: 1,
    explanation: 'LTCはLongitudinal Time Codeで、timecode dataを連続波形として運びます。通常のmonitorへ誤送出すると大きなnoiseになるためroutingを管理します。',
    lesson: '/exam/04-recording-advanced'
  },
  {
    id: 'd3-031',
    domain: 3,
    topic: '5.1 channel',
    prompt: '標準的な5.1のchannel構成はどれですか。',
    choices: [
      'L、R、LFEだけ',
      'L、C、R、Topだけ',
      'L、R、C、Ls、Rs、LFE',
      '22 main channelsと2 LFE'
    ],
    correctIndex: 2,
    explanation: '5.1は前方L/R/C、surround Ls/Rs、低域効果LFEの6信号です。fileのchannel順はformatで異なるため納品仕様を確認します。',
    lesson: '/exam/04-recording-advanced'
  },
  {
    id: 'd3-032',
    domain: 3,
    topic: 'LFEとbass management',
    prompt: 'LFEとbass managementの関係として正しいものはどれですか。',
    choices: [
      'LFEには全主channelの低域が必ず最初から含まれる',
      'bass managementは制作側がdialogueをCへ送る処理である',
      '両者はまったく同じ名前の同じsignalである',
      'LFEは制作上の効果channel、bass managementは再生側の低域振分けである'
    ],
    correctIndex: 3,
    explanation: '主channelは本来full-rangeで、LFEは追加の低域効果channelです。bass managementは小型speaker等の再生能力に応じ、主channel低域をsubwooferへ振り分けます。',
    lesson: '/exam/04-recording-advanced'
  },
  {
    id: 'd3-033',
    domain: 3,
    topic: '5.1 speaker配置',
    prompt: 'ITU-Rの5.1基準配置の出発点として、前方L/Rの角度に最も近いものはどれですか。',
    choices: ['Cを0°として約±30°', 'Cを0°として約±10°', 'Cを0°として約±60°', 'Cを0°として約±110°'],
    correctIndex: 0,
    explanation: '基準配置では聴取位置から等距離を基本とし、L/RはCの方向からおよそ±30°です。surroundはおよそ±100〜120°の範囲が基準になります。',
    lesson: '/exam/04-recording-advanced'
  },
  {
    id: 'd3-034',
    domain: 3,
    topic: 'downmix',
    prompt: '5.1 mixをstereo downmixする前に確認すべきこととして最も適切なものはどれですか。',
    choices: [
      '納品先が違っても、常に同じdownmix係数だけを使う',
      '係数、phase、dialogue level、peak、surround内容の折り畳みを確認する',
      'LFEを左右へ無条件に同levelで全部足す',
      'Cを常に除外し、phantom centerへ置き換えたものとみなす'
    ],
    correctIndex: 1,
    explanation: 'downmixは複数channelを係数付きで組み合わせるため、相関成分のlevel増加やcancel、dialogue、peakが変わります。納品仕様の係数で実際に試聴します。',
    lesson: '/exam/04-recording-advanced'
  },
  {
    id: 'd3-035',
    domain: 3,
    topic: '22.2 channel',
    prompt: '22.2 multichannel soundの名称の内訳はどれですか。',
    choices: [
      '22本のLFEと2本のdialogue',
      '合計22本で、そのうち2本がLFE',
      '22本の主channelと2本のLFE',
      '5.1を22回downmixしたもの'
    ],
    correctIndex: 2,
    explanation: '22.2は22本の主channelに2本のLFEを加えた合計24 channelsです。上下方向を含む三層で三次元音場を表現します。',
    lesson: '/exam/04-recording-advanced'
  },
  {
    id: 'd3-036',
    domain: 3,
    topic: '22.2 layer',
    prompt: '22.2の主channelの層別構成として正しいものはどれですか。',
    choices: [
      '上層22、他はLFEのみ',
      '中層5、下層1だけ',
      '左右2層だけで高さchannelはない',
      'upper 9、middle 10、lower 3に、LFE 2を加える'
    ],
    correctIndex: 3,
    explanation: '22本の主channelはupper 9、middle 10、lower 3に分かれ、さらにLFEが2本あります。高さ方向を含むことが5.1との大きな違いです。',
    lesson: '/exam/04-recording-advanced'
  },
  {
    id: 'd3-037',
    domain: 3,
    topic: 'channel-based audio',
    prompt: 'channel-based制作の説明として最も適切なものはどれですか。',
    choices: [
      '各再生speaker channelへ対応する信号を制作・納品する',
      '音声objectと位置・動きのmetadataをrendererへ渡す',
      '基準点周りのsound fieldを成分として表し、再生側でdecodeする',
      '再生speaker数に関係なく、個々の音源位置だけを座標で納品する'
    ],
    correctIndex: 0,
    explanation: '5.1や22.2のようなchannel-based方式は、規定されたspeaker channelへ音を割り当てます。再生側のmappingとchannel orderの確認が重要です。',
    lesson: '/exam/04-recording-advanced'
  },
  {
    id: 'd3-038',
    domain: 3,
    topic: 'object-based audio',
    prompt: 'object-based audioの特徴として最も適切なものはどれですか。',
    choices: [
      'すべての音を固定L/Rへ焼き込み、metadataを持たない',
      '音声objectと位置・動き等のmetadataをrendererへ渡す',
      '規定された各speaker channelへ完成信号を直接割り当てる',
      '基準点周りのsound field全体を成分だけで表現する'
    ],
    correctIndex: 1,
    explanation: 'object-basedではaudio essenceと位置等のmetadataを組み合わせ、rendererが実際の再生layoutへ割り当てます。metadataの欠落やversion違いもQC対象です。',
    lesson: '/exam/04-recording-advanced'
  },
  {
    id: 'd3-039',
    domain: 3,
    topic: 'scene-based audio',
    prompt: 'scene-based audioの基本的な考え方として最も適切なものはどれですか。',
    choices: [
      '規定された各speaker channelへ完成信号を直接割り当てる',
      '音源ごとに独立した位置・動きmetadataだけを持たせる',
      'ある点を中心とした音場全体を成分として表し、再生側でdecodeする',
      'stereoのL/R信号へ高さchannelをそのまま加算する'
    ],
    correctIndex: 2,
    explanation: 'scene-basedは個々のspeakerやobjectだけでなく、基準点周りのsound fieldを成分として表現します。再生layoutに応じたdecodeが必要です。',
    lesson: '/exam/04-recording-advanced'
  },
  {
    id: 'd3-040',
    domain: 3,
    topic: 'live signal split',
    prompt: 'liveでFOHと録音が同じpreamp gainを共有します。最も重要な運用はどれですか。',
    choices: [
      'FOH側は共有analog gainを自由に変え、録音側はdigital trimだけで必ず元へ戻せると考える',
      '録音側だけで共有gainを決め、FOHへの影響は本番後に報告する',
      'S/Nを優先して最大peakを0 dBFS直前へ合わせ、headroomをほぼ残さない',
      '誰がgain変更権限を持つか決め、headroomと連絡方法を共有する'
    ],
    correctIndex: 3,
    explanation: '共有gainの変更はFOHとrecordingの両方へ影響します。責任者、連絡、最大level、digital trimの使い分けを事前に決めることで事故を防ぎます。',
    lesson: '/exam/04-recording-advanced'
  },
  {
    id: 'd4-001',
    domain: 4,
    topic: '音名',
    prompt: 'ドイツ音名のHとBの関係として正しいものはどれですか。',
    choices: [
      'Hは英語のB natural、Bは英語のB-flatを表す',
      'Hは英語のB-flat、Bは英語のB naturalを表す',
      'HもBも必ず同じB naturalを表す',
      'Hは英語のC natural、Bは英語のB-flatを表す'
    ],
    correctIndex: 0,
    explanation: 'ドイツ音名では原則としてHがB natural、BがB-flatです。英語式のBと混同しやすいため、scoreやsessionで使う命名法を先に確認します。',
    lesson: '/exam/05-music-theory-instruments'
  },
  {
    id: 'd4-002',
    domain: 4,
    topic: '音部記号',
    prompt: 'violaが主に使い、中央の線をC4として読む音部記号はどれですか。',
    choices: ['treble clef', 'alto clef', 'bass clef', 'percussion clef'],
    correctIndex: 1,
    explanation: 'alto clefは五線の中央、第3線をC4とします。violaで代表的に使われます。tenor clefもC clefですが、C4の位置は第4線です。',
    lesson: '/exam/05-music-theory-instruments'
  },
  {
    id: 'd4-003',
    domain: 4,
    topic: 'tieとslur',
    prompt: 'tieとslurの違いとして最も適切なものはどれですか。',
    choices: [
      'tieは異なる音、slurは同じ音だけをつなぐ',
      'tieはphraseのarticulationだけを示し、slurは同音の音価を合計する',
      'tieは同じ高さの音価を合計し、slurはphraseを滑らかにつなぐ',
      'tieもslurも複数音をまとめるが、どちらも音価やarticulationには影響しない'
    ],
    correctIndex: 2,
    explanation: 'tieで結ばれた同音は一続きに保持し、長さを合計します。slurは複数音のarticulationをまとめますが、各音の音価はそのままです。',
    lesson: '/exam/05-music-theory-instruments'
  },
  {
    id: 'd4-004',
    domain: 4,
    topic: 'compound meter',
    prompt: '6/8拍子をcompound duple meterとして感じる場合、主な拍のまとまりはどれですか。',
    choices: [
      '4分音符を基準とする6拍',
      '全音符を基準とする1拍',
      '8分音符2個ずつの3拍',
      '8分音符3個ずつの2拍'
    ],
    correctIndex: 3,
    explanation: '6/8は通常、8分音符3個を一まとまりとする2拍で感じます。tempo表示が付点4分音符か8分音符かでclickの設定と数え方が変わります。',
    lesson: '/exam/05-music-theory-instruments'
  },
  {
    id: 'd4-005',
    domain: 4,
    topic: 'tempo計算',
    prompt: '4分音符=120 BPMの時、4分音符1個の長さはどれですか。',
    choices: ['500 ms', '120 ms', '1,000 ms', '2,000 ms'],
    correctIndex: 0,
    explanation: '4分音符のmsは60,000÷BPMなので、60,000÷120=500 msです。48 kHzでは24,000 samplesに相当します。',
    lesson: '/exam/05-music-theory-instruments'
  },
  {
    id: 'd4-006',
    domain: 4,
    topic: '付点音符',
    prompt: '4分音符=120 BPMの時、付点8分音符1個の長さはどれですか。',
    choices: ['250 ms', '375 ms', '500 ms', '750 ms'],
    correctIndex: 1,
    explanation: '120 BPMの4分音符は500 ms、8分音符は250 msです。付点は元の1.5倍なので250×1.5=375 msです。',
    lesson: '/exam/05-music-theory-instruments'
  },
  {
    id: 'd4-007',
    domain: 4,
    topic: '進行記号',
    prompt: 'D.S.（Dal Segno）の指示はどれですか。',
    choices: [
      'Coda記号の位置へ進む',
      '曲頭へ戻る',
      'segno記号の位置へ戻る',
      'Fineの位置で必ず反復を始める'
    ],
    correctIndex: 2,
    explanation: 'D.S.はsegnoへ戻る指示です。曲頭へ戻るD.C.、終止を示すFine、終結部へ移るCodaと区別します。',
    lesson: '/exam/05-music-theory-instruments'
  },
  {
    id: 'd4-008',
    domain: 4,
    topic: 'fermata',
    prompt: 'fermataの解釈として最も適切なものはどれですか。',
    choices: [
      'fermata以降のBPMを必ず半分に変更する',
      '必ず記譜音価の2倍だけ伸ばす',
      '直前のrepeat記号まで戻って演奏を繰り返す',
      '音や休符を延ばすが、具体的な長さは演奏上の判断を含む'
    ],
    correctIndex: 3,
    explanation: 'fermataは記譜された音・休符を延長しますが「必ず2倍」という固定値ではありません。conductorやproducerと長さ・releaseを共有します。',
    lesson: '/exam/05-music-theory-instruments'
  },
  {
    id: 'd4-009',
    domain: 4,
    topic: '音程',
    prompt: 'CからGまでの上行音程は何ですか。',
    choices: ['perfect 5th（完全5度）', 'major 3rd（長3度）', 'minor 6th（短6度）', 'perfect octave（完全8度）'],
    correctIndex: 0,
    explanation: 'CからGは音名をC-D-E-F-Gと数えて5度、半音7個なのでperfect 5thです。半音数だけでなく音名の綴りも音程名を決めます。',
    lesson: '/exam/05-music-theory-instruments'
  },
  {
    id: 'd4-010',
    domain: 4,
    topic: 'triad',
    prompt: 'C minor triadの構成音はどれですか。',
    choices: ['C–E–G', 'C–E♭–G', 'C–F–G', 'C–E–G♯'],
    correctIndex: 1,
    explanation: 'minor triadはrootから0、3、7半音です。C minorはC–E♭–G、C majorはC–E–Gです。',
    lesson: '/exam/05-music-theory-instruments'
  },
  {
    id: 'd4-011',
    domain: 4,
    topic: 'pitch周波数',
    prompt: 'A4=440 Hzとする時、A5の周波数はどれですか。',
    choices: ['220 Hz', '440 Hz', '880 Hz', '1,320 Hz'],
    correctIndex: 2,
    explanation: '1 octave上は周波数が2倍になるため、A5は880 Hzです。1 octave下のA3は220 Hzです。',
    lesson: '/exam/05-music-theory-instruments'
  },
  {
    id: 'd4-012',
    domain: 4,
    topic: '移調楽器',
    prompt: 'B♭clarinetが記譜上のCを演奏した時の実音は、一般にどれですか。',
    choices: ['Cより長2度上のD', '同じC', 'Cより完全5度下のF', 'Cより長2度下のB♭'],
    correctIndex: 3,
    explanation: 'B♭clarinetは記譜音より長2度低く響きます。実音Cを鳴らすには記譜Dを演奏します。octave番号は音域に応じて確認します。',
    lesson: '/exam/05-music-theory-instruments'
  },
  {
    id: 'd4-013',
    domain: 4,
    topic: '弦楽器',
    prompt: 'violaの最低開放弦と主な音部記号の組合せはどれですか。',
    choices: ['C3・alto clef', 'G3・treble clefだけ', 'E1・bass clefだけ', 'B♭1・tenor clefだけ'],
    correctIndex: 0,
    explanation: 'violaの開放弦は低い方からC3、G3、D4、A4で、主にalto clefを使います。高域でtreble clefを使う場合もあります。',
    lesson: '/exam/05-music-theory-instruments'
  },
  {
    id: 'd4-014',
    domain: 4,
    topic: '木管の発音',
    prompt: 'single reedとdouble reedの代表的な組合せはどれですか。',
    choices: [
      'single: oboe、double: clarinet',
      'single: clarinet、double: oboe',
      'single: bassoon、double: saxophone',
      'single: flute、double: horn'
    ],
    correctIndex: 1,
    explanation: 'clarinetとsaxophoneはsingle reed、oboeとbassoonはdouble reedです。fluteはairをedgeへ当てるair-reed／edge-tone系です。',
    lesson: '/exam/05-music-theory-instruments'
  },
  {
    id: 'd4-015',
    domain: 4,
    topic: 'octave移調',
    prompt: '一般的なdouble bass譜の記譜音と実音の関係はどれですか。',
    choices: [
      '実音は記譜より半音上',
      '実音は記譜より完全5度上',
      '実音は記譜より1 octave下',
      '実音は常に記譜と同じoctave'
    ],
    correctIndex: 2,
    explanation: 'double bassは譜面の読みやすさのため、一般に実音より1 octave高く記譜されます。guitarも通常、記譜より1 octave下に響きます。',
    lesson: '/exam/05-music-theory-instruments'
  },
  {
    id: 'd4-016',
    domain: 4,
    topic: 'dynamic',
    prompt: 'crescendoとsforzandoの時間的な違いとして最も適切なものはどれですか。',
    choices: [
      'どちらも必ず次第に弱くする',
      'crescendoは一音だけを急に強調し、sforzandoは次第に強くする',
      'crescendoは次第に速くし、sforzandoは特定音を長く保持する',
      'crescendoは次第に強くし、sforzandoは特定音を急に強調する'
    ],
    correctIndex: 3,
    explanation: 'crescendoは一定区間で強さを増やす変化、sforzandoはその音の急なaccentです。録音gainは最弱部だけでなく、最大dynamicでも確認します。',
    lesson: '/exam/05-music-theory-instruments'
  },
  {
    id: 'd4-017',
    domain: 4,
    topic: '音楽の権利層',
    prompt: '他人の曲を自分のbandで新規録音した時の権利関係として最も適切なものはどれですか。',
    choices: [
      '元の曲の権利、新しい実演、新しいrecordingを別々に検討する',
      '新しいmasterを作れば、元の曲の利用については確認しなくてよい',
      '元の曲だけを確認すれば、新しい実演やmasterの扱いは検討不要である',
      'DAWを操作したengineerが、元の曲と実演を含む全権利を自動取得する'
    ],
    correctIndex: 0,
    explanation: 'composition／lyrics、performers、new masterは別レイヤーです。元の市販masterを使わなくても、元の曲を配信・編曲等する手続は利用方法に応じて確認します。',
    lesson: '/exam/06-copyright-history-staff'
  },
  {
    id: 'd4-018',
    domain: 4,
    topic: '著作者人格権',
    prompt: '著作者人格権について正しい説明はどれですか。',
    choices: [
      '著作権（財産権）と一緒に契約で自由に譲渡できる',
      '著作者に専属し、原則として譲渡できない',
      '著作物が一度公表されると、三つの人格権はすべて消滅する',
      '複製権と公衆送信権だけをまとめた財産上の権利である'
    ],
    correctIndex: 1,
    explanation: '著作者人格権は公表権、氏名表示権、同一性保持権からなり、著作者の精神的利益を守る一身専属の権利です。財産権の著作権とは異なり譲渡できません。',
    lesson: '/exam/06-copyright-history-staff'
  },
  {
    id: 'd4-019',
    domain: 4,
    topic: '著作隣接権',
    prompt: '日本で著作隣接権の主体となる四者の組合せはどれですか。',
    choices: [
      '著作者、実演家、レコード製作者、放送事業者',
      '実演家、作曲者、レコード製作者、有線放送事業者',
      '実演家、レコード製作者、放送事業者、有線放送事業者',
      '実演家、レコード製作者、映画製作者、放送事業者'
    ],
    correctIndex: 2,
    explanation: '著作隣接権は、実演家、レコード製作者、放送事業者、有線放送事業者に認められます。著作者の権利は隣接権ではなく著作者の権利です。',
    lesson: '/exam/06-copyright-history-staff'
  },
  {
    id: 'd4-020',
    domain: 4,
    topic: '著作権の保護期間',
    prompt: '個人の著作者が2024年中に死亡した場合、その著作権（財産権）は原則としていつまで保護されますか。',
    choices: ['2074年末', '2093年末', '2095年末', '2094年末'],
    correctIndex: 3,
    explanation: '死亡年の翌2025年1月1日から70年を数えるため、原則は2094年12月31日までです。旧法、外国作品等の例外は個別確認が必要です。',
    lesson: '/exam/06-copyright-history-staff'
  },
  {
    id: 'd4-021',
    domain: 4,
    topic: 'レコードの保護期間',
    prompt: '2020年に初めて固定され、同じ2020年に発行されたrecordingのレコード製作者の財産権は、原則いつまでですか。',
    choices: ['2090年12月31日', '2070年12月31日', '2089年12月31日', 'recordingの著作者が死亡して70年後'],
    correctIndex: 0,
    explanation: '発行年の翌2021年1月1日から70年を数え、原則2090年末までです。期間内に発行されなかったrecordingは固定後70年という原則になります。',
    lesson: '/exam/06-copyright-history-staff'
  },
  {
    id: 'd4-022',
    domain: 4,
    topic: '放送の保護期間',
    prompt: '2020年に行われた放送の放送事業者の財産権は、原則いつまでですか。',
    choices: ['2090年末', '2070年末', '2069年末', '2071年末'],
    correctIndex: 1,
    explanation: '放送の隣接権は放送後50年で、翌2021年から数えるため2070年12月31日までが原則です。実演・レコードの70年と混同しないようにします。',
    lesson: '/exam/06-copyright-history-staff'
  },
  {
    id: 'd4-023',
    domain: 4,
    topic: 'public domainとmaster',
    prompt: '作曲者側の保護期間が満了した曲について、2025年発売の他人のrecordingをsampleする判断として正しいものはどれですか。',
    choices: [
      '曲が古ければ2025年のmasterも自動的に自由である',
      '1秒未満なら法律上必ず無許諾でよい',
      '曲の著作権と、実演・recordingの隣接権を別に確認する',
      'pitchを変えれば権利は必ず消える'
    ],
    correctIndex: 2,
    explanation: 'compositionがpublic domainでも、新しいperformanceとmasterは別に保護され得ます。sampleの長さや加工だけで一律に自由になる秒数ruleはありません。',
    lesson: '/exam/06-copyright-history-staff'
  },
  {
    id: 'd4-024',
    domain: 4,
    topic: '非営利・無料の演奏',
    prompt: '公表済み楽曲の非営利・無料の演奏に関する権利制限の条件として、最も適切な組合せはどれですか。',
    choices: [
      '非営利で出演者へ報酬を払わないが、観客から入場料を取る',
      '非営利で観客から料金を取らないが、出演者へ通常の報酬を払う',
      '三条件を満たせば、その演奏の録音配信やCD販売も当然に自由になる',
      '非営利、観客から料金なし、出演者等への報酬なし'
    ],
    correctIndex: 3,
    explanation: '第38条の非営利・無料上演等は複数条件を満たす必要があります。演奏が対象でも、そのrecordingの複製・配布やinternet配信まで一括して自由にする規定ではありません。',
    lesson: '/exam/06-copyright-history-staff'
  },
  {
    id: 'd4-025',
    domain: 4,
    topic: '私的使用',
    prompt: '私的使用のための複製について正しい説明はどれですか。',
    choices: [
      '家庭内など限られた範囲で、仕事以外に本人が使う複製が中心である',
      '少人数の職場内だけで使う業務用copyも、常に私的使用になる',
      '本人用に作ったcopyなら、後でSNSへ一般公開しても私的使用のままである',
      '違法配信と知りながら行うdownloadにも、常に私的使用が適用される'
    ],
    correctIndex: 0,
    explanation: '私的使用は家庭内等の限られた範囲と非業務目的が中心です。公衆へのupload、業務利用、違法配信を知った一定のdownload等には適用されない条件があります。',
    lesson: '/exam/06-copyright-history-staff'
  },
  {
    id: 'd4-026',
    domain: 4,
    topic: '映像同期の権利',
    prompt: '日本法と音楽businessにおける「同期権」の説明として最も適切なものはどれですか。',
    choices: [
      '著作権法にその名前の単独権利だけが定められている',
      '映像へ音楽を合わせるbusiness用語で、実際の利用行為ごとに複製・翻案・原盤等を確認する',
      '元の曲側から許諾を得れば、市販masterの利用条件は確認しなくてよい',
      '元のmaster側から許諾を得れば、曲の複製・編曲等は確認しなくてよい'
    ],
    correctIndex: 1,
    explanation: 'synchronizationは実務上の許諾名ですが、日本法の一個の権利名ではありません。映像への固定、編曲、配信、元master利用など企画の行為を分解します。',
    lesson: '/exam/06-copyright-history-staff'
  },
  {
    id: 'd4-027',
    domain: 4,
    topic: 'sample clearance',
    prompt: '市販recordingをsampleして配信する時、最初に確認すべき権利層はどれですか。',
    choices: [
      '元の曲の作詞・作曲側だけ',
      '元のmasterを製作した側だけ',
      '元の曲側と元のmaster・実演側',
      '元の実演家側だけ'
    ],
    correctIndex: 2,
    explanation: 'sampleは元のrecordingを使うため、composition／lyricsとmaster／performanceの両側を検討します。library素材でも商用、再配布、Content ID、credit条件をlicenseで確認します。',
    lesson: '/exam/06-copyright-history-staff'
  },
  {
    id: 'd4-028',
    domain: 4,
    topic: '著作者と実演家',
    prompt: '作曲はせず、他人の曲を歌唱したsingerについて最も適切な説明はどれですか。',
    choices: [
      '歌っただけで元の曲の作曲者になる',
      '実演家には財産権だけがあり、人格権に相当する権利は一切ない',
      '歌唱を録音すれば、必ずそのsingerだけがレコード製作者になる',
      '曲の著作者とは別に、その歌唱について実演家の権利が生じ得る'
    ],
    correctIndex: 3,
    explanation: '曲を創作した著作者と、曲を歌う実演家は別の主体です。実演家には氏名表示・同一性保持や録音・送信等に関する権利が認められます。',
    lesson: '/exam/06-copyright-history-staff'
  },
  {
    id: 'd4-029',
    domain: 4,
    topic: '録音史',
    prompt: '録音技術の大きな流れとして、古い順に正しいものはどれですか。',
    choices: [
      'cylinder → disc → magnetic tape → multitrack → DAW',
      'disc → cylinder → magnetic tape → multitrack → DAW',
      'cylinder → magnetic tape → disc → multitrack → DAW',
      'cylinder → disc → DAW → magnetic tape → multitrack'
    ],
    correctIndex: 0,
    explanation: '再生可能なcylinder、量産に適したdisc、編集可能なmagnetic tape、trackを分けるmultitrack、computer上のDAWという大きな流れで整理できます。技術は後世にも併存します。',
    lesson: '/exam/06-copyright-history-staff'
  },
  {
    id: 'd4-030',
    domain: 4,
    topic: 'disc記録方式',
    prompt: 'lateral recordingの説明として正しいものはどれですか。',
    choices: [
      '溝の深さ方向だけへ変化を刻む',
      'discの溝を左右方向へ変化させて記録する',
      'stereoの二成分を溝壁の±45°方向へ記録することだけを指す',
      'groove pitchだけを音声振幅に応じて変化させる'
    ],
    correctIndex: 1,
    explanation: 'lateralは横振動で、grooveを左右へ振ります。hill-and-dale／verticalは溝の深さ方向の変化です。Berlinerのdiscでは横振動が重要でした。',
    lesson: '/exam/06-copyright-history-staff'
  },
  {
    id: 'd4-031',
    domain: 4,
    topic: 'tape head',
    prompt: 'magnetic tape recorderの三つのheadと役割の組合せとして正しいものはどれですか。',
    choices: [
      'record=再生、reproduce=消去、erase=記録',
      'record=消去、reproduce=録音、erase=再生',
      'record=記録、reproduce=再生、erase=以前の磁化を消去',
      'record=記録、reproduce=以前の磁化を消去、erase=再生'
    ],
    correctIndex: 2,
    explanation: 'record headが磁化を記録し、reproduce／playback headが磁化変化を信号へ戻し、erase headが以前の記録を消去します。機種によりhead構成は異なります。',
    lesson: '/exam/06-copyright-history-staff'
  },
  {
    id: 'd4-032',
    domain: 4,
    topic: 'mastering engineer',
    prompt: 'mastering engineerの中心的な責任はどれですか。',
    choices: [
      'session中にmicを配置し、各演奏takeを録音するtracking工程を中心に担う',
      'artistと楽曲を発掘し、作品企画や制作陣を調整するA&R業務を中心に担う',
      'multitrackから各楽器のlevel、pan、effectを組み立てるmix工程だけを担う',
      '完成mixを作品全体・format・曲間・QCの視点で最終化する'
    ],
    correctIndex: 3,
    explanation: 'mastering engineerは個々のtrackより、承認済みmix、複数曲の統一、媒体仕様、metadata、書き出し後のQCを担当します。track問題は可能ならmixへ戻します。',
    lesson: '/exam/06-copyright-history-staff'
  },
  {
    id: 'd4-033',
    domain: 4,
    topic: 'プルト',
    prompt: 'orchestraの弦sectionで使う「1プルト」の基本的な数え方として最も適切なものはどれですか。',
    choices: [
      '通常、1台の譜面台を共有する2人の弦奏者を1組として数える',
      'violin、viola、cello、double bassを各1人ずつ集めた4人を数える',
      '人数にかかわらず、弦section全体を常に1組として数える',
      '弦sectionへ立てるspot microphoneの本数を数える'
    ],
    correctIndex: 0,
    explanation: 'プルト（Pult）は譜面台を基準にする数え方で、弦楽器では通常、同じ譜面台を共有する2人を1プルトと数えます。編成や現場で例外はありますが、楽器4種の組やmic本数を表す語ではありません。',
    lesson: '/exam/05-music-theory-instruments'
  },
  {
    id: 'd4-034',
    domain: 4,
    topic: 'counterpoint',
    prompt: '音楽におけるcounterpointの説明として最も適切なものはどれですか。',
    choices: [
      '一つの主旋律を和音的な伴奏が支えるhomophonyの書法',
      '独立性のある複数の旋律を、調和を保ちながら組み合わせる書法',
      '楽器の音域と人数だけを決めるorchestrationの手順',
      '完成mixの曲順と曲間を決めるmasteringの手順'
    ],
    correctIndex: 1,
    explanation: 'counterpoint（対位法）は、それぞれ旋律として独立して聞こえる複数の声部を、和声的な関係にも配慮して組み合わせる考え方です。homophonyでは主旋律に従属的な和声・伴奏が付き、全声部が同じrhythmで進むhomorhythmはその一形態です。',
    lesson: '/exam/05-music-theory-instruments'
  },
  {
    id: 'd4-035',
    domain: 4,
    topic: 'F hornの移調',
    prompt: '一般的なF hornが記譜上のCを演奏した時の実音はどれですか。',
    choices: ['記譜音より長2度低いB♭', '記譜音と同じC', '記譜音より完全5度低いF', '記譜音より1 octave低いC'],
    correctIndex: 2,
    explanation: 'F hornは一般に記譜音より完全5度低く響く移調楽器です。したがって記譜上のCは実音Fとなります。scoreと録音時のconcert pitchを取り違えないように確認します。',
    lesson: '/exam/05-music-theory-instruments'
  },
  {
    id: 'd4-036',
    domain: 4,
    topic: 'saxophoneの分類',
    prompt: 'saxophoneが木管楽器へ分類される理由として最も適切なものはどれですか。',
    choices: [
      '本体が金属なら、すべて木管楽器へ分類されるため',
      '二枚のreedを振動させるdouble-reed楽器であるため',
      '奏者の唇そのものを振動源とするlip-reed楽器であるため',
      '一枚のreedを振動させて発音するsingle-reed楽器であるため'
    ],
    correctIndex: 3,
    explanation: 'saxophoneは本体の材質ではなく、mouthpieceに付けた一枚のreedで発音する仕組みから木管楽器に分類されます。clarinetもsingle reedですが、管の形状などは異なります。',
    lesson: '/exam/05-music-theory-instruments'
  },
  {
    id: 'd4-037',
    domain: 4,
    topic: '実演家の権利',
    prompt: '既存曲を演奏したmusicianと、その曲の著作者の関係として正しいものはどれですか。',
    choices: [
      '演奏者には実演について著作隣接権が生じ得るが、演奏しただけで曲の著作者にはならない',
      '演奏者は演奏した時点で、元の作詞・作曲の著作権をすべて取得する',
      '著作隣接権は放送事業者だけの権利なので、演奏者には認められない',
      '実演を録音しても、実演家に関係する権利を検討する必要はない'
    ],
    correctIndex: 0,
    explanation: '曲を創作した著作者と、それを演奏・歌唱する実演家は別の権利主体です。演奏しただけで曲の著作者にはなりませんが、その実演には実演家の著作隣接権が生じ得ます。',
    lesson: '/exam/06-copyright-history-staff'
  },
  {
    id: 'd4-038',
    domain: 4,
    topic: '電気録音',
    prompt: '1920年代に普及した電気録音が、それ以前の機械式録音と異なる点はどれですか。',
    choices: [
      '音を直接hornへ集め、その振動だけでcutting stylusを動かした',
      'microphoneで電気信号へ変換し、増幅してrecording装置を駆動した',
      '磁気tapeへ複数trackを同時に記録することを必須とした',
      'computer上のDAWへdigital fileとして直接保存した'
    ],
    correctIndex: 1,
    explanation: '電気録音ではmicrophoneで音を電気信号へ変え、増幅器を通してcutting headなどを駆動します。機械式録音はhornから振動板・stylusへ機械的にenergyを伝えていました。',
    lesson: '/exam/06-copyright-history-staff'
  },
  {
    id: 'd4-039',
    domain: 4,
    topic: 'A&R',
    prompt: 'record labelのA&R担当者が担う仕事として最も適切なものはどれですか。',
    choices: [
      '完成mixの最終EQ、曲間、納品formatだけを決定する',
      'studio設備の電気保安点検と修理だけを担当する',
      'artistや楽曲を発掘し、作品企画と制作関係者を調整する',
      'session中のpatch、mic stand、録音file管理だけを担当する'
    ],
    correctIndex: 2,
    explanation: 'A&Rはartist and repertoireの略で、artistの発掘・契約支援、楽曲や作品方針の企画、producerなど制作関係者との調整を担います。役割の範囲は会社やprojectで異なります。',
    lesson: '/exam/06-copyright-history-staff'
  },
  {
    id: 'd4-040',
    domain: 4,
    topic: '引用',
    prompt: '公表済みの文章等を著作権者の許諾なく「引用」できる条件として、最も適切なものはどれですか。',
    choices: [
      '出所だけを表示すれば、必要性や分量に関係なく全文を転載できる',
      '非営利の学習目的なら、公開方法や利用範囲に関係なく転載できる',
      '引用部分を10秒以内または全体の10%以内にすれば、他の条件は不要である',
      '公正な慣行に合致し、目的上正当な範囲で引用し、出所も明示する'
    ],
    correctIndex: 3,
    explanation: '引用には公表済みの著作物であること、公正な慣行に合致すること、報道・批評・研究など引用目的上正当な範囲であること、出所明示などが必要です。固定の秒数・割合だけでは決まりません。',
    lesson: '/exam/06-copyright-history-staff'
  },
]
