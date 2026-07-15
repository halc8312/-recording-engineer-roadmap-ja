# 05 音楽理論・譜面・楽器

## この章の目標

- 五線、音部記号、調号、拍子、反復記号を読み、録音中の場所を共有できる。
- note value、BPM、delay time、pitch、周波数を相互に計算できる。
- 音程・音階・和音の最小限を理解し、移調楽器の「記譜音」と「実音」を区別する。
- 弦・木管・金管・打楽器・鍵盤・声の発音原理、代表音域、録音上の注意を説明する。
- 日本語・英語・ドイツ語・イタリア語の代表的な楽器名と楽語を対応させる。

音域は演奏者、楽器、奏法、時代、楽譜の表記法で変わります。この章の音域表は**一般的な実音のおおよその目安**であり、編曲の保証範囲ではありません。実際のsessionでは演奏者とscoreを確認します。

## 1. 五線と音の位置

### 音名の対応

| 日本語 | 英語 | ドイツ語 | 固定ド唱法 |
| --- | --- | --- | --- |
| ハ | C | C | Do |
| ニ | D | D | Re |
| ホ | E | E | Mi |
| ヘ | F | F | Fa |
| ト | G | G | Sol |
| イ | A | A | La |
| ロ | B | H | Si / Ti |

ドイツ音名では、原則として**Hが英語のB natural、Bが英語のB-flat**です。score、chord sheet、musicianの慣習が英語式かドイツ式かを確認します。

**scientific pitch notation**では中央のCをC4と書き、標準的なMIDI表記ではC4がnote number 60、A4が69です。ただしDAWや機器により中央Cのoctave番号表示が異なる場合があるため、note numberまたは実際の音で確認します。

### 音部記号

- **treble clef（ト音記号）**：第2線がG4。violin、flute、右手鍵盤など。
- **bass clef（ヘ音記号）**：第4線がF3。cello・bassoonの低域、tuba、左手鍵盤など。
- **alto clef（ハ音記号）**：中央の線がC4。violaで代表的。
- **tenor clef（ハ音記号）**：第4線がC4。cello、bassoon、tromboneの高い部分など。

**ledger line（加線）**は五線の外へ音域を広げます。音部記号が変われば同じ線の音名も変わります。

### 変化記号と調号

- sharp `♯`：原則として半音上げる。
- flat `♭`：原則として半音下げる。
- natural `♮`：同じ小節内の変化を元へ戻す。
- double sharp / double flat：全音分変化させる。
- key signature（調号）：各段の冒頭で、その調の基本的なsharp/flatを示す。

臨時記号の効く範囲は通常、その小節内の同じpitch classとoctaveです。譜面の慣習・記譜softwareの表示もあるため、曖昧な時は演奏者へ確認します。

## 2. note、rest、拍子

4分音符を1拍とした時の基本比率です。

| 記号の種類 | 4分音符に対する長さ | 4/4での拍数 |
| --- | ---: | ---: |
| whole note（全音符） | 4 | 4 |
| half note（2分音符） | 2 | 2 |
| quarter note（4分音符） | 1 | 1 |
| eighth note（8分音符） | 1/2 | 1/2 |
| sixteenth note（16分音符） | 1/4 | 1/4 |

- **dot（付点）**：元の長さの半分を加える。付点4分音符は4分＋8分＝1.5拍。
- **tie（tie、タイ）**：同じ高さの音をつなぎ、長さを合計する。
- **slur（slur、スラー）**：異なる音を一つのphraseとして滑らかにつなぐ。音価は合計しない。
- **rest（休符）**：音を出さない長さを指定する。

### 拍子記号

拍子記号の上は1小節に含む拍のまとまり、下は基準となる音符を表します。

- 4/4：4分音符を基準に4拍。
- 3/4：4分音符を基準に3拍。
- 2/2：2分音符を基準に2拍。cut timeとも呼ばれる。
- 6/8：8分音符6個。通常は3個ずつの2拍として感じるcompound duple meter。
- 9/8：3個ずつの3拍、12/8：3個ずつの4拍として感じることが多い。

