import type { ExamQuestion } from './examQuestions'

// 全問、本サイト用に新規作成したオリジナル問題です。
// JAPRS公式問題・公式教材の問題文や選択肢は転載していません。
export const questionsDomain12: ExamQuestion[] = [
  {
    id: 'd1-001',
    domain: 1,
    topic: '音の客観量と主観量',
    prompt: '「客観的に測る量」と「人が知覚する性質」の組合せとして、最も適切なものはどれですか。',
    choices: [
      'loudnessは物理量であり、音圧は知覚上の性質である',
      'timbreは電圧計だけで一意に測定できる物理量である',
      '音圧levelが同じなら、周波数に関係なくloudnessも必ず同じである',
      '周波数は物理量であり、pitchは知覚上の性質である'
    ],
    correctIndex: 3,
    explanation: '周波数はHzで測る客観量、pitchは高さの知覚です。同様に音圧levelとloudnessも関連はしますが同一ではなく、周波数・時間・個人差などに左右されます。',
    lesson: '/exam/01-acoustics-hearing'
  },
  {
    id: 'd1-002',
    domain: 1,
    topic: '音波',
    prompt: '空気中を進む音波の基本的な説明として、最も適切なものはどれですか。',
    choices: [
      '空気粒子が音源からlistenerまで一方向へ運ばれ続ける横波である',
      '空気粒子の振動方向と波の進行方向が平行な縦波として扱える',
      '真空でも空気中と同じ速さで伝わる電磁波である',
      '周波数が変わっても空気粒子は常に同じ位置・同じ位相で動く'
    ],
    correctIndex: 1,
    explanation: '空気中の音は圧縮と膨張が進む縦波です。粒子は平衡位置の周りを振動し、粒子そのものが音源から耳まで運ばれ続けるわけではありません。真空では伝わりません。',
    lesson: '/exam/01-acoustics-hearing'
  },
  {
    id: 'd1-003',
    domain: 1,
    topic: '周期と周波数',
    prompt: '500 Hzの正弦波の周期として正しいものはどれですか。',
    choices: ['0.5 ms', '1 ms', '2 ms', '5 ms'],
    correctIndex: 2,
    explanation: '周期Tは1/fです。1/500 s = 0.002 s = 2 msとなります。HzをkHzへ、秒をmsへ直すときの1,000倍を取り違えないことが大切です。',
    lesson: '/exam/01-acoustics-hearing'
  },
  {
    id: 'd1-004',
    domain: 1,
    topic: '音速と波長',
    prompt: '音速を343 m/sとすると、100 Hzの音の波長に最も近いものはどれですか。',
    choices: ['0.29 m', '0.58 m', '1.72 m', '3.43 m'],
    correctIndex: 3,
    explanation: '波長λ = c/fなので、343/100 = 3.43 mです。低い周波数ほど波長が長く、small roomでも低域がroom dimensionと強く関係します。',
    lesson: '/exam/01-acoustics-hearing'
  },
  {
    id: 'd1-005',
    domain: 1,
    topic: 'octave',
    prompt: 'ある純音の1 octave上の周波数は、元の周波数の何倍ですか。',
    choices: ['2倍', '約1.5倍', '3倍', '12倍'],
    correctIndex: 0,
    explanation: '1 octaveは周波数比2:1です。440 Hzの1 octave上は880 Hz、1 octave下は220 Hzになります。12半音という個数と12倍を混同しないでください。',
    lesson: '/exam/01-acoustics-hearing'
  },
  {
    id: 'd1-006',
    domain: 1,
    topic: 'decibel',
    prompt: '同じ基準に対する音圧または電圧の振幅が2倍になりました。level差に最も近いものはどれですか。',
    choices: ['約+3 dB', '約+6 dB', '約+10 dB', '約+20 dB'],
    correctIndex: 1,
    explanation: '振幅比には20 log10を使います。20 log10(2) ≈ 6.02 dBです。電力が2倍の約+3 dBとは区別します。',
    lesson: '/exam/01-acoustics-hearing'
  },
  {
    id: 'd1-007',
    domain: 1,
    topic: 'decibel',
    prompt: '同一条件で電力が10倍になったときのlevel差はどれですか。',
    choices: ['+3 dB', '+6 dB', '+10 dB', '+20 dB'],
    correctIndex: 2,
    explanation: '電力比には10 log10を使うので、10 log10(10) = +10 dBです。振幅10倍なら20 log10(10) = +20 dBになります。',
    lesson: '/exam/01-acoustics-hearing'
  },
  {
    id: 'd1-008',
    domain: 1,
    topic: '音圧level',
    prompt: '空気中の音圧levelで、基準音圧20 µPaに対応する値はどれですか。',
    choices: ['-20 dB SPL', '-6 dB SPL', '20 dB SPL', '0 dB SPL'],
    correctIndex: 3,
    explanation: '基準と測定値が等しいと比は1で、20 log10(1) = 0です。したがって20 µPaは0 dB SPLです。0 dB SPLは「圧力が0」や「誰にも聞こえない」と同義ではありません。',
    lesson: '/exam/01-acoustics-hearing'
  },
  {
    id: 'd1-009',
    domain: 1,
    topic: 'levelの加算',
    prompt: '互いに相関のない70 dB SPLのnoise sourceを同じ位置で2つ同時に鳴らしました。理想的な合計levelに最も近いものはどれですか。',
    choices: ['73 dB SPL', '76 dB SPL', '140 dB SPL', '70.3 dB SPL'],
    correctIndex: 0,
    explanation: '相関のない等level sourceを2つ加えるとpowerが2倍になり、約+3 dBです。70+70を算術加算して140 dBにはしません。coherentな同一波形を同位相で加える条件とは別です。',
    lesson: '/exam/01-acoustics-hearing'
  },
  {
    id: 'd1-010',
    domain: 1,
    topic: '距離減衰',
    prompt: '自由音場の点音源から十分離れた位置で、距離を2 mから4 mへ増やしました。他条件が同じなら音圧levelは概ねどうなりますか。',
    choices: ['約3 dB上がる', '約6 dB下がる', '約12 dB下がる', '変わらない'],
    correctIndex: 1,
    explanation: '点音源の球面拡散では距離が2倍になると音圧は約1/2、levelは約-6 dBです。室内では反射音や近接条件のため、この理想則からずれます。',
    lesson: '/exam/01-acoustics-hearing'
  },
  {
    id: 'd1-011',
    domain: 1,
    topic: '周波数重み付け',
    prompt: '騒音測定のA-weightingについて、最も適切な説明はどれですか。',
    choices: [
      '全周波数を必ず同じ重みで測る',
      'digital full scaleを0とするpeak meterである',
      '人の聴感特性を近似するため、周波数ごとに重みを変える',
      '左右channelの位相差だけを測る'
    ],
    correctIndex: 2,
    explanation: 'A-weightingは周波数ごとの感度差を近似するweightingです。dBA値とflat/Z-weighted値は同じnoiseでも異なり得るため、測定条件を併記します。',
    lesson: '/exam/01-acoustics-hearing'
  },
  {
    id: 'd1-012',
    domain: 1,
    topic: '位相',
    prompt: '1 kHzの正弦波で0.25 msの時間差は、何度の位相差に相当しますか。',
    choices: ['45°', '180°', '360°', '90°'],
    correctIndex: 3,
    explanation: '1 kHzの周期は1 msです。0.25 msは1/4周期なので90°です。式では360×1,000×0.00025 = 90°となります。',
    lesson: '/exam/01-acoustics-hearing'
  },
  {
    id: 'd1-013',
    domain: 1,
    topic: '極性と位相',
    prompt: 'polarity reverse switchの動作として最も適切なものはどれですか。',
    choices: [
      '波形の正負を全帯域で一括反転する',
      'すべての周波数を一定時間だけ遅らせる',
      '低域だけを180°回転させ、高域は変えない',
      '左右channelをmonoへ加算する'
    ],
    correctIndex: 0,
    explanation: 'polarity reverseは波形の符号を一括反転します。一定時間delayは周波数ごとに異なる位相差を作るため、同じ現象ではありません。',
    lesson: '/exam/01-acoustics-hearing'
  },
  {
    id: 'd1-014',
    domain: 1,
    topic: '干渉',
    prompt: '同じ信号へ短いdelayを加えたcopyを混ぜたとき、周波数特性に周期的な山谷が生じました。この現象の名称はどれですか。',
    choices: ['Doppler effect', 'comb filtering', 'masking', 'quantization'],
    correctIndex: 1,
    explanation: '原音と遅延copyは、周波数ごとに加算・cancelの位相関係が変わり、櫛の歯のような山谷を作ります。複数micの距離差やdirect/software monitorの二重音でも起こります。',
    lesson: '/exam/01-acoustics-hearing'
  },
  {
    id: 'd1-015',
    domain: 1,
    topic: '吸音率',
    prompt: 'ある周波数で吸音率α = 0.75の面について、基礎モデルで最も適切な説明はどれですか。',
    choices: [
      '入射energyの75%を必ず隣室へ透過する',
      '入射音圧を75 dB下げる',
      '入射energyの約75%が反射せず吸収側へ回る',
      'すべての周波数で反射を完全にゼロにする'
    ],
    correctIndex: 2,
    explanation: '吸音率は入射energyに対して反射されなかった割合を表す基礎指標です。周波数依存であり、遮音性能やdB低下量そのものではありません。',
    lesson: '/exam/01-acoustics-hearing'
  },
  {
    id: 'd1-016',
    domain: 1,
    topic: '吸音と遮音',
    prompt: 'control roomから隣室への低音漏れを減らす目的に、最も直接関係する考え方はどれですか。',
    choices: [
      '室内の薄いfoamを増やせば、壁を通る低音も必ず同量減る',
      'diffuserだけで壁の透過損失を大きくする',
      'reverb pluginのdecay timeを短くする',
      '構造の質量・気密・振動絶縁と弱点経路を含む遮音を設計する'
    ],
    correctIndex: 3,
    explanation: '室内反射を減らす吸音と、別空間への伝達を減らす遮音は別課題です。低域漏れには構造、気密、開口、flanking path、振動絶縁を含む設計が必要です。',
    lesson: '/exam/01-acoustics-hearing'
  },
  {
    id: 'd1-017',
    domain: 1,
    topic: '室内mode',
    prompt: '音速343 m/s、長さ4.0 mの矩形室で、長さ方向の最低axial modeに最も近い周波数はどれですか。',
    choices: ['42.9 Hz', '85.8 Hz', '171.5 Hz', '343 Hz'],
    correctIndex: 0,
    explanation: '最低axial modeはf = c/(2L)なので343/(2×4) ≈ 42.9 Hzです。これはroomの一方向だけを使った理想計算で、実測では寸法・境界・開口等の影響があります。',
    lesson: '/exam/01-acoustics-hearing'
  },
  {
    id: 'd1-018',
    domain: 1,
    topic: '残響時間',
    prompt: 'RT60の定義として最も適切なものはどれですか。',
    choices: [
      '音源から壁まで60 m進む時間',
      '音源停止後、sound levelが60 dB減衰するまでの時間',
      '60 Hzの波が1周期進む時間',
      'direct soundがreflected soundより60 dB高くなる距離'
    ],
    correctIndex: 1,
    explanation: 'RT60は音源停止後にsound energy levelが60 dB減衰する時間の指標です。実測ではnoise floorの制約から、20 dBや30 dBの減衰を測って外挿する場合があります。',
    lesson: '/exam/01-acoustics-hearing'
  },
  {
    id: 'd1-019',
    domain: 1,
    topic: 'D50 / Deutlichkeit',
    prompt: '室内音響のD50（Deutlichkeit）が表すenergy比として、最も適切なものはどれですか。',
    choices: ['50 ms以後のenergy ÷ 最初の50 msまでのenergy', '送音室level ÷ 受音室level', '最初の50 msまでのenergy ÷ 全energy', '直接音の最大振幅 ÷ 室容積'],
    correctIndex: 2,
    explanation: 'D50は直接音到来から最初の50 msまでのenergyを全energyで割った明瞭度指標です。遮音で使う室間音圧level差のDとは別概念なので、文脈を確認します。',
    lesson: '/exam/07-studio-acoustics-design'
  },
  {
    id: 'd1-020',
    domain: 1,
    topic: 'flutter echo',
    prompt: '手を叩くと「ビリビリ」と規則的に細かい反射が続くflutter echoが起こりやすい条件はどれですか。',
    choices: [
      '吸音性の高い不平行面だけで囲まれている',
      '屋外の自由音場で反射面がない',
      '全壁が低域だけを完全吸音する',
      '平行で硬い反射面が向かい合っている'
    ],
    correctIndex: 3,
    explanation: '平行な硬い面の間を反射が往復すると、短い周期のecho列が生じやすくなります。吸音、拡散、面の角度、配置で往復反射を弱めます。',
    lesson: '/exam/01-acoustics-hearing'
  },
  {
    id: 'd1-021',
    domain: 1,
    topic: '聴覚器官',
    prompt: '空気振動が内耳へ伝わる順序として最も適切なものはどれですか。',
    choices: [
      '耳介・外耳道 → 鼓膜 → 耳小骨 → 蝸牛',
      '蝸牛 → 耳小骨 → 鼓膜 → 外耳道',
      '鼓膜 → 蝸牛 → 耳介 → 耳小骨',
      '耳小骨 → 耳介 → 蝸牛 → 鼓膜'
    ],
    correctIndex: 0,
    explanation: '外耳が音を集め、鼓膜の振動を中耳の耳小骨が内耳へ伝え、蝸牛内でmechanical vibrationが神経信号へ変換されます。',
    lesson: '/exam/01-acoustics-hearing'
  },
  {
    id: 'd1-022',
    domain: 1,
    topic: '蝸牛',
    prompt: '蝸牛のtonotopic organizationについて最も適切な説明はどれですか。',
    choices: [
      '左右の耳で音量を必ず同じにする機構',
      '周波数によって基底膜上の最大応答位置が異なる性質',
      '鼓膜が音色をdigital dataへ変換する仕組み',
      '耳介が低音だけを完全遮断する性質'
    ],
    correctIndex: 1,
    explanation: '蝸牛の基底膜は場所ごとに応答しやすい周波数が異なり、周波数分析の基礎になります。高域と低域で最大振動位置が分かれます。',
    lesson: '/exam/01-acoustics-hearing'
  },
  {
    id: 'd1-023',
    domain: 1,
    topic: '中耳',
    prompt: '中耳の耳小骨の主な役割として最も適切なものはどれですか。',
    choices: [
      'sound fileのsample rateを変換する',
      '左右耳間の時間差を作る',
      '鼓膜の振動を内耳の液体へ効率よく伝える',
      '有毛細胞を再生させる'
    ],
    correctIndex: 2,
    explanation: '耳小骨は空気中の鼓膜振動を内耳の液体へ伝えるimpedance matchingに寄与します。有毛細胞を再生する器官ではありません。',
    lesson: '/exam/01-acoustics-hearing'
  },
  {
    id: 'd1-024',
    domain: 1,
    topic: '聴覚保護',
    prompt: '長時間のband rehearsalで聴覚を守る行動として最も適切なものはどれですか。',
    choices: [
      '耳が痛くなるまでlevelを上げ、痛みが出たら1 dBだけ下げる',
      '高域だけEQで下げれば、overall levelは無制限でよい',
      '片耳だけearplugを外し、左右差を作る',
      '再生levelと曝露時間を管理し、休憩と適切なhearing protectionを使う'
    ],
    correctIndex: 3,
    explanation: '聴覚riskはlevelと時間の両方で増えます。痛みは安全限界を示す信頼できる警報ではありません。両耳を適切に保護し、休憩とmonitor配置も見直します。',
    lesson: '/exam/01-acoustics-hearing'
  },
  {
    id: 'd1-025',
    domain: 1,
    topic: '等loudness',
    prompt: '等loudness contourが示す内容として最も適切なものはどれですか。',
    choices: [
      '同じloudnessに知覚されるために必要な音圧levelが周波数で異なる',
      'すべての周波数は同じdB SPLなら必ず同じ大きさに聞こえる',
      '人の可聴域はsample rateだけで決まる',
      '左右speakerの距離差だけを周波数別に示す'
    ],
    correctIndex: 0,
    explanation: '耳の感度は周波数とlevelで変わります。同じloudnessへそろえるのに必要なdB SPLは周波数ごとに異なり、低い再生levelでは低域・高域の感じ方が特に変わります。',
    lesson: '/exam/01-acoustics-hearing'
  },
  {
    id: 'd1-026',
    domain: 1,
    topic: 'masking',
    prompt: 'mixでbass guitarをsoloにすると聞こえる小さなnoiseが、full mixではほとんど聞こえません。最も関係する現象はどれですか。',
    choices: ['Doppler shift', 'masking', 'aliasing', 'flutter'],
    correctIndex: 1,
    explanation: '別の強い音によって弱い音の聞こえが悪くなる現象がmaskingです。周波数・時間が近い成分ほど影響しやすい一方、soloで聞こえないからfull mixでも安全とは限りません。',
    lesson: '/exam/01-acoustics-hearing'
  },
  {
    id: 'd1-027',
    domain: 1,
    topic: 'critical band',
    prompt: '聴覚のcritical band／auditory filterの考え方として最も適切なものはどれですか。',
    choices: [
      '耳は20 Hz〜20 kHzを1つの帯域として区別せず処理する',
      'critical band幅は全周波数で必ず1 Hzである',
      '内耳は重なり合うband-pass filter群のように周波数を分析する',
      'critical bandはmicrophoneの指向性を表す'
    ],
    correctIndex: 2,
    explanation: '聴覚系は重なり合うauditory filter群として近似でき、近い周波数成分のmaskingやroughnessの理解に役立ちます。帯域幅は周波数により一定ではありません。',
    lesson: '/exam/01-acoustics-hearing'
  },
  {
    id: 'd1-028',
    domain: 1,
    topic: '聴感比較',
    prompt: 'EQ処理の前後を公平に比較するため、最も重要な手順はどれですか。',
    choices: [
      '処理後だけ大きく再生し、迫力を確認する',
      '毎回別の曲へ切り替える',
      '左右を逆にしてから比較する',
      'bypass前後のloudnessをできるだけそろえて比較する'
    ],
    correctIndex: 3,
    explanation: '人はわずかに大きい方を良いと判断しやすいため、level差が処理の質を隠します。level-matchし、短く切替え、目的の変化と副作用を分けて聴きます。',
    lesson: '/exam/01-acoustics-hearing'
  },
  {
    id: 'd1-029',
    domain: 1,
    topic: '両耳間時間差',
    prompt: '低〜中域の左右方向定位で重要な手掛かりとして、最も適切なものはどれですか。',
    choices: ['両耳間時間差（ITD）', 'bit depth差', '残響時間だけ', '左右のsample rate差'],
    correctIndex: 0,
    explanation: '低〜中域では、音が左右耳へ到達する時間・位相の差が水平方向定位の重要な手掛かりです。高域ではhead shadowによるlevel差も強く働きます。',
    lesson: '/exam/01-acoustics-hearing'
  },
  {
    id: 'd1-030',
    domain: 1,
    topic: '両耳間level差',
    prompt: '高域の左右方向定位で両耳間level差（ILD）が大きくなりやすい主な理由はどれですか。',
    choices: [
      '高域ほど必ずroomのRT60が長くなるから',
      '頭部が高域に対して音響的なshadowを作るから',
      '高域だけ鼓膜を通らず直接蝸牛へ入るから',
      '左右の耳で音速が異なるから'
    ],
    correctIndex: 1,
    explanation: '波長が頭部寸法に比べて短い高域では、頭が遮蔽物となり遠い耳のlevelが下がりやすくなります。これがILDの大きな要因です。',
    lesson: '/exam/01-acoustics-hearing'
  },
  {
    id: 'd1-031',
    domain: 1,
    topic: '耳介と定位',
    prompt: '上下方向や前後方向の定位に特に関係する手掛かりはどれですか。',
    choices: [
      '電源電圧の違い',
      '左右channelのbit depthの違い',
      '耳介・頭部・胴体による方向依存のspectrum変化',
      'sample file名の違い'
    ],
    correctIndex: 2,
    explanation: '耳介などによる方向依存のfilteringは、上下・前後を判断する重要な手掛かりです。HRTFはこれらを方向ごとの伝達特性として表します。',
    lesson: '/exam/01-acoustics-hearing'
  },
  {
    id: 'd1-032',
    domain: 1,
    topic: '先行音効果',
    prompt: 'direct soundの数ms後に似た反射音が届いたとき、別々の2音ではなく先に来た方向へまとまって定位しやすい現象はどれですか。',
    choices: ['beat', 'masking threshold shift', 'tape saturation', 'precedence effect'],
    correctIndex: 3,
    explanation: 'precedence effect／先行音効果では、短い遅れの反射を融合して知覚し、方向を先行音へ引かれやすくなります。delayが長くなると独立したechoとして聞こえます。',
    lesson: '/exam/01-acoustics-hearing'
  },
  {
    id: 'd1-033',
    domain: 1,
    topic: 'stereo phantom image',
    prompt: '左右speakerから同じ信号を同level・同時刻で再生したとき、通常できる音像はどれですか。',
    choices: ['左右speakerの中央付近のphantom center', '必ず真後ろ', '左speakerだけ', '上下に2つ'],
    correctIndex: 0,
    explanation: '左右耳へ届く手掛かりが対称なら、2本のspeakerの間にphantom centerが知覚されます。部屋・距離・speaker特性・hearing asymmetryでずれる場合があります。',
    lesson: '/exam/01-acoustics-hearing'
  },
  {
    id: 'd1-034',
    domain: 1,
    topic: '光fiberの分類',
    prompt: '光fiber接続で使うSC / LCとsimplex / duplexの分類として、最も適切なものはどれですか。',
    choices: ['SCはsingle-mode、LCはmultimodeだけを表す', 'SC / LCはconnector形状、simplex / duplexはfiberまたは光pathの系統数を表す', 'SC / LCはsample rate、simplex / duplexはbit depthを表す', 'simplex / duplexはferrule径、SC / LCは送受信方向だけを表す'],
    correctIndex: 1,
    explanation: 'SCとLCは光connectorのinterface形状で、simplexとduplexは1系統・2系統のfiberまたは光path構成です。single-mode / multimodeや伝送formatとも分けて確認します。',
    lesson: '/exam/03-studio-systems'
  },
  {
    id: 'd1-035',
    domain: 1,
    topic: '等価吸音面積',
    prompt: '面積18 m²、対象帯域の吸音率0.5の面が持つ等価吸音面積はどれですか。',
    choices: ['3.6 m² sabin', '6 m² sabin', '9 m² sabin', '36 m² sabin'],
    correctIndex: 2,
    explanation: '等価吸音面積は面積Sと吸音率αの積なので、18×0.5=9 m² sabinです。吸音率は周波数で変わるため、帯域ごとに計算します。',
    lesson: '/exam/07-studio-acoustics-design'
  },
  {
    id: 'd1-036',
    domain: 1,
    topic: 'Sabine式',
    prompt: '容積120 m³、等価吸音面積30 m² sabinの室で、Sabine式によるT60に最も近いものはどれですか。',
    choices: ['0.16 s', '0.32 s', '1.29 s', '0.64 s'],
    correctIndex: 3,
    explanation: 'T60≈0.161V/Aなので、0.161×120÷30≈0.644 sです。小室の低域や吸音が偏った室では、式だけでなく周波数別の測定も必要です。',
    lesson: '/exam/07-studio-acoustics-design'
  },
  {
    id: 'd1-037',
    domain: 1,
    topic: 'speaker帯域分割',
    prompt: 'passive dividing networkとactive channel dividerのsignal chain上の位置として、最も適切なものはどれですか。',
    choices: ['passiveはpower amp後、activeはpower amp前で帯域を分ける', 'どちらも必ずpower amp後だけで帯域を分ける', 'passiveはdigital file内、activeはmic capsule内だけで働く', 'activeはspeaker cableの芯線数を増やすだけで帯域を分けない'],
    correctIndex: 0,
    explanation: 'passive dividing networkはpower amp後のspeaker levelでdriverへ帯域分配し、active channel dividerはamp前のline levelまたはdigital領域で分けて帯域別ampへ送ります。',
    lesson: '/exam/03-studio-systems'
  },
  {
    id: 'd1-038',
    domain: 1,
    topic: 'flanking transmission',
    prompt: '高性能な間仕切り壁を施工したのに隣室への漏れが残りました。flanking transmissionを最もよく表す経路はどれですか。',
    choices: ['間仕切り試験体を正面から直接透過する経路だけ', '共通天井・床・duct・貫通部などを回り込む経路', '室内でdirect soundがmicへ届く最短経路', 'speaker内部のcrossoverを通る電気経路'],
    correctIndex: 1,
    explanation: 'flanking transmissionは目的の間仕切り以外の構造や開口を回り込む伝搬です。壁単体を強化しても、共通天井、床、duct、貫通部が弱ければ現場性能は制限されます。',
    lesson: '/exam/07-studio-acoustics-design'
  },
  {
    id: 'd1-039',
    domain: 1,
    topic: '空調noise',
    prompt: '必要換気量を保ちながらstudioの空調noiseを抑える計画として、最も適切なものはどれですか。',
    choices: ['duct断面を小さくして風速を上げる', '換気口を塞ぎ、室内空気だけを循環させる', '低風速、防振、silencer、圧力損失、保守性を一体で検討する', 'fanを収音micの近くに置き、EQで低域だけ切る'],
    correctIndex: 2,
    explanation: '低noise化は十分なduct断面、低風速、防振、silencer等を、必要風量と圧力損失を満たしながら設計します。冷暖房と外気換気も分けて確認します。',
    lesson: '/exam/07-studio-acoustics-design'
  },
  {
    id: 'd1-040',
    domain: 1,
    topic: '保護接地とhum',
    prompt: 'audio systemでhumが出た場合の調査方針として、最も適切なものはどれですか。',
    choices: ['保護接地を維持し、balanced配線・shield・routing・設備を安全に切り分ける', 'rackごとに保護接地を外し、音が消えればそのまま使う', 'すべてのshieldを一律に片側切断し、接続規格は確認しない', 'unbalanced変換を増やしてground経路を複雑にする'],
    correctIndex: 0,
    explanation: 'protective earthは故障時の安全に必要で、hum対策として切ってはいけません。signal shield、balanced接続、ground loop、電源設備を測定し、必要なら有資格者へ依頼します。',
    lesson: '/exam/07-studio-acoustics-design'
  },
  {
    id: 'd2-001',
    domain: 2,
    topic: 'オームの法則',
    prompt: '12 Vを3 kΩの抵抗へ加えたとき、流れる電流はどれですか。',
    choices: ['4 mA', '36 mA', '250 mA', '4 A'],
    correctIndex: 0,
    explanation: 'I = V/R = 12/3,000 = 0.004 A = 4 mAです。kΩのまま割るなら、V/kΩの結果がmAになる関係を使えます。',
    lesson: '/exam/02-electricity-circuits'
  },
  {
    id: 'd2-002',
    domain: 2,
    topic: '電力',
    prompt: '抵抗性のloadに10 Vがかかり、2 Aが流れています。消費電力はどれですか。',
    choices: ['5 W', '20 W', '100 W', '200 W'],
    correctIndex: 1,
    explanation: 'P = VIなので10×2 = 20 Wです。抵抗が5 ΩならP = I²R = 2²×5としても20 Wを確認できます。',
    lesson: '/exam/02-electricity-circuits'
  },
  {
    id: 'd2-003',
    domain: 2,
    topic: '直列抵抗',
    prompt: '2 kΩ、3 kΩ、5 kΩを直列に接続した合成抵抗はどれですか。',
    choices: ['0.97 kΩ', '5 kΩ', '10 kΩ', '30 kΩ'],
    correctIndex: 2,
    explanation: '直列では同じ電流が流れ、抵抗値を加算します。2+3+5 = 10 kΩです。30は値を掛けた誤りです。',
    lesson: '/exam/02-electricity-circuits'
  },
  {
    id: 'd2-004',
    domain: 2,
    topic: '並列抵抗',
    prompt: '6 kΩと3 kΩを並列に接続した合成抵抗はどれですか。',
    choices: ['9 kΩ', '4.5 kΩ', '3 kΩ', '2 kΩ'],
    correctIndex: 3,
    explanation: '2本の並列はR1R2/(R1+R2)なので、6×3/(6+3) = 2 kΩです。並列合成値は最小の枝3 kΩより小さくなるため、検算もできます。',
    lesson: '/exam/02-electricity-circuits'
  },
  {
    id: 'd2-005',
    domain: 2,
    topic: '分圧',
    prompt: '12 Vの電源に上側2 kΩ、下側4 kΩを直列接続し、下側抵抗の両端をVoutとします。無load時のVoutはどれですか。',
    choices: ['8 V', '6 V', '4 V', '2 V'],
    correctIndex: 0,
    explanation: 'Vout = 12×4/(2+4) = 8 Vです。どの抵抗の両端から出力を取るかを図で確認してから式へ入れます。',
    lesson: '/exam/02-electricity-circuits'
  },
  {
    id: 'd2-006',
    domain: 2,
    topic: '分圧とload',
    prompt: '抵抗dividerの出力へ、下側抵抗と同じ値のinput resistanceを接続しました。無load時と比べたVoutの変化として最も適切なものはどれですか。',
    choices: [
      '必ず2倍になる',
      '下側の実効抵抗が並列で小さくなり、Voutは低下する',
      '電源電圧を越える',
      'loadは回路へ全く影響しない'
    ],
    correctIndex: 1,
    explanation: 'input resistanceは下側抵抗と並列になります。下側の合成値が小さくなり、Vout/Vin = Rlower/(Rupper+Rlower)も小さくなります。これがloadingです。',
    lesson: '/exam/02-electricity-circuits'
  },
  {
    id: 'd2-007',
    domain: 2,
    topic: 'Kirchhoffの法則',
    prompt: '1つの接続点へ5 mAと3 mAが流れ込み、別の1枝から2 mAが流れ出しています。残りの1枝から流れ出す電流はどれですか。',
    choices: ['2 mA', '3 mA', '6 mA', '10 mA'],
    correctIndex: 2,
    explanation: 'KCLでは流入合計と流出合計が等しくなります。5+3 = 2+IなのでI = 6 mAです。電流方向の符号を図に書くと誤りを減らせます。',
    lesson: '/exam/02-electricity-circuits'
  },
  {
    id: 'd2-008',
    domain: 2,
    topic: '交流の周期',
    prompt: '50 Hzの正弦波の周期はどれですか。',
    choices: ['0.02 ms', '2 ms', '10 ms', '20 ms'],
    correctIndex: 3,
    explanation: 'T = 1/f = 1/50 s = 0.02 s = 20 msです。0.02という数値を秒からmsへ直し忘れないようにします。',
    lesson: '/exam/02-electricity-circuits'
  },
  {
    id: 'd2-009',
    domain: 2,
    topic: 'RMS',
    prompt: 'peak値10 Vの正弦波の実効値に最も近いものはどれですか。',
    choices: ['7.07 Vrms', '5 Vrms', '10 Vrms', '14.1 Vrms'],
    correctIndex: 0,
    explanation: '正弦波ではVrms = Vp/√2なので10/1.414 ≈ 7.07 Vrmsです。この関係は正弦波用で、任意波形へ0.707を固定適用できません。',
    lesson: '/exam/02-electricity-circuits'
  },
  {
    id: 'd2-010',
    domain: 2,
    topic: '位相と時間差',
    prompt: '1 kHzの正弦波を0.5 ms遅らせました。位相差はどれですか。',
    choices: ['90°', '180°', '270°', '360°'],
    correctIndex: 1,
    explanation: '1 kHzの周期は1 msなので0.5 msは1/2周期、180°です。時間delayが固定なら、別周波数では位相差も変わります。',
    lesson: '/exam/02-electricity-circuits'
  },
  {
    id: 'd2-011',
    domain: 2,
    topic: '容量reactance',
    prompt: '同じcapacitorについて周波数だけを10倍にしたとき、理想的な容量reactance XCはどうなりますか。',
    choices: ['100倍', '10倍', '1/10', '変わらない'],
    correctIndex: 2,
    explanation: 'XC = 1/(2πfC)なのでfに反比例します。周波数10倍ならXCは1/10です。このためcapacitorは高域ほど通しやすくなります。',
    lesson: '/exam/02-electricity-circuits'
  },
  {
    id: 'd2-012',
    domain: 2,
    topic: '誘導reactance',
    prompt: '同じinductorについて周波数だけを4倍にしたとき、理想的な誘導reactance XLはどうなりますか。',
    choices: ['1/16', '1/4', '変わらない', '4倍'],
    correctIndex: 3,
    explanation: 'XL = 2πfLなのでfに比例します。周波数4倍ならXLも4倍です。capacitorとは周波数変化の向きが逆です。',
    lesson: '/exam/02-electricity-circuits'
  },
  {
    id: 'd2-013',
    domain: 2,
    topic: 'dynamic microphone',
    prompt: 'moving-coil型dynamic microphoneが音を電気信号へ変える基本原理はどれですか。',
    choices: ['振動板と一体のcoilが磁界内で動き、電磁誘導で電圧を生じる', '二枚の電極間の静電容量だけを一定に保つ', 'laserで振動板を読み取りMIDIへ変換する', '圧電素子で必ず48 Vを発生させる'],
    correctIndex: 0,
    explanation: 'moving-coil型は振動板につながったcoilが永久磁石の磁界内で動き、電磁誘導による電圧を取り出します。外部電源を必要としない製品が一般的です。',
    lesson: '/exam/03-studio-systems'
  },
  {
    id: 'd2-014',
    domain: 2,
    topic: 'microphone指向性',
    prompt: '正面0°への感度が大きく、真後ろ180°を大きく抑える代表的な指向性はどれですか。',
    choices: ['無指向性', 'cardioid', '双指向性', '全方向で完全に同感度のshotgun'],
    correctIndex: 1,
    explanation: 'cardioidは正面を主軸とし、代表的には真後ろに大きなnullを持ちます。実機の指向性は周波数で変わるため、polar pattern図も確認します。',
    lesson: '/exam/03-studio-systems'
  },
  {
    id: 'd2-015',
    domain: 2,
    topic: 'proximity effect',
    prompt: '単一指向性microphoneをvocalへ非常に近づけたとき、一般に起こり得るproximity effectはどれですか。',
    choices: ['sample rateが自動的に2倍になる', '高域だけが完全に消える', '低域が強調される', '左右channelが入れ替わる'],
    correctIndex: 2,
    explanation: 'pressure-gradient成分を持つ単一指向性micでは、音源へ近づくほど低域が強調される場合があります。距離で音色が変わるため、EQ前に位置を調整します。',
    lesson: '/exam/03-studio-systems'
  },
  {
    id: 'd2-016',
    domain: 2,
    topic: 'microphone仕様',
    prompt: '非常に小さなacoustic音を録るmicを、他条件が同程度の候補から選びます。mic自身のnoiseが少ない可能性を最も直接示す仕様はどれですか。',
    choices: ['bodyの色が暗い', 'cableが1 m長い', 'maximum SPLが1 dB高い', 'self-noiseが7 dBAと低い'],
    correctIndex: 3,
    explanation: 'self-noiseまたはequivalent noise levelはmic自身が加えるnoiseの目安で、一般には小さいほど静かなsourceに有利です。感度、部屋noise、preampも併せて判断します。',
    lesson: '/exam/03-studio-systems'
  },
  {
    id: 'd2-017',
    domain: 2,
    topic: '電磁誘導',
    prompt: 'coilを通る磁束が時間的に変化したときに電圧が生じる現象はどれですか。',
    choices: ['電磁誘導', '静電遮蔽', '量子化', '熱伝導'],
    correctIndex: 0,
    explanation: '電磁誘導は磁束の変化によって起電力が生じる現象です。dynamic microphone、transformer、magnetic playback headなどの基本原理になります。',
    lesson: '/exam/02-electricity-circuits'
  },
  {
    id: 'd2-018',
    domain: 2,
    topic: 'transformer',
    prompt: '一次:二次の巻数比が2:1の理想transformerで、一次へ10 Vrmsを加えました。二次電圧はどれですか。',
    choices: ['2 Vrms', '5 Vrms', '10 Vrms', '20 Vrms'],
    correctIndex: 1,
    explanation: 'Vp/Vs = Np/Nsなので10/Vs = 2/1、Vs = 5 Vrmsです。電圧は巻数比、電流は逆比、impedanceは巻数比の2乗で変換されます。',
    lesson: '/exam/02-electricity-circuits'
  },
  {
    id: 'd2-019',
    domain: 2,
    topic: 'impedance変換',
    prompt: '一次:二次の巻数比が2:1の理想transformerの二次へ600 Ωを接続しました。一次側から見えるimpedanceはどれですか。',
    choices: ['150 Ω', '1,200 Ω', '2,400 Ω', '4,800 Ω'],
    correctIndex: 2,
    explanation: 'Zp/Zs = (Np/Ns)^2なので、Zp = 2^2×600 = 2,400 Ωです。巻数比をそのまま掛けるのではなく、2乗します。',
    lesson: '/exam/02-electricity-circuits'
  },
  {
    id: 'd2-020',
    domain: 2,
    topic: 'samplingとaliasing',
    prompt: 'sample rate 48 kHzで30 kHz成分をそのまま標本化しようとする場合の説明として、最も適切なものはどれですか。',
    choices: ['Nyquist周波数は48 kHzなので問題ない', '30 kHzは必ず30 kHzのまま記録される', 'bit depthを上げればaliasingだけを完全に防げる', 'Nyquist周波数24 kHzを超えるため、A/D前のanti-alias filterが必要になる'],
    correctIndex: 3,
    explanation: '48 kHz標本化のNyquist周波数は24 kHzです。それを超える入力成分は可聴帯域側へ折り返し得るため、A/D前でanti-alias filterにより抑えます。',
    lesson: '/exam/03-studio-systems'
  },
  {
    id: 'd2-021',
    domain: 2,
    topic: 'bit depthとdither',
    prompt: '24 bit mixを最終納品用の16 bit PCMへ量子化するときの基本操作として、最も適切なものはどれですか。',
    choices: ['最終のbit depth低減時に適切なditherを一度加える', 'sample rateだけを上げればbit depthも自動で16になる', 'master faderを0 dBFSへ固定すれば量子化誤差は消える', '同じditherを各pluginと各exportで何度も加える'],
    correctIndex: 0,
    explanation: 'ditherはbit depthを下げる直前に微小noiseを加え、量子化誤差を信号に相関した歪みからnoiseへ変える処理です。原則として最終段で一度だけ適用します。',
    lesson: '/exam/03-studio-systems'
  },
  {
    id: 'd2-022',
    domain: 2,
    topic: 'balanced伝送',
    prompt: 'balanced analog lineの本質として最も適切なものはどれですか。',
    choices: [
      'connectorがTRSなら機器内部に関係なくbalancedになる',
      '2導体の対ground impedanceをそろえ、受信側で2導体の差を取り出す',
      'signal conductorを1本だけ使い、shieldを常に音声returnにする',
      '左右stereo信号を1本のXLRへ必ずまとめる'
    ],
    correctIndex: 1,
    explanation: 'impedance balanceと差動受信により、2導体へ共通に入ったnoiseを打ち消しやすくなります。2導体が必ず等振幅・逆polarityで能動driveされるとは限りません。',
    lesson: '/exam/02-electricity-circuits'
  },
  {
    id: 'd2-023',
    domain: 2,
    topic: 'sourceとload',
    prompt: '出力impedance 100 Ωのline outputを、input impedance 10 kΩのline inputへ接続しました。この接続の説明として最も適切なものはどれですか。',
    choices: [
      'impedanceを完全一致させた600 Ω matchingである',
      'loadが低すぎるため必ず短絡する',
      'inputをoutputより十分高くしたbridging接続である',
      'speaker level伝送である'
    ],
    correctIndex: 2,
    explanation: 'Zin/Zout = 100なので、電圧を大きく落とさず受けるbridging接続です。現代のanalog audioはこの方式が一般的で、RF/digital termination等のmatchingとは区別します。',
    lesson: '/exam/02-electricity-circuits'
  },
  {
    id: 'd2-024',
    domain: 2,
    topic: 'phantom電源',
    prompt: '48 V phantom powerを必要とするcondenser microphoneを接続するとき、最も安全な基本操作はどれですか。',
    choices: [
      'phantomをONにしたままTRS plugを半挿しする',
      'speakerを最大音量にしてpopの有無を確認する',
      'XLR pin 2だけへ48 Vを直接つなぐ',
      'monitorとgainを下げ、XLR接続後に必要chだけONにして安定を待つ'
    ],
    correctIndex: 3,
    explanation: '接続時のpopと一時的なDC偏りを避けるため、monitor/gainを下げ、確実に接続してから必要入力だけphantomをONにします。外すときはOFF後に放電を待ちます。',
    lesson: '/exam/02-electricity-circuits'
  },
  {
    id: 'd2-025',
    domain: 2,
    topic: 'PCM data量',
    prompt: '48 kHz・24 bit・2 channelの非圧縮PCMを60秒録音します。headerを除くdata量に最も近いものはどれですか。',
    choices: [
      '約17.3 MB',
      '約1.44 MB',
      '約34.6 kB',
      '約138 MB'
    ],
    correctIndex: 0,
    explanation: '48,000 sample/s × 24 bit × 2 ch × 60 s ÷ 8 = 17,280,000 byteで、約17.3 MBです。実fileにはheader等が加わります。',
    lesson: '/exam/03-studio-systems'
  },
  {
    id: 'd2-026',
    domain: 2,
    topic: '双指向性microphone',
    prompt: '理想的なfigure-8（双指向性）microphoneのpolar patternについて、最も適切な説明はどれですか。',
    choices: [
      '正面だけを拾い、背面と側面は必ず同感度である',
      '正面と背面を逆polarityで拾い、左右90°付近にnullを持つ',
      '全方向を同じpolarity・同じ感度で拾う',
      '正面と背面を同じpolarityで拾い、0°にnullを持つ'
    ],
    correctIndex: 1,
    explanation: '理想的なfigure-8は正面と背面へlobeを持ち、左右90°方向がnullです。前後は逆polarityなので、M/SのSideやBlumlein方式にも利用されます。',
    lesson: '/exam/03-studio-systems'
  },
  {
    id: 'd2-027',
    domain: 2,
    topic: 'maximum SPL',
    prompt: '非常に大音量のsnare drumを近接収音します。他条件が同程度なら、過大入力への余裕を最も直接示すmic仕様はどれですか。',
    choices: [
      'self-noiseが1 dB高い',
      'bodyが10 mm長い',
      'maximum SPLが142 dB SPLと高い',
      'output connectorが金色である'
    ],
    correctIndex: 2,
    explanation: 'maximum SPLは規定歪み率などの条件下で扱える最大音圧の目安です。近接する大音量sourceでは高い値が有利ですが、padやpreamp入力余裕も確認します。',
    lesson: '/exam/03-studio-systems'
  },
  {
    id: 'd2-028',
    domain: 2,
    topic: 'DI box',
    prompt: 'passive electric bassをstageから遠いconsoleへ送るとき、DI boxの代表的な役割はどれですか。',
    choices: [
      'speaker levelをさらに大電力へ増幅する',
      'audioをMIDI noteへ変換する',
      '左右stereoを必ずmono cancelする',
      'high-Z unbalanced信号をlow-Z balanced mic相当へ変換する'
    ],
    correctIndex: 3,
    explanation: 'DIはinstrumentを適切にloadし、長距離をbalanced low-impedanceで送りやすくします。active/passiveでinput impedanceや電源条件が異なります。',
    lesson: '/exam/03-studio-systems'
  },
  {
    id: 'd2-029',
    domain: 2,
    topic: 'half-normal patchbay',
    prompt: '一般的なhalf-normal patchbayで、上段sourceから別機器へpatchしつつ、元の下段destinationにも信号を残したいときの操作はどれですか。',
    choices: [
      '上段から信号を取り出す',
      '下段へ別sourceを挿す',
      '上段と下段をspeaker cableで短絡する',
      'output同士を接続する'
    ],
    correctIndex: 0,
    explanation: '一般的なhalf-normalでは上段からの取り出しはnormalを保ち、下段への挿入でnormalを切ります。ただしdirectionとjack動作はpatchbay manualで確認します。',
    lesson: '/exam/03-studio-systems'
  },
  {
    id: 'd2-030',
    domain: 2,
    topic: 'aux send',
    prompt: 'vocalistのheadphone cueをcontrol roomのchannel fader操作から独立させたい場合、代表的に使うroutingはどれですか。',
    choices: ['post-master insert', 'pre-fader aux send', 'speaker outputのmult', 'solo-in-placeだけ'],
    correctIndex: 1,
    explanation: 'pre-fader auxはmain channel faderより前から信号を取り、main mixのlevel変更から独立したcueを作れます。effect sendにはpost-faderが代表的です。',
    lesson: '/exam/03-studio-systems'
  },
  {
    id: 'd2-031',
    domain: 2,
    topic: 'parametric EQ',
    prompt: '一般的なbell型parametric EQで、中心周波数の周囲を狭くまたは広く調整する組合せはどれですか。',
    choices: [
      'pan・mute・soloだけ',
      'sample rate・bit depth・frame rate',
      'frequency・gain・Q（またはbandwidth）',
      'attack・hold・releaseだけ'
    ],
    correctIndex: 2,
    explanation: 'bell EQではfrequencyで中心、gainで増減量、Qまたはbandwidthで作用範囲を決めます。高いQは一般に狭く、低いQは広い帯域へ作用します。',
    lesson: '/exam/03-studio-systems'
  },
  {
    id: 'd2-032',
    domain: 2,
    topic: 'compressor attack',
    prompt: 'snareの最初のtransientを比較的残し、その後のlevelをcompressorで抑えたい場合の考え方として最も適切なものはどれですか。',
    choices: [
      'thresholdを無効にしてratioを1:1にする',
      'releaseを無限にして常時同じgain reductionにする',
      'lookaheadを切れば必ず全transientが消える',
      'attackをある程度遅くし、最初の立ち上がり後にgain reductionを働かせる'
    ],
    correctIndex: 3,
    explanation: 'attackを遅めにすると最初のtransientが通ってからgain reductionが進みやすくなります。適切な値はtempo、source、detector、releaseとの組合せで聴いて決めます。',
    lesson: '/exam/03-studio-systems'
  },
  {
    id: 'd2-033',
    domain: 2,
    topic: 'VU meter',
    prompt: 'VU meterの性質として最も適切なものはどれですか。',
    choices: [
      '約300 msの比較的遅い応答で、平均的な動きを読みやすい',
      'sample間true peakを必ず完全に表示する',
      '0 VUは世界中で必ず0 dBFSである',
      '周波数だけを測りlevelは測らない'
    ],
    correctIndex: 0,
    explanation: 'VUは短いtransientを正確なpeakとして示すmeterではなく、平均的なprogramme levelを読みやすくする応答です。0 VUに対応するdBu/dBFSはsystem alignmentで決まります。',
    lesson: '/exam/03-studio-systems'
  },
  {
    id: 'd2-034',
    domain: 2,
    topic: 'digital peak meter',
    prompt: 'sample peak meterとtrue-peak meterの違いとして最も適切なものはどれですか。',
    choices: [
      'sample peakはloudnessだけ、true peakはpitchだけを測る',
      'true peakはsample間を含む再構成波形のpeakを推定する',
      'sample peakはanalog voltageだけに使う',
      '両者は常に1 bitの誤差もなく同じ値になる'
    ],
    correctIndex: 1,
    explanation: 'sample peakは記録sampleの最大値です。true peakはoversampling等で再構成波形を推定し、sample間peakを検出します。納品上限がdBTPなら対応meterを使います。',
    lesson: '/exam/03-studio-systems'
  },
  {
    id: 'd2-035',
    domain: 2,
    topic: 'analog tape sync',
    prompt: 'multitrack analog tapeでoverdub時にsync/sel-sync modeを使う主な理由はどれですか。',
    choices: [
      'tape speedを毎回2倍にするため',
      'erase headで既録trackを消すため',
      '既録再生と新規録音を同じhead位置基準にし、時間ずれを避けるため',
      'digital clockを75 Ωで終端するため'
    ],
    correctIndex: 2,
    explanation: 'record headをplaybackにも使うことで、通常repro headとの物理距離によるdelayを避け、overdub timingをそろえます。音質確認は専用repro headが有利な場合があります。',
    lesson: '/exam/03-studio-systems'
  },
  {
    id: 'd2-036',
    domain: 2,
    topic: 'analog tape bias',
    prompt: 'analog tapeのAC biasを適正点より過大にしたときに起こり得る変化として、最も適切なものはどれですか。',
    choices: [
      'tapeがdigital dataへ変わる',
      'すべての歪みとnoiseが必ず0になる',
      'head gapが物理的に広がる',
      '高域recorded outputが低下する'
    ],
    correctIndex: 3,
    explanation: 'biasを増やすとある範囲までlinearizationが改善しますが、最大出力点を越えて増やすと高域levelが下がります。適正over-bias量はtape、speed、machineで異なります。',
    lesson: '/exam/03-studio-systems'
  },
  {
    id: 'd2-037',
    domain: 2,
    topic: 'reverb send/return',
    prompt: '複数trackで一つのreverbを共有し、各trackから残響量を調整する基本routingはどれですか。',
    choices: [
      '各trackのpost-fader send → reverb 100% wet → effect return',
      'master output → microphone inputへ直結してfeedbackさせる',
      '各trackをMIDI noteへ変換してreverbを録音する',
      'reverb returnを必ずpreampのphantom端子へ戻す'
    ],
    correctIndex: 0,
    explanation: '共通reverbはaux send/returnで共有でき、post-faderなら元trackのfader操作に残響も追従します。return側は通常100% wetとし、send量で比率を決めます。',
    lesson: '/exam/03-studio-systems'
  },
  {
    id: 'd2-038',
    domain: 2,
    topic: '抵抗color code',
    prompt: '4-band抵抗の色がgreen・blue・brown・goldの順です。抵抗値と許容差はどれですか。',
    choices: [
      '56 Ω・±10%',
      '560 Ω・±5%',
      '5.6 kΩ・±1%',
      '56 kΩ・±5%'
    ],
    correctIndex: 1,
    explanation: 'green=5、blue=6、brownは×10、goldは±5%なので、56×10=560 Ω・±5%です。読む向きとband数を確認し、実回路では測定値・部品表も照合します。',
    lesson: '/exam/03-studio-systems'
  },
  {
    id: 'd2-039',
    domain: 2,
    topic: 'digital clock',
    prompt: '複数のdigital audio機器を接続するclock構成として、最も適切なものはどれですか。',
    choices: [
      '全機器を別々のinternal clockにして、表示値だけ同じにする',
      'すべてのBNC端子を無条件に二重terminationする',
      '1台をmasterとし、他をdigital inputまたはword clockへ同期させる',
      'analog faderでclock phaseを合わせる'
    ],
    correctIndex: 2,
    explanation: '原則1 system 1 masterとし、slaveを同じsample timingへlockさせます。同じ48 kHz表示でも独立clockなら少しずつずれ、click/pop等の原因になります。',
    lesson: '/exam/03-studio-systems'
  },
  {
    id: 'd2-040',
    domain: 2,
    topic: 'troubleshooting',
    prompt: '左monitorだけ無音です。speaker直前でL/R入力cableを入れ替えると、無音が右monitorへ移りました。この結果から最も疑う範囲はどれですか。',
    choices: [
      '左speaker cabinetだけ',
      '部屋の左壁だけ',
      '入れ替え点より後ろの両speakerだけ',
      '入れ替え点より上流の左channel経路'
    ],
    correctIndex: 3,
    explanation: '故障がsignalと一緒に反対側へ移ったため、speakerより上流のsource、D/A output、routing、cable等を疑います。1要素だけ入れ替えるswap testで範囲を半分にできます。',
    lesson: '/exam/03-studio-systems'
  }
]