6/8を「8分音符が6拍」と数える場面もありますが、tempo表示の付点4分音符を1拍とするか、8分音符を1単位とするかでclick設定が変わります。

### rhythm用語

- **downbeat**：小節または拍の頭。
- **upbeat**：弱拍、または曲頭より前のpickup（弱起）を指す場合がある。
- **syncopation**：通常弱い位置を強調したり、音を強拍へまたいだりして重心をずらす。
- **triplet**：通常2等分する時間を3等分する三連符。
- **swing**：均等な8分音符を不均等に演奏する慣習。比率はtempoとstyleで変わる。

## 3. BPM、音符、delay time

quarter noteを1拍とする場合、1拍の長さは次です。

```text
4分音符の長さ [ms] = 60,000 ÷ BPM
```

BPM 120なら4分音符は500 ms、8分音符は250 ms、付点8分音符は375 ms、4分三連符1個は約333.3 msです。

| note value | 4分音符に掛ける係数 |
| --- | ---: |
| whole | 4 |
| half | 2 |
| quarter | 1 |
| eighth | 1/2 |
| sixteenth | 1/4 |
| dotted | 元の音価×3/2 |
| triplet | 同じ拍を通常の2個でなく3個へ分けるため、通常2分割値×2/3 |

::: tip Cubaseで確認
tempoを120 BPMにし、click間隔をsample単位で測ります。48 kHzなら500 msは24,000 samplesです。tempo trackを変化させると、ms固定delayと音符同期delayの違いも確認できます。
:::

## 4. score上の進行記号

録音では「何小節目」だけでなく、repeat後の何回目かを共有します。

| 記号・語 | 意味 | sessionでの言い方例 |
| --- | --- | --- |
| repeat sign | 指定区間を反復 | 「2回目のrepeat」 |
| 1st / 2nd ending | 反復回数で結末を変える | 「2番括弧へ」 |
| D.C. (Da Capo) | 冒頭へ戻る | 「D.C.後」 |
| D.S. (Dal Segno) | segno記号へ戻る | 「D.S.の2小節後」 |
| Coda | 指示に従って終結部へ移る | 「To CodaからCodaへ」 |
| Fine | 終止地点 | 「D.S. al Fine」なら戻った後Fineで終了 |
| fermata | 音・休符を延ばす | 長さは自動的に2倍ではない |

`D.S. al Coda`では、segnoへ戻った後、指定されたTo CodaからCodaへ飛びます。DAW markerには `Verse2`, `D.S._after_8`, `Coda` のように、演者が分かる名前を付けます。

## 5. tempo・dynamic・奏法の楽語

### tempoと変化

| 語 | おおよその意味 |
| --- | --- |
| Largo / Adagio | 幅広く遅く / ゆっくり |
| Andante | 歩くような速さ |
| Moderato | 中くらいの速さ |
| Allegro | 快活に速く |
| Presto | 非常に速く |
| ritardando (rit.) | 次第に遅く |
| accelerando (accel.) | 次第に速く |
| a tempo | 元のtempoへ |
| rubato | 表情のためtempoを柔軟に動かす |

tempo語には時代・genre・曲想が含まれ、固定BPM表だけでは決まりません。

### dynamic

`ppp → pp → p → mp → mf → f → ff → fff` の順に、一般には弱い方から強い方へ進みます。

- crescendo (`cresc.`)：次第に強く。
- diminuendo / decrescendo (`dim.` / `decresc.`)：次第に弱く。
- subito (`sub.`)：急に。`subito p`なら急に弱く。
- sforzando (`sfz`)：その音を急に強調。

記号は絶対SPLではなく、曲・編成・前後関係の中での相対的な指示です。ppだけでgainを決めず、rehearsalで最大のfffも確認します。

### articulationと表情

| 語 | 意味の中心 |
| --- | --- |
| legato | 音を滑らかにつなぐ |
| staccato | 音を短く分離する |
| tenuto | 音価を十分保つ、重みを置く |
| marcato | はっきり強調する |
| dolce | 柔らかく甘美に |
| cantabile | 歌うように |
| pizzicato | 弦を弓でなく指ではじく |
| arco | 弓奏へ戻る |
| con sordino / senza sordino | muteあり / muteなし |

奏法語は音量だけでなく、attack、sustain、倍音、noise、必要な持替え時間を変えます。録音前に次も読めるようにします。

| 語 | 構造・意味 | 録音上の確認 |
| --- | --- | --- |
| tremolo | 弓や打弦を素早く反復し、持続・震えを作る | 弱奏でもbow noiseと高域が増える場合がある |
| sul ponticello | bridge近くを弾き、上位倍音の多い硬い音 | close micでscratch成分を強調しすぎない |
| sul tasto | fingerboard寄りを弾き、柔らかい音 | section全体の輪郭が弱くなるためmainとのbalanceを見る |
| col legno | bowの木部を使う。battuto / tratto等はscoreで確認 | 小さいpercussive音とstage noiseを同時に確認 |
| glissando | 楽器により、連続pitchまたは離散音を素早く連ねて音域間を移る | portamentoとの使い分けはstyle・楽器で確認 |
| divisi / unisono | sectionを複数partへ分ける / 同じpartへ戻る | 人数配分で各lineの音量・厚みが変わる |
| solo / tutti | 1人または少人数の指定 / section全体 | 同じstaffでも必要なmic coverageが変わる |
| senza vibrato / non vibrato | vibratoなし | tuningのbeatとbowの安定が露出しやすい |

略記や奏法の細部はscoreの版、時代、composer noteで変わります。用語だけから音を決めつけず、concertmasterや奏者へ確認し、take sheetには開始・解除の小節も残します。

## 6. 半音、音程、octave

12平均律ではoctaveを12の等しい周波数比へ分けます。半音が1段、全音が2段です。

| 半音数 | 音程 | Cからの例 |
| ---: | --- | --- |
| 0 | perfect unison | C–C |
| 1 | minor 2nd | C–D♭ |
| 2 | major 2nd | C–D |
| 3 | minor 3rd | C–E♭ |
| 4 | major 3rd | C–E |
| 5 | perfect 4th | C–F |
| 6 | augmented 4th / diminished 5th | C–F♯ / C–G♭ |
| 7 | perfect 5th | C–G |
| 8 | minor 6th | C–A♭ |
| 9 | major 6th | C–A |
| 10 | minor 7th | C–B♭ |
| 11 | major 7th | C–B |
| 12 | perfect octave | C–上のC |

同じ半音数でも綴りにより音程名が変わります。C–F♯はaugmented 4th、C–G♭はdiminished 5thで、12平均律では同じ鍵盤音でも和声上の役割が異なります。

### inversion

単音程を上下反転すると、度数の合計は9になります。

- 2nd ↔ 7th
- 3rd ↔ 6th
- 4th ↔ 5th
- perfect ↔ perfect
- major ↔ minor
- augmented ↔ diminished

## 7. scale、key、chord

### major scale

半音間隔は `2–2–1–2–2–2–1`。C majorは `C D E F G A B C` です。

### natural minor scale

半音間隔は `2–1–2–2–1–2–2`。A natural minorは `A B C D E F G A` です。harmonic minorは第7音を上げ、melodic minorは慣習により上行・下行の扱いが変わります。

### triad

| 種類 | rootからの半音 | C rootの例 |
| --- | --- | --- |
| major | 0–4–7 | C–E–G |
| minor | 0–3–7 | C–E♭–G |
| diminished | 0–3–6 | C–E♭–G♭ |
| augmented | 0–4–8 | C–E–G♯ |

- **tonic**：調の中心。
- **dominant**：tonicへ向かう力を作りやすい第5音・第5度和音。
- **cadence**：phraseや曲の区切りを作る和声進行。
- **counterpoint（対位法）**：複数の独立した旋律を同時に組み合わせる考え方。
- **orchestration（楽器法・管弦楽法）**：音楽を各楽器へ配分し、音域、音色、奏法、balanceを設計すること。

### 対位法の入口：縦の和音だけでなく横の旋律を追う

**counterpoint（対位法）**では、同時に鳴る各voiceが和声的に関係しながら、それぞれ旋律としても意味を持ちます。主旋律を従属的な和声・伴奏が支える**homophony**と、独立したlineが重なる**polyphony**を区別すると、scoreとmic balanceを読みやすくなります。全partがほぼ同じrhythmでchordを進める**homorhythmic texture**は、homophonyの一形態です。

2声の動きは次の4種類で整理できます。

| 動き | 2つのvoiceの関係 | 例 |
| --- | --- | --- |
| parallel motion | 同じ方向へ、同じ音程間隔を保って動く | 両声が全音上がり、間隔も3度のまま |
| similar motion | 同じ方向へ、異なる幅で動く | 両声が上がるが、一方は2度、他方は3度 |
| contrary motion | 逆方向へ動く | 上声が上がり、下声が下がる |
| oblique motion | 一方が同音を保ち、他方だけ動く | pedal toneの上で旋律が動く |

contrary / oblique motion、異なるrhythm、休符、異なるmelodic contourは、voiceの独立を聴き取りやすくします。ただし「parallel motionは常に禁止」「dissonanceは常に誤り」ではありません。平行5度・octaveやdissonanceの扱いはRenaissance、Baroque、jazz、rock、現代音楽等で異なるため、**style上の規則と実際のscore**を優先します。

**imitation**は一つのmotifを別voiceが時間をずらして受け取ること、**canon**は模倣関係を厳格な規則で続ける形式、**fugue**はsubjectの各声entryを核に展開する構成です。いずれもpolyphonicになり得ますが、同義語ではありません。

録音では、追いかけるentryをmarkerへ記録し、各lineのattackがmain micで識別できるかを先に聴きます。spot micを上げて一つのvoiceだけを常に主役にすると、対位的な受け渡しが崩れるため、phraseごとの主従をscoreとproducerの意図から判断します。

## 8. pitch、周波数、音律

国際的な基準音高の一つとしてA4 = 440 Hzが広く使われますが、orchestraや古楽では別の基準を採用することがあります。session前にtuning referenceを統一します。

12平均律でA4から半音`n`個離れた周波数は次です。

```text
f = 440 × 2^(n / 12)
```

1 octave上は周波数2倍、1 octave下は1/2です。A3は220 Hz、A5は880 Hzです。

2周波数の差をcentで表す式は次です。

```text
cents = 1200 × log2(f2 / f1)
```

- **equal temperament（平均律）**：octaveを等しい比に分け、転調しやすくする。
- **just intonation（純正律）**：単純な整数比を重視し、和音を純粋に響かせる。
- **Pythagorean tuning（ピタゴラス音律）**：主に完全5度の比を積み重ねる。

録音ではtunerの表示だけでなく、持続音のbeat、ensembleの和音、温度で変わる管楽器のpitchを聴きます。

## 9. 移調楽器

**transposing instrument（移調楽器）**は、譜面上のCを演奏した時に、実音が別の音になる楽器です。

| 楽器 | 記譜Cを吹いた時の主な実音 | 読み替えの要点 |
| --- | --- | --- |
| B♭ clarinet | B♭（長2度下） | 実音Cを鳴らす譜面はD |
| B♭ trumpet | B♭（長2度下） | concert pitchより長2度上に記譜 |
| E♭ alto saxophone | E♭（長6度下） | octave関係も含めて確認 |
| B♭ tenor saxophone | B♭（長9度下） | 長2度＋1 octave下に響く |
| F horn | F（完全5度下） | 実音より完全5度上に記譜 |

piccoloは記譜より1 octave上、double bassとguitarは慣例上、記譜より1 octave下に響きます。DAWのevent表示がconcert pitchかwritten pitchかを確認してください。

## 10. 弦楽器

### bowed strings

弦の振動をbowで持続させ、bridgeからbodyへ伝えます。弓の位置・圧力・速度、左手のpitch、vibrato、弦の選択で倍音が変わります。

| 楽器 | 開放弦（低→高） | 実音域の目安 | 特徴 |
| --- | --- | --- | --- |
| violin | G3 D4 A4 E5 | G3〜E7前後 | 高域、速いpassage、treble clef |
| viola | C3 G3 D4 A4 | C3〜A6前後 | alto clef、violinより暗い中域 |
| cello | C2 G2 D3 A3 | C2〜C6前後 | bass/tenor/treble clefを使う |
| double bass | E1 A1 D2 G2 | E1〜C5前後 | 記譜より1 octave下に響く |

### プルト（Pult）と弦セクションの人数

**Pult**はドイツ語で譜面台を指し、orchestraの弦sectionでは通常、1台の譜面台を共有する**2人の奏者を一つの単位**として「1プルト」と数えます。例えば「violin 6プルト」は通常12人を想定する出発点になりますが、奇数人数、1人1台、divisi、編成上の都合、stage条件など例外があるため、最終人数はstage plotと名簿で確認します。

1プルトまたは数プルトごとにspot micを置く方法もありますが、プルトは本来、奏者配置の単位です。「1プルト＝必ずmic 1本」という規則ではありません。mic本数を増やすほどsection内のbalanceを調整しやすい一方、stand noise、bleed、arrival-time差、phase、視界、cable量も増えます。

### plucked strings

- acoustic guitar：標準調弦の実音はE2 A2 D3 G3 B3 E4。body、sound hole、bridge付近で音色が大きく違う。
- electric guitar：pickupは弦の磁気振動を電気信号へ。DIだけとamp/speaker/micを通した音を区別する。
- harp：広い音域を持ち、pedalで各音名のflat/natural/sharpを切り替える。glissandoの調設定に注意。

## 11. 木管楽器

木でできているかではなく、発音機構と歴史的分類でwoodwindと呼びます。金属製のfluteやsaxophoneも木管です。

| 発音 | 代表楽器 | 原理 |
| --- | --- | --- |
| air reed / edge tone | flute、piccolo | airをedgeへ当てる |
| single reed | clarinet、saxophone | 1枚reedがmouthpieceで振動 |
| double reed | oboe、English horn、bassoon | 2枚reedの間をairが通る |

| 楽器 | 実音域の目安 | 録音上の着目点 |
| --- | --- | --- |
| piccolo | D5〜C8前後 | 強い高域、記譜より1 octave上 |
| flute | C4〜C7前後 | 低域は弱く息成分が多い、高域は強い |
| oboe | B♭3〜A6前後 | double reed、集中した中高域 |
| clarinet | D3〜B♭6前後 | registerで音色が変化、B♭/A管は移調 |
| bassoon | B♭1〜E5前後 | 低音からtenor域、key noise |
| alto saxophone | D♭3〜A♭5前後 | E♭移調、bellだけから全音が出るわけではない |

micをbellへ極端に近づけると、特定音だけが強くなったりkey noiseが目立ったりします。楽器全体と部屋の響きを聴いて位置を決めます。

## 12. 金管楽器

playerのlip vibrationをmouthpieceへ伝え、管の共鳴とvalve/slideで管長を変えます。bell正面は高域と音圧が強く、少し外すと柔らかくなります。

| 楽器 | 実音域の目安 | 主な仕組み・注意 |
| --- | --- | --- |
| trumpet | E3〜C6前後 | B♭trumpetの実音目安。記譜は長2度上、valve |
| horn | B1〜F5前後 | 多くはF移調、後方を向くbell |
| trombone | E2〜B♭4前後 | slideで管長を連続変更 |
| tuba | D1〜F4前後 | 低域、楽器種と調性が多様 |

**mute**は音量だけでなく周波数成分と演奏抵抗を変えます。con sordino / openの切替をtake sheetへ記録します。

## 13. 打楽器、鍵盤、声

### percussion

- definite pitch：timpani、marimba、xylophone、vibraphone、glockenspielなど。
- indefinite pitch：snare drum、bass drum、cymbal、tam-tamなど。実際には周波数成分を持つが、明確な音高として扱いにくい。
- membrane：drumheadが主に振動。
- idiophone：楽器本体が主に振動。

malletの硬さ、打点、room、演奏dynamicでtransientと高域が大きく変わります。timpaniにはpedalでhead tensionを変える機種があります。

### keyboard

- piano：A0〜C8の88鍵が標準的。hammerが弦を打ち、damperとpedalがdecay・共鳴を変える。
- organ：keyを保持する間、機構に応じて音を持続。pipe organは建物・残響と一体。
- synthesizer：oscillator、sample、filter、envelope等で音を生成・加工。audioとMIDIを区別して保存する。

### voiceの目安

| 声部 | おおよその音域例 |
| --- | --- |
| soprano | C4〜C6 |
| alto | F3〜F5 |
| tenor | C3〜C5 |
| bass | E2〜E4 |

声域は個人差が非常に大きく、同じ最高音でも安定性、母音、声区、連続時間が違います。range表だけで無理なkeyを決めません。

## 14. 楽器名の対照

| 日本語 | English | Italiano / scoreで見る形 |
| --- | --- | --- |
| バイオリン | violin | violino |
| ビオラ | viola | viola |
| チェロ | violoncello / cello | violoncello |
| コントラバス | double bass | contrabbasso |
| フルート | flute | flauto |
| オーボエ | oboe | oboe |
| クラリネット | clarinet | clarinetto |
| ファゴット | bassoon | fagotto |
| ホルン | horn / French horn | corno |
| トランペット | trumpet | tromba |
| トロンボーン | trombone | trombone |
| チューバ | tuba | tuba |
| ティンパニ | timpani | timpani |

scoreの略号は出版社や言語で異なります。`Cor.`がhorn、`Fg.`がbassoon（fagotto）を表す例など、凡例を先に確認します。

## 15. ensembleを録る時の読み方

1. scoreから編成、移調楽器、solo、mute、doublingを一覧化。
2. tempo map、meter change、repeat、D.S./CodaをDAW markerへ反映。
3. 最弱・最強dynamicとtuttiを探し、gain check箇所を決める。
4. 音域が重なるsectionを予測し、mic位置とarrangementの両方で分離を考える。
5. page turn、instrument change、mute change、breathの時間を含めて進行表を作る。

**doubling**は1人が複数楽器を持ち替えること、または同じ旋律を別楽器が重ねることを指します。どちらの意味か文脈で確認します。

## 理解確認

1. treble clefの第2線とbass clefの第4線は何の音ですか。
2. tieとslurの違いを説明してください。
3. 6/8をcompound meterとして数える時、主な拍はいくつですか。
4. 96 BPMの4分音符と付点8分音符は何msですか。
5. D.S.、D.C.、Fine、Codaの役割を説明してください。
6. C–A♭は半音何個で、何度ですか。
7. A4=440 Hzの時、A2とA5は何Hzですか。
8. C major triadとC minor triadの構成音を書いてください。
9. B♭clarinetが記譜Cを演奏すると、実音は何ですか。
10. violaが主に使う音部記号は何ですか。
11. clarinetとoboeのreed構造はどう違いますか。
12. fluteが木管に分類されるのに、材質だけで分類できない理由を説明してください。
13. double bassとguitarの記譜音と実音のoctave関係を説明してください。
14. crescendoとsforzandoは時間的にどう違いますか。
15. orchestraの録音前にscoreから確認する項目を四つ挙げてください。
16. 1プルトは通常、何を共有する何人の弦奏者を一単位とした呼び方ですか。
17. contrary motionとoblique motionの違いを説明してください。
18. divisiが始まると、弦sectionの人数と録音balanceにどのような変化が起こり得ますか。

<details>
<summary>解答例</summary>

1. どちらも基準となる音はG4とF3です。
2. tieは同じ高さの音価を合計し、slurは異なる音を一つのphraseとしてつなぎます。
3. 付点4分音符を単位とする2拍です。
4. 4分は`60,000 ÷ 96 = 625 ms`、付点8分はその3/4なので468.75 msです。
5. D.S.はsegnoへ、D.C.は冒頭へ戻る指示、Fineは終止、Codaは指定に従って移る終結部です。
6. 8半音、minor 6thです。
7. A2は110 Hz、A5は880 Hzです。
8. C majorはC–E–G、C minorはC–E♭–Gです。
9. B♭3など、記譜Cより長2度低いB♭が鳴ります。
10. alto clefです。
11. clarinetはsingle reed、oboeはdouble reedです。
12. 分類は発音原理と歴史的な楽器族に基づき、現代の本体材質だけでは決まらないためです。
13. 一般的な譜面では記譜より1 octave下に響きます。
14. crescendoは時間をかけて次第に強くし、sforzandoは特定音を急に強調します。
15. 編成、移調、tempo/meter、repeat、dynamic、solo、mute、doublingなどから四つです。
16. 通常は1台の譜面台を共有する2人の弦奏者です。実編成では例外があるため名簿も確認します。
17. contraryは2声が逆方向へ動き、obliqueは一方が同じpitchを保ったまま他方だけが動きます。
18. 一つのsectionが複数lineへ分かれるため、各lineの人数・音量・厚みが減る場合があります。score、座席、main / spotのcoverageを確認します。

</details>

## 章末チェック

- [ ] C〜Bを日本語・英語・ドイツ語で対応できる
- [ ] treble / bass / alto / tenor clefの基準位置を言える
- [ ] 音価、付点、tie、slurを説明できる
- [ ] simple meterとcompound meterを区別できる
- [ ] BPMから4分・8分・付点・三連のmsを計算できる
- [ ] repeat、D.C.、D.S.、Coda、Fine、fermataを説明できる
- [ ] 0〜12半音の音程名を言える
- [ ] major/minor scaleと4種類のtriadを作れる
- [ ] parallel / similar / contrary / oblique motionを区別できる
- [ ] imitation、canon、fugueを同義語として扱わず、scoreのvoice entryを追える
- [ ] A4=440 Hzからoctaveの周波数を求められる
- [ ] 記譜音と実音、移調楽器を区別できる
- [ ] 弦・木管・金管・打楽器の発音原理を説明できる
- [ ] プルトを弦奏者2人と譜面台の単位として説明し、実人数はstage plotで確認できる
- [ ] sul ponticello、sul tasto、col legno、divisi / unisonoの音と進行上の影響を説明できる
- [ ] 代表楽器の相対的な音域と音部記号を判断できる
- [ ] scoreから録音計画に必要な情報を抜き出せる

## 一次資料・規格

- [JAPRS：2026年度サウンドレコーディング技術認定試験 出題範囲](https://www.japrs.or.jp/exam/soundrecording/range/)
- [JAPRS：過去の問題・解答（2022〜2025年）](https://www.japrs.or.jp/exam/soundrecording/past/)
- [JAPRS：2024年公開試験問題（PDF）](https://www.japrs.or.jp/pdf/srtest2024.pdf)：プルトと弦sectionの扱いが公開範囲に含まれることの確認用。本文・選択肢は転載していません。
- [ISO 16：Acoustics — Standard tuning frequency（A4 = 440 Hz）](https://www.iso.org/standard/3601.html)
- [MIDI Association：MIDI Specifications](https://midi.org/specs)
- [Yamaha：Musical Instrument Guide](https://www.yamaha.com/en/musical_instrument_guide/)
- [Open Music Theory：Introduction to Species Counterpoint](https://viva.pressbooks.pub/openmusictheory/chapter/species-counterpoint/)
- [Open Music Theory：Texture](https://viva.pressbooks.pub/openmusictheory/chapter/texture/)

楽器音域・記譜法は版や編成で異なります。試験では受験年度の指定資料、現場では使用scoreと演奏者の判断を優先してください。
