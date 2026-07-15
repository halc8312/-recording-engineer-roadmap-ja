# JAPRS独学 03：スタジオシステム・コンソール・テープ・モニター

## この章のねらい

studioでは、良いmicrophoneやpluginを知っているだけでは足りません。信号がどこから来て、どの回路を通り、どのmeterで観察され、どこへ送られるかを追えなければ、録音もtroubleshootingもできないからです。

この章では、次をできるようにします。

- studio全体のanalog/digital signal flowを、sourceから耳まで描く。
- mic・instrument・line・speaker levelを区別する。
- XLR、TS、TRS、RCA、BNC、optical、USB、speakONの「形」と「信号規格」を分けて考える。
- balanced伝送、DI、shield、source/load impedanceを実際の配線へ当てはめる。
- microphoneの変換原理、指向性、近接効果、感度、self-noise、最大SPLを区別する。
- sample rate、Nyquist周波数、bit depth、量子化、dither、aliasingを説明する。
- EQ、dynamics、delay、modulation、reverbを目的とparameterから選ぶ。
- patchbayのnormal、half-normal、thruを図から判断する。
- consoleのchannel strip、insert、aux、group、master bus、soloの位置を説明する。
- VU、peak、sample peak、true peak、loudness meterを目的別に選ぶ。
- analog tape recorderのtransport、head、bias、alignment、代表的な劣化を説明する。
- monitor speaker、power amplifier、crossover、room、listening positionの関係を説明する。
- 「音が出ない」「片chだけ」「hum」「click」を、signal flowに沿って切り分ける。

> [!NOTE]
> 2026年度の公式出題範囲と2022〜2025年の公開問題から必要概念を抽出し、現代のCubase＋MOTU M2環境にも結びつくよう再構成した独自教材です。公式教材や公開問題の文章・図・設問は転載していません。console、patchbay、meterは機種や規格で動作が異なるため、最後は必ず実機manualを優先してください。

## 0. マイクロホン、デジタル音声、エフェクター

この三つは後のsignal flowを読むための前提です。方式名を「音が良い順」に並べず、**何を変換し、何を測り、どのparameterで何を変えるか**から整理します。

### 0.1 microphoneの変換原理

microphoneは空気中の音圧変化を電気信号へ変換するtransducerです。代表的な方式は次のとおりです。

| 方式 | 変換の中心 | 給電 | 判断時の注意 |
| --- | --- | --- | --- |
| moving-coil dynamic | diaphragmとcoilが磁界中で動き、電磁誘導で電圧を作る | 通常は不要 | 丈夫さ・感度・過渡応答はmodelごとに異なる |
| condenser | diaphragmとbackplateの静電容量変化を電気信号へ変える | polarizationとimpedance converter用の電源が必要 | 48 V phantom、battery、専用電源、electretなど方式を確認 |
| ribbon / velocity | 磁界中の薄い導体ribbonが動き、電圧を作る | passive型は通常不要。active型は必要な場合がある | figure-8が多いが絶対ではない。風・衝撃・誤配線へ注意 |

方式名だけで最大SPLや「高音質」を断定できません。dynamicでも高感度なmodelがあり、condenserでも大音圧向けがあります。ribbonへphantom powerを送れるかも製品と配線状態で異なります。正しくbalanced接続された対応機器を前提にせず、**必ずmanualを確認し、monitorを下げ、接続を終えてから必要な給電だけをON**にします。

### 0.2 指向性と近接効果

**polar pattern（指向性）**は、方向ごとの感度を表します。同じpattern名でも周波数によって形が変わり、off-axisの音色もmodelごとに違います。

| pattern | 正面以外の受け方 | 代表的な使いどころ・注意 |
| --- | --- | --- |
| omnidirectional | 全方向を比較的均等に受ける | 低域が自然になりやすい。部屋・被りも受ける |
| cardioid | 正面を主に受け、背面を抑える | vocalや近接収音の出発点。背面が完全な無音とは限らない |
| super / hypercardioid | cardioidより狭い前方lobesと小さな後方lobe | monitorや反射面を最小感度方向へ置く |
| figure-8 | 前後を逆polarityで受け、側面にnull | M/S、Blumlein、向かい合う2音源。背後も受ける |

pressure-gradient成分を使うdirectional micでは、音源へ近づくと低域が増える**proximity effect**が起こり得ます。理想的なpressure-operated omniでは基本的に起こりません。距離を変えるとlevelだけでなく、低域、direct/room比、plosive、被りも変わります。

### 0.3 microphone specification

| specification | 表すもの | 読み違い |
| --- | --- | --- |
| sensitivity | 一定音圧に対する出力電圧。mV/PaやdBV/Pa等 | 高いほど音質が良い、ではない |
| self-noise / equivalent noise | mic自身のnoiseを等価音圧levelで表す | room・preamp・source noiseとは別 |
| maximum SPL | 指定歪率等に達する入力音圧 | 数字だけで実用dynamic rangeは決まらない |
| frequency response | 周波数ごとの感度 | 正面だけか、距離・load・patternなど測定条件を読む |
| output impedance | mic出力側のimpedance | preamp inputは通常これより十分高くする |
| signal-to-noise / dynamic range | 基準signalとnoise、または最大入力とnoiseの幅 | 算出条件が製品間で同じか確認する |

quietなacoustic sourceではself-noiseとpreamp noise、大音圧sourceではmaximum SPLとpad、長いcableではbalanced伝送とimpedanceが重要になります。specificationは目的から逆算して読みます。

### 0.4 sampling、量子化、aliasing

A/D conversionは概念的に次の順で考えます。

```text
analog signal → anti-alias low-pass filter → sampling → quantization → PCM data
PCM data → reconstruction処理 → D/A → analog signal
```

- **sample rate `fs`**：1秒あたりのsample数。48 kHzなら毎秒48,000 samples。
- **Nyquist frequency `fs/2`**：理想標本化で表現できる上限の境界。48 kHzなら24 kHz。
- **anti-alias filter**：`fs/2`より上の成分が可聴帯域側へ折り返すのをA/D前に抑える。
- **aliasing**：上限を超える成分が別周波数として折り返す現象。記録後の通常EQで元信号へ戻せない。
- **bit depth**：各sampleを何段階で表すかに関係し、量子化noiseと利用可能なdynamic rangeへ影響する。
- **quantization**：連続的な振幅を有限の値へ丸める処理。
- **dither**：bit depthを下げる際に微小noiseを加え、量子化誤差をsignalとの相関が目立ちにくい形へ変える処理。

理想的なfull-scale sineに対するquantization S/Nの目安は `約6.02N + 1.76 dB`（`N`はbit数）ですが、実機はanalog回路のnoise・歪み等で理想値どおりになりません。24 bit録音は「音を0 dBFSぎりぎりまで入れる」ためではなく、十分なheadroomを取りながら小さいsignalも扱いやすくするために使います。

ditherは、最終的に固定小数点のbit depthを減らす直前で原則一度だけ使います。sample-rate conversion、level処理、EQ等を後で行うなら、その処理後に最終bit depthへ落とします。

### 0.5 format、data量、clock

- **PCM**はsample値を表す方式。WAVやAIFFはaudio dataとheader・metadataを収めるcontainerです。
- **lossless圧縮**はdecode後に元のsampleへ戻せます。**lossy圧縮**は知覚model等を使ってdataを捨てます。
- **sample rate**と**bit depth**と**channel数**は別の軸です。
- 未圧縮PCMの概算data量は `sample rate × bit depth × channel数 × 時間`。bitを8で割るとbyteです。
- DAW内部のfloating-point処理に余裕があっても、A/D前とD/A後のanalog回路、固定小数点fileには上限があります。
- 複数digital機器ではsample rate表示だけでなく、1台のclock masterへ同期します。詳しくは[8. digital studio systemとclock](#_8-digital-studio-systemとclock)で扱います。

48 kHz / 24 bit / stereoを1分記録する概算は、`48,000 × 24 × 2 × 60 ÷ 8 = 17,280,000 byte`、header等を除き約17.3 MBです。

### 0.6 effectをparameterで分類する

| 分類 | 代表例 | 主なparameter・判断 |
| --- | --- | --- |
| filter / EQ | HPF、LPF、bell、shelf | frequency、gain、Q / bandwidth、slope |
| dynamics | compressor、limiter、expander、gate | threshold、ratio、attack、release、knee、detector、make-up gain |
| delay系 | delay、echo | delay time、feedback、filter、dry/wet、tempo同期 |
| modulation | chorus、flanger、phaser | rate、depth、delay / all-pass、feedback |
| reverberation | algorithmic、convolution | early reflection、pre-delay、decay、damping、room size |
| nonlinear / pitch | saturation、distortion、pitch shift | drive、harmonics、mix、formant、latency |

**compressor**はthresholdを超えた部分等をratioに応じて圧縮します。attackはgain reductionが進む速さ、releaseは元へ戻る速さに関わります。**limiter**は上限管理を主目的にした高ratioの処理、**expander / gate**は小さいsignal側のlevel関係を広げます。

**chorus**は短い変調delayを重ねて厚みを作り、**flanger**はより短いdelayとfeedbackによるcomb状の変化、**phaser**はall-pass section等の位相変化によるnotch移動が中心です。名称よりsignal flowを見ます。

### 0.7 insertとsend / return

- EQ、compressorのように原音全体を通す処理はinsertが出発点。
- reverb、delayのように複数trackで共有する空間系はpost-fader send / returnが出発点。
- send / returnではeffect側を通常100% wetにし、dryは元channelから残す。
- parallel処理ではdryとwetのlatency・polarity・filterによる干渉を確認する。
- bypass比較はoutput loudnessをそろえる。大きくなっただけの変化を「良くなった」と誤認しない。

Cubaseの詳細操作は[ミキシング教材](/lessons/03-mixing)と[Cubase実習](/practice/cubase-labs)で確認します。

### 理解確認 0

1. moving-coil dynamicとcondenserでは、変換原理と給電がどう違いますか。
2. cardioidとfigure-8の最小感度方向はどう違いますか。
3. proximity effectが起こりやすいmicの動作原理は何ですか。
4. sensitivity、self-noise、maximum SPLを一文ずつ説明してください。
5. 48 kHzのNyquist frequencyはいくつですか。
6. A/D前のanti-alias filterは何を防ぎますか。
7. sample rateとbit depthは、それぞれ何に関係しますか。
8. ditherを使う代表的な時点はいつですか。
9. 48 kHz / 24 bit / monoを10秒記録する未圧縮PCMの概算data量を求めてください。
10. compressorのthreshold、ratio、attack、releaseを説明してください。
11. chorus、flanger、phaserの信号処理上の中心的な違いは何ですか。
12. reverbをsend / returnで使う時、effect側を100% wetにする理由は何ですか。

<details>
<summary>答えと考え方</summary>

1. moving-coilはcoilの電磁誘導で通常給電不要、condenserは静電容量変化を使い、polarization・impedance converter用の電源が必要です。
2. cardioidは主に背面、figure-8は主に側面がnullです。
3. 前後の圧力差を使うpressure-gradient動作です。
4. sensitivityは一定音圧への出力、self-noiseはmic自身の等価noise、maximum SPLは指定歪率等に達する最大入力音圧です。
5. `48 kHz ÷ 2 = 24 kHz`です。
6. `fs/2`を超える成分が可聴帯域へ折り返すaliasingを抑えます。
7. sample rateは時間方向の標本間隔と上限周波数、bit depthは振幅方向の量子化段階と量子化noiseに関係します。
8. 最終処理後、固定小数点のbit depthを下げる直前が代表です。
9. `48,000 × 24 × 1 × 10 ÷ 8 = 1,440,000 byte`、約1.44 MBです。
10. thresholdは検出基準、ratioは入出力変化比、attackは圧縮が進む速さ、releaseは元へ戻る速さに関係します。
11. chorusとflangerは変調delayが中心で、flangerは特に短いdelay・feedbackのcomb効果、phaserはall-pass等の位相変化が中心です。
12. dryを元channelから1回だけ残し、returnではeffect成分の量だけをsendで調整するためです。

</details>

## 1. studioを1本のsignal flowで見る

### 1.1 録音からmonitorまで

bandを録音する代表的な経路を、機能ごとに分けます。

```
演奏
 ↓ 空気の振動
microphone / DI
 ↓ mic / balanced line
stage box・wall panel
 ↓ multicore cable
patchbay
 ↓
mic preamp / console input
 ↓ line level
A/D converter
 ↓ digital audio
DAW（record → edit → mix）
 ↓ digital audio
D/A converter
 ↓ line level
monitor controller
 ↓ line level
power amplifier ── speaker level ── passive speaker
        または active monitor（amp内蔵）
 ↓ 空気の振動
耳
```

小規模なMOTU M2環境では、mic preamp、A/D、D/A、headphone amp、簡易monitor controlの一部が1台に入っています。機能が見えにくいだけで、段階そのものが消えたわけではありません。

### 1.2 signalとcontrolを分ける

studioにはaudio以外の線もあります。

- audio：mic、line、speaker、digital audio。
- clock：digital sampleの時刻を合わせる。
- control：MIDI、USB control、network command、GPIO。
- power：AC mains、DC supply、phantom power。
- time/reference：timecode、video reference、word clock。

同じ形のconnectorでも中身が違うことがあります。BNCだからword clock、XLRだからanalog mic、TRSだからstereoとは限りません。**connectorの形・信号形式・level・impedance・方向**をセットで確認します。

### 1.3 nominal levelとheadroom

**nominal level**は、通常運用の基準となるlevelです。**headroom**は、nominal levelからsystemが歪み始める最大levelまでの余裕です。

analog voltage levelの代表表記：

- `dBu = 20 log10(Vrms / 0.775 V)`
- `dBV = 20 log10(Vrms / 1 V)`

| 表記 | 電圧 | 主な文脈 |
| --- | ---: | --- |
| 0 dBu | 0.775 Vrms | impedanceに依存しない電圧level |
| +4 dBu | 約1.228 Vrms | professional line nominalの代表例 |
| 0 dBV | 1 Vrms | 1 V基準 |
| -10 dBV | 約0.316 Vrms | consumer line nominalの代表例 |

「+4 dBu機器なら最大も+4 dBu」ではありません。+4 dBuはnominalで、最大入力・最大出力は仕様書の別項目です。また、0 VUを何dBuへ合わせるかもstudioのalignmentにより得ます。

### Worked example 1：line levelの換算

2 Vrmsは何dBuか。

`20 log10(2/0.775) ≈ +8.23 dBu`

同じ2 VrmsをdBVで表すと `20 log10(2/1) ≈ +6.02 dBV`。同じ電圧でも基準が違うため数値が変わります。

### 理解確認 1

1. M2のGAINで起きたA/D前のclippingを、Cubaseのfaderで直せない理由は何か。
2. +4 dBuは最大levelか、代表的なnominal levelか。
3. connectorを見ただけで信号形式を断定できない例を1つ挙げる。

<details>
<summary>答えと考え方</summary>

1. faderはA/D変換後のdataを変える場所で、変換前に切り落とされた波形を復元できないから。
2. 代表的なprofessional lineのnominal level。最大値ではない。
3. 例：TRSはbalanced monoにもunbalanced stereoにも使える。XLRはanalog audio以外にもAES3やcontrolで使われる場合がある。

</details>

## 2. level、cable、connector

### 2.1 4つのanalog level

| 種類 | 代表的なsource | 特徴 | 正しい行き先の例 |
| --- | --- | --- | --- |
| mic level | dynamic/condenser mic | 小さい。数mV程度から大音圧時の数百mVまで幅広い | mic preamp |
| instrument / Hi-Z | passive guitar/bass | source impedanceが高く、cable/loadで音色が変わりやすい | Hi-Z input、DI |
| line level | preamp、console、interface | 機器間伝送用。micより大きい | line input |
| speaker level | power amplifier | 大電圧・大電流でspeakerを駆動 | 対応するpassive speaker |

値の範囲はsourceによって重なるので、「micは必ず何mV」のように固定しません。重要なのは、受け側の**感度、最大入力level、input impedance**が合うことです。

speaker outputをM2のline inputへ直接入れてはいけません。大きな電圧で故障するおそれがあります。speaker levelを収録する必要がある特殊用途では、定格の合うload boxやattenuatorを専門知識のもとで使います。

### 2.2 balancedとunbalanced

balanced lineは、2本の信号導体がgroundに対して等しいimpedanceを持ち、受信側で2本の差を取り出します。twisted pairへ共通に入ったnoiseを差動入力で抑えやすいのが利点です。

unbalanced lineは、通常1本のsignal導体と、signal returnを兼ねるshieldを使います。短距離のguitar、consumer機器、insert cableなどに広く使われます。

balancedかどうかはconnectorの極数だけで決まりません。TRS cableを挿しても、機器側がunbalancedならbalanced伝送にはなりません。

### 2.3 analog connector

| connector | 代表的なanalog用途 | conductorの代表割当て | 注意 |
| --- | --- | --- | --- |
| XLR 3pin | balanced mic/line | pin 1 shield、pin 2 positive、pin 3 negative | vintage/特殊機器はmanual確認。phantom powerを扱う |
| 6.35 mm TRS | balanced mono | tip positive、ring negative、sleeve shield | stereo headphone/insertにも同じ形を使う |
| 6.35 mm TS | unbalanced mono | tip signal、sleeve return/shield | guitar等。挿抜時に一時shortし得る |
| RCA/phono | unbalanced line | center signal、outer return/shield | consumer analogやcoaxial S/PDIFにも使う |
| 3.5 mm TRS/TRRS | headphone、headset等 | 規格・極数で異なる | TRRSのCTIA/OMTP等を確認 |
| speakON | speaker level | modelと配線で1+/1-等 | line/mic用途ではない。lockを確認 |

「positive/negative」は瞬間的なpolarityを表す呼び方で、DC電源の常時+/-とは違います。現場ではhot/coldとも呼ばれます。

### 2.4 digital connectorとformat

| 物理接続 | 使われるformat例 | 要点 |
| --- | --- | --- |
| XLR 3pin | AES3 | 通常110 Ω balanced digital cable。analog mic cableで一時動いても規定伝送を保証しない |
| RCA/BNC coaxial | S/PDIF、word clock等 | 通常75 Ω系。formatとterminationを確認 |
| TOSLINK optical | optical S/PDIF、ADAT Optical | 光なのでground loopを作らない。connectorが同じでもformatは別 |
| USB | USB Audio | packet通信。audio clockの扱いはdevice/driver構成による |
| Ethernet系 | Dante、AES67等 | network設計、switch、latency、clock設定が必要 |

**AES3**と**S/PDIF**は似た2ch digital audioでも、電気level、connector、channel status等が異なります。adapterで形だけ変えても確実に変換できるとは限りません。

#### 光ファイバー：コネクター形状と回線数を分ける

光ファイバーでは、コネクター形状、ファイバーの種類、伝送フォーマット、回線の向きを別々に確認します。**SC**はプッシュプル式で2.5 mmフェルールを使う比較的大きな角形コネクター、**LC**はラッチを持つ1.25 mmフェルールの小型コネクターです。LCの方が小さいという違いだけで、どちらか一方が特定の音声フォーマット専用という意味ではありません。

- **simplex**：1本のfiber、または一方向の光pathを1系統として扱う構成。
- **duplex**：2本を一組にした構成。networkでは送信（Tx）と受信（Rx）を別fiberへ割り当てる例が多い。
- **single-mode / multimode**：fiberの伝搬modeの違い。simplex / duplexとは別の分類。
- **SC / LC**：端面を接続するconnector形状。TOSLINKとも別物。

duplex cableを使っていても、規格によっては2本を別用途に使います。したがって「LC duplexなら必ず双方向Ethernet」と決めつけず、transceiver、wavelength、fiber category、polarity（TxとRx）、link budgetを機器仕様で照合します。端面の埃は大きなloss源になるため、capを保ち、専用手順でinspect / cleanしてから接続します。光源が見えなくても危険な場合があるので、connector端面を目でのぞきません。

### 2.5 DI box

**DI（direct injection）box**は、主にhigh impedanceのunbalanced instrument信号を、low impedanceのbalanced mic相当へ変換して長距離伝送しやすくします。

- passive DI：transformerを使うものが代表的。電源不要。sourceとのimpedance関係でlevel/音色が変わる。
- active DI：buffer回路を持ち、高いinput impedanceを作りやすい。battery、phantom、adapter等の電源が必要。
- thru/link：ampへ同じsourceを分岐する出力。isolated outputとは限らない。
- ground lift：audio shield接続を切り替える機能。protective earthを外すswitchではない。

passive guitarを長いTS cableでconsoleまで引くより、演奏者の近くでDIへ入れ、その後をbalanced XLRにする方がnoiseとhigh-frequency lossを管理しやすくなります。

### 2.6 cableを扱う実務

- signal、speaker、AC power、networkをlabelと色で識別する。
- cableはconnectorを持って抜き、線を引っ張らない。
- over-underで巻き、強い折れ・小さすぎる曲げ・結び目を避ける。
- AC cableとlow-level audioを長距離平行に束ねない。交差するなら可能な範囲で直角にする。
- phantom powerをOFFにして放電を待ってからmic cableを抜く。
- connector清掃剤は製造元の指示に従い、勝手に研磨しない。
- continuity testerで導通だけでなく、short、pin assignment、断続不良も確認する。

### 2.7 抵抗のカラーコードを読む

lead付き抵抗の代表的な4-band表示は、**有効数字2桁 → 乗数 → 許容差**の順です。5-band表示は、**有効数字3桁 → 乗数 → 許容差**が代表です。

| 色 | 数字 | 乗数 |
| --- | ---: | ---: |
| black / 黒 | 0 | ×10⁰ |
| brown / 茶 | 1 | ×10¹ |
| red / 赤 | 2 | ×10² |
| orange / 橙 | 3 | ×10³ |
| yellow / 黄 | 4 | ×10⁴ |
| green / 緑 | 5 | ×10⁵ |
| blue / 青 | 6 | ×10⁶ |
| violet / 紫 | 7 | ×10⁷ |
| gray / 灰 | 8 | ×10⁸ |
| white / 白 | 9 | ×10⁹ |

乗数ではgoldが`×10⁻¹`、silverが`×10⁻²`を表します。許容差bandの代表例はbrown ±1%、red ±2%、gold ±5%、silver ±10%です。

例として `yellow – violet – red – gold` なら、有効数字47に`×10²`を掛け、`4,700 Ω = 4.7 kΩ、±5%`です。読む向きは、許容差bandが他より離れている側を終端とするのが目安ですが、汚れ、退色、特殊表示では誤読できます。回路図・部品表と照合し、電源を切って放電し、回路からの影響を考慮した上でmeterでも確認します。表面実装抵抗の数字表示は別方式です。

### 理解確認 2

1. TRS connectorが3極なら必ずbalancedか。
2. passive guitarをM2へ直接つなぐとき、lineとinstrumentのどちらを選ぶか。
3. RCA connectorでanalog lineとS/PDIFの両方があり得るとき、何を確認するか。
4. SC / LCとsimplex / duplexは、それぞれ何を分類する語か。
5. `green – blue – brown – gold`の4-band抵抗は何Ω、許容差何%か。

<details>
<summary>答えと考え方</summary>

1. 必ずではない。stereo headphone、insert send/returnなどunbalanced用途もある。
2. instrument/Hi-Z。input impedanceを高くしてpickupをloadしにくくする。
3. 端子label、manual、signal format、方向、75 Ω cableの要否。形だけで判断しない。
4. SC / LCはconnector形状、simplex / duplexはfiberまたは光pathを1系統 / 2系統で扱う構成です。
5. 有効数字56に`×10¹`を掛けた560 Ω、goldなので±5%です。

</details>

## 3. patchbay

### 3.1 patchbayの役割

**patchbay**は、機器の入出力を手元に集め、短いpatch cableで経路を変更する接続盤です。毎回rack裏へ回らずにroutingでき、connectorの摩耗をpatchbay側へ集約できます。

analog studioでは、多くの場合：

- 上段：source/output
- 下段：destination/input
- 上下1組：通常使う経路

として設計します。ただし絶対規則ではないため、bayのlabelと配線表を確認します。

### 3.2 normal

**normalled（full normal）**では、patch cableがないとき上段outputが下段inputへ内部接続されています。対応jackへplugを挿すと内部接続を切り、別経路へ置き換えます。

```
無patch
上：Preamp OUT ─────┐
                     ├─ internal normal ─→ Converter IN
下：Converter IN ───┘

patch後
別source ──plug──→ 下：Converter IN
                     × internal normalは切れる
```

「どちら側へ挿すと切れるか」はbayの設計で確認します。full-normalの一般的構成では上・下いずれへの挿入でもnormalを切ります。

### 3.3 half-normal

**half-normalled**では、通常、上段から信号を取り出すだけなら内部の上下接続を保ち、下段へ挿すと接続を切ります。

```
無patch：       Preamp OUT ──→ Converter IN

上段から取る： Preamp OUT ──┬→ Converter IN（継続）
                             └→ Recorder B（分岐）

下段へ入れる： Preamp OUT ──×  Converter IN
                  別source ───→ Converter IN
```

上段から非破壊で分岐する操作を**mult**として使えます。ただしsourceが複数loadを安全に駆動できること、phantom powerやdigital terminationを含めて分岐可能な回線であることが条件です。

### 3.4 thru / non-normal

**thru（non-normal）**では、上下間の内部接続がありません。外部でpatchしたときだけ信号が流れます。頻繁に自由接続するoutboardのinput/output、臨時回線などに使います。

### 3.5 patchingの安全

- line-level patchbayへspeaker outputを入れない。
- analog用bayでAES3やword clockを扱うなら、bandwidth・impedance・terminationが適合する専用品を使う。
- TRS plugは挿入途中でtip/ring/sleeveが接触し、momentary shortやphantom DCの偏りを作り得る。
- microphone-level/phantom回線を一般TRS bayへ出す設計は、hot patch時のnoise・damageを考慮する。
- output同士を直結しない。
- stereo pair、send/return、normal方向をlabelで明示する。
- session前にnormal chartを保存し、終了時に標準状態へ戻す。

### Worked example 2：compressorをinsertする

通常経路が `Preamp OUT → Converter IN` のhalf-normal pairだとします。compressorを間へ入れるには：

1. `Preamp OUT（上段） → Compressor IN`
2. `Compressor OUT → Converter IN（下段）`

下段への挿入で元のnormalが切れ、compressor経由になります。1本目だけ挿すと元のconverterへも信号が残るかは、half-normalの方向とbay仕様によります。2本そろえてからmonitor levelを上げます。

### 理解確認 3

1. cableなしで決まった上下が接続される方式を何というか。
2. half-normalで上段から信号を取り出し、元の下段にも残す使い方を何というか。
3. patchbayでoutput同士を接続してはいけない理由は何か。

<details>
<summary>答えと考え方</summary>

1. normalled。
2. mult／分岐。
3. 2つの出力回路が互いを駆動して過電流・歪み・故障を起こし得るため。

</details>

## 4. mixing console

### 4.1 channel stripを上から追う

**channel strip**は、1つの入力を処理・分配する縦1列の機能群です。代表的な順序は次のとおりですが、実機で順番やtap pointは変わります。

```
MIC/LINE IN
  ↓ input select
PAD / 48 V
  ↓ preamp GAIN
POLARITY / HPF
  ↓
INSERT SEND → outboard → INSERT RETURN
  ↓
EQ / dynamics
  ↓──────── DIRECT OUT
AUX SEND（preまたはpost）
  ↓
PAN / ROUTING
  ↓
MUTE
  ↓
FADER
  ↓
GROUP BUS / MAIN MIX BUS
```

図は概念図です。HPFがinsertより前か後か、direct outがpre/post faderか、muteがauxへ効くかなどはconsoleごとに違います。

### 4.2 preamp gain、pad、polarity、HPF

- **gain/trim**：入力preampの増幅量。recording chainのnoiseとheadroomに直接関わる。
- **pad**：入力を一定量attenuateし、preampへの過大入力を防ぐ。
- **polarity reverse**：波形の正負を一括反転する。時間を移動するphase調整ではない。
- **HPF（high-pass filter）**：cutoffより下を減衰。rumble対策に有効だが、必要なbass成分も失い得る。

faderを下げてもpreamp clippingは直りません。preampやinsert/EQ段が歪んでいるのか、bus/master/outputが歪んでいるのかをmeterのtap pointで切り分けます。

### 4.3 insertとdirect out

**insert**はchannelの途中へoutboardを直列に挿入するsend/returnです。compressorやgateなど、原音全体を通したいprocessorに使われます。

**direct out**はchannel信号を個別に外へ送るoutputです。multitrack recorderへ各channelを録る用途があります。pre/post EQ、pre/post faderを選べる機種もあります。

TRS 1本でsend/returnを兼ねるinsertでは、一般にtip send・ring returnの例が多いですが逆の機器もあるためmanualを確認します。Y cableはstereo cableではなく、2つのmono経路を1つのTRSへまとめたものです。

### 4.4 aux sendとreturn

**auxiliary bus（aux）**は、各channelから任意量を共通busへ送る仕組みです。

- pre-fader aux：channel faderの前から取る。演奏者cueなど、main mixのfader操作から独立させたい用途。
- post-fader aux：faderの後から取る。reverb/delay sendなど、channelを下げたらeffect sendも追従させたい用途。

```
channel ──┬── pre aux ──→ headphone cue
          ↓ fader
          └── post aux ─→ reverb ─→ stereo return
```

reverbをsend/returnで使うときは、通常effect側を100% wetにし、dry音はmain channelから残します。insertで使う場合はdry/wet設計が別です。

### 4.5 pan、bus、group、matrix

- **pan**：mono signalをstereo/multichannel busへ分配する比率を決める。
- **bus**：複数channelの信号を集める共通経路。
- **subgroup**：複数channelをaudioとしてまとめ、共通処理・level調整してmainへ送る。
- **master bus**：最終mixをまとめるbus。
- **matrix**：複数busをさらに任意比率で組み合わせ、別outputを作る機能。
- **VCA/DCA group**：複数channelのlevel controlをまとめるが、通常それ自体へaudioをsummingしない。

subgroupへcompressorを挿すとgroupを通るaudio全体を処理します。VCAを下げても「VCA busへaudioが通る」わけではありません。

### 4.6 PFL、AFL、solo-in-place

- **PFL（pre-fade listen）**：fader前をsolo monitorし、入力gain確認に向く。main fader位置と独立するのが基本。
- **AFL（after-fade listen）**：fader後をmonitorし、panやpost-fader levelを確認しやすい。
- **SIP（solo in place）**：選んでいないchannelをmuteし、実際のmix bus内でsoloを作る方式。

録音中のSIPは、main outputへ影響して録音・放送へ出てしまう機種があります。**solo-safe、destructive solo、PFL/AFLの行き先**をsession前に確認します。

### 4.7 splitとinline

- **split console**：input channel部とmonitor return部が別channelとして分かれる。
- **inline console**：1本のstrip内にrecording input pathとmonitor/mix return pathを持つ。

multitrack analog時代、record inputとtape returnを同時に多数扱うため発達しました。DAW control surfaceでは見た目が似ていてもaudioが内部を通らない場合があります。

### 4.8 automation

- write：現在の操作を書き込む。
- read：保存済みautomationを再生する。
- touch：触れている間だけ書き、離すと既存値へ戻る。
- latch：触れた後も新しい値を書き続ける。
- trim：既存automationへ相対的な補正を加える。

Cubaseではautomation対象とmode、write/read button、return timeを確認します。意図しないwriteを防ぐため、書き終えたらWriteを解除します。

### Worked example 3：monitor mixだけ変える

vocalistが「自分の声をheadphoneでもっと大きく」と希望し、control room mixは変えたくないとします。

1. vocal channelからcue用の**pre-fader aux**を選ぶ。
2. vocalのaux send levelを上げる。
3. cue bus masterとheadphone ampのclippingを確認する。
4. control room側channel faderは動かさない。

post-fader auxだった場合、engineerがmain faderを動かすとcueも変わります。

### 理解確認 4

1. channel faderを下げても歪みが消えないとき、最初に疑う前段を2つ挙げる。
2. stage monitor/cueとreverbに、pre/post fader auxをどう使い分けるか。
3. subgroupとVCA/DCAの決定的な違いは何か。

<details>
<summary>答えと考え方</summary>

1. mic preamp、insert/EQ/dynamics等のfader前段。入力meterのtap pointも確認する。
2. cueはmain faderから独立するpre-fader、reverbはchannel faderに追従するpost-faderが代表例。
3. subgroupはaudioを共通busへsummingする。VCA/DCAは複数channelのcontrol値をまとめ、通常audioをそのgroupへ集めない。

</details>

## 5. meterを読む

### 5.1 meterは「どこ」を見ているか

同じchannelでも、meterがpreamp直後、pre-fader、post-fader、bus、outputのどこを見ているかで表示は変わります。meterの種類だけでなく**tap point**を確認します。

```
input → preamp → insert → fader → bus → output
          ↑         ↑        ↑       ↑
       input meter  PFL    post meter master meter
```

### 5.2 VU meter

**VU meter（Volume Indicator）**は、約300 msの比較的ゆっくりした応答を持つlevel meterです。短いtransientをそのままpeak表示する用途ではなく、speech/musicの平均的な動きを運用しやすく示します。

- `0 VU` はmeter目盛りの基準点。
- 0 VUに対応する電気levelはsystem alignmentで決める。professional studioで+4 dBuを使う例が多いが、常に同じとは限らない。
- sine波で0 VUに合わせても、transientのpeakはそれより高くなり得る。

### 5.3 peak/PPM

**peak meter**は瞬間的な最大値の監視に向きます。analogの**PPM（peak programme meter）**には国・規格ごとに異なる目盛りや応答があります。「PPMなら完全な瞬時peak」とは限りません。

VUとpeak meterを併用すると、平均的なenergyと瞬間peakの両方を観察できます。2つの差が大きい打楽器はcrest factorが大きく、圧縮の強い持続音は差が小さくなる傾向があります。

### 5.4 dBFS、sample peak、true peak

digital PCMの**dBFS**はfull scaleを0 dBFSとする表記です。固定小数点のsample値は通常0 dBFSを越えられません。

- sample peak：保存されたsample値の最大。
- true peak：sample間を再構成した波形のpeakをoversamplingで推定。
- inter-sample peak：sample値の間で再構成波形が高くなる現象。

sample peakが-0.1 dBFSでも、D/A変換やsample-rate conversion後にtrue peakが0 dBTPを越えることがあります。納品仕様がtrue peak上限を指定する場合、対応meterで確認します。

### 5.5 loudness meter

**loudness** meterは、人の知覚に近づけるfrequency weightingと時間積分を使い、programmeの平均的な大きさを評価します。

- momentary：短い窓の変化。
- short-term：数秒程度の傾向。
- integrated：測定区間全体。
- LUFS/LKFS：digital full scaleに対するloudness単位。
- LRA：programme内のloudness rangeの指標。

LUFSはpeakを置き換えません。loudness、sample peak、true peak、dynamic rangeは別々に監視します。配信・放送・映画で仕様が異なるため、固定値を「すべての音楽の正解」にしません。

### 5.6 stereo/phase meter

- correlation meter：L/Rの相関を概観する。+1に近いほど同じ、0付近は非相関、負側はpolarity/phase問題の可能性。
- vectorscope/goniometer：L/Rの関係を図形で見る。
- mono check：L+Rへsumし、重要成分のcancelやbalance変化を耳で確認する。

相関が負なら必ず悪い、wideなら必ず良い、ではありません。low-frequency、中心定位、mono互換、意図した空間表現を合わせて判断します。

### Worked example 4：analogとdigitalのalignment

studioが1 kHz sineの`-18 dBFS`をD/Aから出し、それをanalog側`+4 dBu = 0 VU`へ合わせたとします。analog機器が+24 dBuまで扱えるなら、0 VUから20 dBのanalog headroomがあります。

ただしこの例から「-18 dBFSは世界共通で必ず0 VU」と結論しません。施設・放送規格・機器仕様でalignment levelは異なります。

### 理解確認 5

1. snareの短いpeak監視にVUだけでは不十分な理由は何か。
2. sample peakとtrue peakの違いは何か。
3. 0 VUは常に+4 dBuか。

<details>
<summary>答えと考え方</summary>

1. VUは約300 msの遅い応答で、短いtransientを実際より低く示し得るから。
2. sample peakは記録sampleの最大、true peakはsample間を含む再構成波形の最大を推定する。
3. 常にではない。0 VUに対応するlevelはsystemのalignmentで決まる。

</details>

## 6. analog tape recorder

### 6.1 何を記録するか

analog magnetic tapeは、base film上の磁性層へ時間方向に磁化の変化を記録します。audio電圧そのものを保存するのではなく、recording headが作る磁界でtapeの磁化を変え、playback時に磁束変化を電圧へ戻します。

```
supply reel
   ↓
guide → erase head → record/sync head → reproduce head
                                      ↓
                              capstan + pinch roller
                                      ↓
                                  take-up reel
```

headの数・順序・呼称は機種で異なります。3-head machineではerase、record、reproduceを分け、録音直後のtapeをreproduce headでmonitorできます。

### 6.2 transport

- supply/take-up reel：tapeを供給・巻き取る。
- capstan：精密な回転で走行速度を決める軸。
- pinch roller：tapeをcapstanへ押し付ける。
- tension arm/guide：tape tensionとpathを安定させる。
- lifter：早送り/巻戻し時にtapeをheadから離す機構。

汚れたheadやcapstan、硬化したpinch roller、誤ったtensionはlevel低下、dropout、速度変動、tape損傷につながります。清掃剤と保守手順はmachine/tape製造元の指定に従います。

### 6.3 erase、record、reproduce head

- erase head：高周波の強い磁界で既存の磁化を消去する。
- record head：audioとhigh-frequency biasを磁界へ変換して記録する。効率よく磁化するためgapはreproduce headより広めの設計が一般的。
- reproduce/playback head：tapeの磁束変化を電圧へ戻す。高域再生のため狭いgapを使う。

**gap**はhead coreの磁気的な隙間です。playback headのgapが広すぎると、短波長＝高周波の磁化を平均してcancelしやすくなります。

### 6.4 sync / sel-sync

multitrack recorderでoverdubするとき、既録trackを通常のreproduce headで聞くと、record headとの物理距離ぶん演奏位置がずれます。そこでrecord headを一時的にplaybackへ使う**sync/sel-sync** modeにすると、既録trackと新規録音trackのhead位置をそろえられます。

record headを再生に使うため、専用reproduce headより高域特性やS/Nが不利な場合があります。最終確認はrepro modeで行います。

### 6.5 bias

tapeの磁化特性はそのままでは非線形です。audioへ可聴帯域より十分高い**AC bias**を加えて記録すると、歪みを減らし、より直線的に記録できます。

- under-bias：歪みが増えやすく、出力・周波数特性も適正にならない。
- biasを増やす：ある点まで歪みが改善する一方、高域出力は最大点を越えると低下する。
- over-bias alignment：特定周波数のrecorded outputが最大になった点から、tape type・speed・規格で定めた量だけbiasを増やして調整する方法。

適正値はtape formulation、speed、track幅、machineで変わります。公開問題の数値を万能値として覚えず、該当machine/tapeのservice manualを使います。

### 6.6 equalizationとalignment

magnetic recordingは周波数によって記録・再生効率が異なるため、record EQとreproduce EQを使います。NAB、IEC/CCIR等でtime constantが異なる場合があり、recordingとplaybackで同じ規格を合わせます。

代表的なalignmentの考え方：

1. machineのmechanical condition、head cleaning、demagnetization要否を確認。
2. calibration tapeでreproduce level、azimuth、reproduce EQを合わせる。
3. 使用tapeでbias、record level、record EQを合わせる。
4. 全trackのlevel、frequency response、crosstalk、noise、speedを確認。

**基準tapeを録音調整に使って上書きしてはいけません。** calibration tapeは再生系の基準です。alignmentは高価なreference tapeと測定器を扱うため、初心者の単独実習にはしません。

### 6.7 reference fluxivity

tape levelはtrack幅あたりの磁束として `nWb/m` で表されることがあります。たとえば2つのreference fluxivityのlevel差は、電圧比と同様に：

`差[dB] = 20 log10(Φ2/Φ1)`

### Worked example 5：fluxivityの差

200 nWb/mと320 nWb/mの差：

`20 log10(320/200) = 20 log10(1.6) ≈ 4.08 dB`

「320の方が200より約4.1 dB高い」と表せます。どのfluxivityを0 VU等へ割り当てるかはalignment規格です。

### 6.8 tape speed、track幅、head gap

- speedを上げると、同じ周波数がtape上で長い波長になり、高域記録・wow/flutter・noise等の特性が変わる。tape消費量は増える。
- track幅を広くすると、一般に利用できる磁性体面積が増えS/Nに有利。track数を増やすと1trackが狭くなり、crosstalkとのtrade-offがある。
- head azimuthがずれると、特に高域で左右/track間の位相差とlevel低下が起きる。

速度を上げれば全特性が必ず改善するわけではありません。head bump、low-frequency response、tape type、EQ規格も変わります。

### 6.9 代表的な劣化と音響効果

| 現象 | 内容 | 主な確認点 |
| --- | --- | --- |
| hiss | 磁性粒子等に由来する広帯域noise | tape type、track幅、speed、noise reduction、level |
| saturation | 高levelで磁化が限界へ近づき、compressionとharmonic distortionが増える | record level、bias、low/high frequency |
| wow | 比較的遅いspeed変動によるpitch揺れ | reel、tension、capstan |
| flutter | より速いspeed変動 | capstan、roller、guide、transport |
| scrape flutter | tapeがhead/guide上で振動する高速変動 | tape path、tension、guide |
| print-through | 巻いたtapeの隣接層へ磁化が転写し、pre/post echoのように聞こえる | 保管温度、巻き方、record level、経時 |
| dropout | 汚れ・傷・磁性層欠損等による瞬間的level低下 | head/tape清掃、tape状態 |
| crosstalk | 隣接trackからの漏れ | head alignment、track幅、level |

### 6.10 tape delay

record headとreproduce headの間隔を `d`、tape speedを `v` とすると、物理的なdelayは：

`delay time = d/v`

head間隔7.5 cm、speed 38.1 cm/s（15 inch/s）なら：

`0.075/0.381 ≈ 0.197 s = 197 ms`

feedback経路を作ると反復echoになりますが、feedbackを上げすぎると発振するためmonitor levelを管理します。

### 理解確認 6

1. reproduce headのgapを狭くする主な理由は何か。
2. overdub時にsync modeを使う理由は何か。
3. biasは「大きいほど常に良い」か。
4. wowとflutterは何の変動として聞こえるか。

<details>
<summary>答えと考え方</summary>

1. tape上の短波長＝高周波の磁化をcancelせず読み取りやすくするため。
2. 既録再生と新規recordingを同じhead位置基準にし、head間距離による時間ずれを避けるため。
3. いいえ。過大biasでは高域出力が低下するなど、tape/speedごとに適正値がある。
4. tape走行速度の変動で、pitchの揺れとして現れる。

</details>

## 7. monitor system

### 7.1 monitor chain

```
DAW stereo out
  ↓ D/A converter
monitor controller（source select / level / dim / mute / mono）
  ↓
power amplifier → passive speaker
       または
active speaker（crossoverとpower ampを内蔵）
  ↓ room
listening position
```

monitor controllerは単なるvolume knobではありません。speaker選択、mono、dim、mute、talkback、cue routingを持つ場合があります。故障や誤routingがあると、mixではなくmonitorだけが変化しているのに処理を加えてしまいます。

### 7.2 activeとpassive

- passive monitor：外部power amplifierが必要。crossoverはspeaker levelで動く**passive dividing network**が代表的。
- active/powered monitor：power amplifierを内蔵。driverごとのampと、ampより前で帯域を分ける**active channel divider**を持つ製品が多い。

「activeだから自動的に正確」「passiveだから古い」とは言えません。driver、crossover、cabinet、amp、protection、room、設置をsystemとして評価します。

**passive dividing network（受動分割network）**は、power amplifierの後、speaker levelでcoil、capacitor、resistor等を使って帯域を分けます。1台のampでmulti-way speakerを駆動しやすい一方、driverの周波数依存impedanceとnetworkが相互作用し、部品は電力を扱います。

```text
line signal → power amp → passive dividing network → woofer / tweeter
```

**active channel divider（能動channel divider / active crossover）**は、power amplifierの前のline levelまたはdigital領域で帯域を分け、各帯域を別ampへ送ります。filterに加えてlevel、delay、polarity、limiterを調整できる機種もあります。

```text
line / digital signal → active channel divider ┬→ LF amp → woofer
                                                └→ HF amp → tweeter
```

bi-ampは「ampが2台ある」という構成、channel dividerは「帯域をamp前で分ける」機能です。設定を誤って低域や過大levelをtweeterへ送ると破損のおそれがあるため、manufacturer指定のcrossover、slope、delay、limiter、配線を使います。

### 7.3 スピーカードライバー、エンクロージャー、2-way / 3-way

代表的なmoving-coil driverでは、magnetが作る磁界中の**voice coil**へaudio currentが流れ、力が生じます。coilに結合したconeまたはdomeが前後に動いて空気を振動させます。surroundとspiderは振動系を支えてcoilをgap中央へ保ち、basket / frameが構造を支えます。これは代表原理であり、ribbon、planar magnetic、electrostatic等は構造が異なります。

| 部位 | 主な役割 | 故障・確認の例 |
| --- | --- | --- |
| diaphragm（cone / dome） | 空気を動かす放射面 | 破れ、変形、分割振動 |
| voice coil | 電流を力へ変換する可動coil | 過熱、断線、擦れ |
| magnet / magnetic gap | coilへ磁界を与える | 異物、位置ずれ |
| surround / spider | 可動部を支持し中心へ戻す | 劣化、剥離、偏心 |
| basket / frame | 各部を機械的に保持 | 変形、取付け緩み |

**enclosure（cabinet）**は単なる箱ではありません。diaphragm前後の音が低域で相殺しにくいよう分離し、driverの運動と放射を制御します。sealed enclosureは密閉空気をspringとして使い、bass-reflex enclosureはportと内部容積の共鳴を利用して設定周波数付近の放射を補います。port noise、cabinet resonance、設定周波数より下のdriver excursion等があるため、方式名だけで低域の質を断定しません。

1つのdriverで全帯域を再生するのは難しいため、**crossover**で帯域を分けます。

- 2-way：woofer + tweeter。
- 3-way：woofer + midrange/squawker + tweeter。
- bi-amp/tri-amp：各帯域を別power amplifierで駆動。

crossover付近では各driverの振幅だけでなく位相、物理的な音響中心、指向性が合成結果に影響します。1本のsineでpolarityだけ合わせても、全帯域のphase responseは一致しません。

### 7.4 amplifier、load、BTL

power amplifierには最大出力、推奨load impedance、gain、noise、protectionがあります。speakerのnominal impedanceだけでなく、周波数により下がるminimum impedanceを確認します。

**BTL（bridge-tied load）**は、2つのamplifierを逆polarityでdriveし、loadを2出力の間へ接続する方式です。

- load両端の電圧は、片側driveの約2倍。
- 同じloadで電流制限等を無視すれば、理論電力は約4倍。
- 各ampから見る負荷は厳しくなる。
- どちらのspeaker端子もgroundとは限らない。片側をgroundへ接続しない。

製品がbridge modeへ対応し、指定配線・loadを満たす場合だけ使います。

### 7.5 sensitivityと最大SPL

speaker sensitivityは、例として「1 W入力、1 m距離で何dB SPL」のように示されます。active monitorでは指定入力電圧でのSPLや最大SPLが使われる場合があります。

同じsensitivityでも、許容入力・compression・distortion・指向性が違えば最大SPLは異なります。specificationの測定条件を読みます。

### 7.6 基本配置

stereo nearfieldの出発点：

1. 左右speakerと頭をほぼ正三角形にする。
2. 左右を部屋の中心線に対して対称にする。
3. tweeter/音響軸を耳の高さへ近づける。
4. 左右の距離と角度をそろえる。
5. desk、display、壁からのearly reflectionを確認する。
6. manufacturerの縦置き/横置き指定と壁距離を守る。

```
        L speaker         R speaker
             ●──────────●
              ＼        ／
               ＼      ／
                ＼    ／
                  ● listener
```

nearfieldはroomの影響を消すものではなく、direct soundに対するroom soundの比を上げやすい配置です。

### 7.7 room modeと境界反射

矩形roomのmode周波数は概念的に：

`f = (c/2) × √[(nx/Lx)² + (ny/Ly)² + (nz/Lz)²]`

`nx, ny, nz` は0以上の整数で、全部0にはしません。低域で特定位置だけboost/cancelが起きるため、EQだけで1点を直すと他の位置が悪化する場合があります。

speakerと壁の反射による**SBIR（speaker-boundary interference response）**では、direct soundと反射音のpath差が周波数依存のcancelを作ります。単純な背面壁1枚、距離 `d` の近似で最初のnullは `f ≈ c/(4d)` ですが、実際はspeakerの放射位置、壁、角度、複数境界で変わります。

対策はspeaker/listener位置、低域吸音、反射処理、sub配置、複数点測定を組み合わせます。薄い吸音材を壁全面へ貼っても、低域modeは解決しません。

### 7.8 monitor calibration

calibrationの目的は、毎回同じ基準で判断し、左右とspeaker set間の差を減らすことです。

基本手順：

1. room/納品規格に合う基準を決める。
2. calibrated test signalを規定digital levelで再生する。
3. speakerを1本ずつ測る。
4. listening positionで指定weighting・responseのSPL meterを使う。
5. 左右をそろえ、monitor knob位置を記録する。
6. 音楽とknown referenceで確認する。

映画の大空間で使う85 dBC等を、小部屋のnearfieldへ無条件で当てはめません。長時間の安全なlistening levelを優先し、test noiseは短時間・小levelから始めます。

### 7.9 headphoneの役割

headphoneはroomの影響を受けにくく、click、edit noise、stereo detailの確認に便利です。一方、speakerのacoustic crosstalk、身体で感じる低域、roomを含むtranslationとは異なります。speakerとheadphoneを相互checkし、どちらか1つを絶対視しません。

### Worked example 6：境界反射の概算

speaker前面の音響中心が背面壁から0.50 mと仮定します。音速343 m/sなら：

`f ≈ 343/(4×0.50) ≈ 171.5 Hz`

約172 Hz付近に境界反射由来のcancelが現れる可能性があります。これは位置を試す出発点であり、実測結果ではありません。

### 理解確認 7

1. passive dividing networkとactive channel dividerは、signal chainのどこで帯域を分けるか。
2. moving-coil speakerでvoice coilとcone / domeは何をするか。
3. active monitorとpassive monitorの主要な違いは何か。
4. nearfieldならroom treatmentは不要か。
5. BTLでspeaker端子の片側をgroundへ落としてはいけない理由は何か。

<details>
<summary>答えと考え方</summary>

1. passive networkはpower amp後のspeaker level、active dividerはpower amp前のline levelまたはdigital領域で分けます。
2. voice coilは磁界中の電流を運動へ変え、結合したcone / domeが空気を動かします。
3. activeはpower amplifierを筐体内に持つ。passiveは外部power amplifierが必要。
4. 不要ではない。direct/room比は改善しやすいが、反射と低域modeは残る。
5. BTLでは両端子が逆polarityでdriveされ、どちらもground電位ではない可能性があるため。短絡・故障につながる。

</details>

## 8. digital studio systemとclock

### 8.1 A/D・D/Aとrouting

- A/D：analog voltageをsampleへ変換。
- D/A：sampleからanalog waveformを再構成。
- digital mixer/DAW：数値としてgain、EQ、routing、summingを行う。

DAW内部にheadroomがあっても、A/D入力前とD/A出力後のanalog stageには物理的上限があります。input clip、plugin/bus overload、output clip、monitor amp clipを別々に確認します。

### 8.2 sample rateとword clock

digital audio機器は、sampleを刻む速さと境界を共有する必要があります。1つのsystemには原則1台のclock masterを決め、他をslaveにします。

```
Clock master interface
  ├─ digital audio/embedded clock → device A
  └─ word clock BNC → device B → 75 Ω termination
```

word clockは通常75 Ω系で、daisy chainでは末端だけを適切にterminationします。各入力が内部terminationを持つか、T connectorを使えるかはmanualで確認します。むやみに全台75 Ω終端すると過負荷、無終端ではreflectionの原因になります。

### 8.3 clock不一致の症状

- 規則的/不規則なclick、pop。
- deviceのunlock表示。
- 録音速度・pitchの不一致。
- channelがmuteされる。
- digital inputが認識されない。

sample rate表示が同じ48 kHzでも、2台が別々のinternal clockで動けば長時間でずれます。digital cableがaudioとclockを同時に運ぶformatでは、受信側をそのdigital inputへsyncさせます。

### 8.4 latency

latencyは複数要素の合計です。

`A/D + input buffer + DAW処理 + output buffer + D/A + plugin look-ahead`

小さいbufferはrecord monitoringに有利ですが、CPU loadによるdropoutのriskが増えます。M2のhardware/direct monitoringはDAW round tripを避けられますが、Cubase側monitorも同時にONにすると二重音やcomb filteringになります。

### 理解確認 8

1. 2台のdigital機器を両方internal clockのままAES3でつなぐと、何が起こり得るか。
2. word clock 75 Ω daisy chainでterminationする基本位置はどこか。
3. M2 direct monitorとCubase software monitorを同時に聞くと、なぜ音が変わるか。

<details>
<summary>答えと考え方</summary>

1. clockが一致せずclick/pop、unlock、sampleの欠落/重複が起こり得る。
2. chain末端。ただしdevice内蔵terminationとmanualを確認する。
3. 低遅延のdirect音とbuffer等で遅れたDAW音が重なり、echoまたは周波数依存のcomb filteringになるため。

</details>

## 9. Cubase Pro 14＋MOTU M2へ置き換える

### 9.1 1本録る経路

`Mic → XLR cable → M2 input 1 mic pre → A/D → USB ASIO → Cubase input bus → audio track`

monitorは2通りです。

- direct：M2 input → M2 monitor mix → headphone/main out。
- software：M2 A/D → Cubase track/plugin → USB return → M2 D/A。

recorded fileへ入るのはCubase input busへ届いたsignalです。headphoneで聞こえた量とrecorded levelが同じとは限りません。

### 9.2 setup checklist

1. WindowsでMOTU M Series driver/firmwareを公式手順どおりにする。
2. Cubase Studio SetupでMOTU ASIO driverを選ぶ。
3. Audio Connectionsでmono input busをinput 1/2へ割り当てる。
4. track inputを該当busへ設定する。
5. micかinstrumentかを決め、M2 input modeを合わせる。
6. condenser mic等、必要な場合だけ48 Vを使う。
7. 演奏最大levelでM2とCubase meterを確認する。
8. direct/software monitoringのどちらを使うか決める。
9. test recordingを再生し、入力を止めた状態でもfileから音が出るか確認する。

### 9.3 2入力でbandを録るとき

M2はanalog 2入力なので、同時に多数のmicを個別trackへ録ることはできません。選択肢は：

- overdubで1〜2sourceずつ録る。
- stereo pairでensemble全体を録る。
- external mixerで複数micを2chへまとめる。ただし録音後に個別balanceを変更できない。
- 多入力interfaceを借りる/必要なsessionだけstudioを使う。

「mixerで8本を2chへまとめれば8trackになる」わけではありません。A/D時点で2つにsumされた信号は、後から元の8本へ分離できません。

### 理解確認 9

1. M2のdirect monitoringとCubaseのsoftware monitoringでは、signalが通る経路のどこが違いますか。
2. headphoneで十分大きく聞こえていても、録音fileが小さいことがあるのはなぜですか。
3. 8本のmicをexternal mixerでstereoへまとめてM2へ入れた場合、Cubaseで録れる独立audio trackは最大何系統ですか。

<details>
<summary>答えと考え方</summary>

1. directはM2内部でinputをmonitor出力へ送り、DAW往復を避けます。softwareはA/D後にCubase・buffer・pluginを通り、USB returnからD/Aへ戻ります。
2. headphone volumeやdirect-monitor balanceは聴取levelを変えますが、A/Dへ入るrecord levelそのものを上げるcontrolではないからです。M2とCubaseのinput meterで確認します。
3. 最大2系統です。mixerでstereoへsumした時点で2つの信号になり、元の8本を後から独立trackへ戻せません。

</details>

## 10. troubleshooting

### 10.1 divide and conquer

最初から全knobを触らず、経路の中間点で**前半が生きているか、後半が生きているか**を分けます。

```
source → cable → preamp → converter → DAW → D/A → monitor → speaker
                         ↑ 中間点を1つずつ確認
```

安全な順序：

1. monitor levelを下げる。
2. routing図と変更履歴を確認する。
3. known-good source/cable/channelへ1つずつ交換する。
4. meterをsource側から順に見る。
5. 原因を特定してからlevelを戻す。

### 10.2 症状別check

| 症状 | 最初の確認 | 次の切り分け |
| --- | --- | --- |
| 無音 | mute、monitor source、track input、output bus | cable swap、PFL、converter meter、known-good headphone |
| 片chだけ | pan、stereo cable、output assignment | L/R cableを入替え、故障が移るか |
| 小さい/細い | mic/line/Hi-Z mode、balanced wiring | pin 2/3片側断線、double routingのpolarity、load impedance |
| hum 50/60 Hz系 | balanced/unbalanced境界、power、ground loop | 1台ずつ切離す、DI isolation。protective earthは外さない |
| buzz/高調波 | dimmer、switching supply、display、USB ground | cable位置、shield、別電源系統を安全に比較 |
| crackle | connector、dirty contact、buffer underrun | cableを動かさず交換、driver/buffer/CPU meter |
| digital click | clock master、sample rate、termination | cable/format、lock表示、1 master化 |
| feedback | open mic→speaker loop、aux return routing | mute、sendを下げる、loopを図示 |

### 10.3 swap testの読み方

左speakerから音が出ないとき、D/AのL/R出力cableをspeaker手前で入れ替えます。

- 無音が右speakerへ移った：speakerより上流に原因がある。
- 左speakerが無音のまま：左speaker、power、直前cableの可能性が高い。

一度に1か所だけ変え、元へ戻せるよう記録します。phantom、speaker level、bridge outputでは無造作にswapしません。

### Worked example 7：録音fileは正常、monitorだけ歪む

別headphone/interfaceで録音fileが正常なら、recording chainではなくmonitor chainを疑います。

1. Cubase stereo out meterがclipしていないか。
2. M2 USB return/main outが過大でないか。
3. active speaker input sensitivityとvolume。
4. speaker自身のlimiter/clip表示。
5. room内の物体が共振していないか。

録音をEQで直す前に、monitor系の問題を分離します。

### 理解確認 10

1. 左右cableを入れ替えて故障側が移ると、原因は交換点より上流/下流のどちらにある可能性が高いか。
2. hum対策で絶対に外してはいけないものは何か。
3. meterが動くのに無音なら、meterより前と後のどちらを優先して調べるか。

<details>
<summary>答えと考え方</summary>

1. 上流。交換したsignalに故障がついて移動したため。
2. AC mainsのprotective earth。
3. meterより後。meter位置まではsignalが来ている証拠になる。ただしmeter tap pointを確認する。

</details>

## 11. 章末ケース問題

### Case A：vocal cue

vocalistのheadphoneだけreverbを増やし、control room mixと録音fileは変えたくありません。必要なbusとtap pointを図で示してください。

<details>
<summary>解答例</summary>

vocal channelからpre-fader cue auxへdry vocalを送り、cue専用reverbへ別sendしてreturnをcue busへ加えます。record direct out/inputとmain mixは変更しません。小型systemでcue専用effect routingがなければ、Cubase Control Room等で別mixを作り、latencyを確認します。

</details>

### Case B：parallel compression

console channelを元のconverter inputへ残したままcompressorへも分岐したい。half-normal bayでどうpatchしますか。

<details>
<summary>解答例</summary>

normal source側の上段からcompressor inputへpatchし、元の下段normalを保持します。compressor outputは別converter inputへ入れ、DAW/console内でdryとcompressedを混ぜます。上段patchでnormalが保持される方向か、sourceが2つのloadを駆動できるかをbay manualで確認します。

</details>

### Case C：digital click

外部8ch converterをADATでinterfaceへ追加した直後からclickが出ました。sample rateは両方48 kHz表示です。確認順を書いてください。

<details>
<summary>解答例</summary>

1台だけをmasterにします。ADAT receiver側をADAT input clockへsyncさせるか、別word clockでslave化します。lock表示、optical formatがADATかS/PDIFか、sample-rate mode、cable、clock sourceを確認します。同じ数値表示でも独立internal clockなら同期していません。

</details>

### Case D：tapeの高域が片trackだけ弱い

analog multitrackのreproで1trackだけ高域が弱い。いきなりrecord EQを回さず、何から確認しますか。

<details>
<summary>解答例</summary>

head/tape pathの汚れ、tapeの傷、接触、既知のcalibration tapeでreproduce側level/azimuthを確認します。再生系が基準に合ってからrecord/bias/EQを調べます。recordingしたtapeだけの問題か、machine reproduce channelの問題かを分けます。

</details>

## 章末チェックリスト

- [ ] sourceから耳までのsignal flowを、analog/digitalの境界付きで描ける。
- [ ] mic、instrument、line、speaker levelを正しいinputへ結びつけられる。
- [ ] dBuとdBVの基準を説明し、+4 dBuを電圧へ換算できる。
- [ ] XLR 3pin、TS、TRSの代表的なpin/conductor assignmentを説明できる。
- [ ] connector形状とsignal formatを別々に確認できる。
- [ ] SC / LCとsimplex / duplexを別々の分類として説明できる。
- [ ] 4-band / 5-band抵抗の有効数字、乗数、許容差を読める。
- [ ] passive/active DIとground liftの役割を説明できる。
- [ ] normal、half-normal、thruを図から判別できる。
- [ ] half-normalの上段分岐と下段置換を説明できる。
- [ ] console stripをpreampからbusまで順に追える。
- [ ] insert、direct out、aux、group、VCA/DCAを混同しない。
- [ ] pre-fader cueとpost-fader effect sendを使い分けられる。
- [ ] PFL、AFL、SIPの違いと録音中のriskを説明できる。
- [ ] VU、peak、sample peak、true peak、LUFSの目的を区別できる。
- [ ] analog alignment levelと0 dBFSを同一視しない。
- [ ] tape transport、3種類のhead、sync、bias、EQを説明できる。
- [ ] wow、flutter、hiss、print-through、dropoutを区別できる。
- [ ] moving-coil driverのvoice coil、diaphragm、magnet、suspensionを説明できる。
- [ ] sealed / bass-reflex enclosureの役割を説明できる。
- [ ] passive dividing networkとactive channel dividerをsignal flowで区別できる。
- [ ] active/passive、2-way/3-way、bi-amp/BTLを区別できる。
- [ ] speaker/listenerの基本配置とroom mode/SBIRを説明できる。
- [ ] digital systemを1 master clockへ同期できる。
- [ ] troubleshootingで一度に1要素だけ交換し、故障範囲を半分ずつ狭められる。

## 出典・追加確認

本文は下記の公式規格・製造元資料・教育資料を参照して独自に構成しました。実機のrouting、pin assignment、最大level、安全条件は必ず該当modelのmanualを優先してください。

- [JAPRS：2026年度 サウンドレコーディング技術認定試験 出題範囲](https://www.japrs.or.jp/exam/soundrecording/range/)：studio system、console、tape recorder、monitor speaker、代表機器、規格の公式範囲。
- [JAPRS：公開過去問題・解答](https://www.japrs.or.jp/exam/soundrecording/past/)：2022〜2025年の形式と必要概念の確認用。問題文は本章へ転載していません。
- [JAPRS：2024年公開試験問題（PDF）](https://www.japrs.or.jp/pdf/srtest2024.pdf)：SC / LC、simplex / duplex、speaker enclosure、dividing network / channel dividerが公開範囲に含まれることの確認用。本文・選択肢は転載していません。
- [JAPRS：2025年公開試験問題（PDF）](https://www.japrs.or.jp/pdf/srtest2025.pdf)：monitor system、resistor color code等が公開範囲に含まれることの確認用。本文・選択肢は転載していません。
- [AES Standards Search：AES14を検索](https://aes2.org/publications/standards-search/)：professional audioのXLR polarity/pin convention。revisionは受験時点のcatalogで確認します。
- [AES Standards Search：AES48を検索](https://aes2.org/publications/standards-search/)：professional audio機器のshield/chassis接続。revisionは受験時点のcatalogで確認します。
- [IEC Webstore：IEC 61938:2018を検索](https://webstore.iec.ch/)：analog audio interface、source/load、phantom給電の国際規格「Multimedia systems — Guide to the recommended characteristics of analogue interfaces」。
- [IEC Webstore：IEC 61754-4（SC）/ IEC 61754-20（LC）を検索](https://webstore.iec.ch/)：fiber optic connector interfaceの形状規格。connectorと伝送formatは別に確認します。
- [IEC Webstore：IEC 60062を検索](https://webstore.iec.ch/)：resistor / capacitorのmarking codeとcolor code。実部品はdatasheetも照合します。
- [Neutrik NYS-SPP-L1 Patch Panel](https://www.neutrik.com/en/product/nys-spp-l1)：normal/half-normal等を切替できる代表的patchbayの製造元資料。
- [Yamaha MG Series XU Model Reference Manual](https://manual.yamaha.com/pa/mixers/mg_series_xu_model/en/)：preamp、HPF、aux、PFL、group、signal flowを実機で確認する資料。
- [Solid State Logic：ORIGIN User Guide](https://www.solidstatelogic.com/support-page/origin)：large-format analog consoleのrouting、bus、inline architectureを確認する製造元資料。
- [Yamaha：HS Series](https://usa.yamaha.com/products/proaudio/speakers/hs_series/index.html)：2-way、bass-reflex、bi-amplified、woofer / tweeterという実製品構成を確認する製造元資料。
- [ITU-R BS.1770](https://www.itu.int/rec/R-REC-BS.1770)：programme loudnessとtrue-peak測定algorithm。
- [EBU R 128](https://tech.ebu.ch/publications/r128)：broadcast loudness normalizationとmeter運用。音楽masterの固定目標ではありません。
- [Magnetic Reference Laboratory：Choosing and Using MRL Calibration Tapes](https://www.mrltapes.com/choo&u.pdf)：analog tape reproduce alignment、fluxivity、EQ、speedの技術資料。
- [Library of Congress：Care, Handling, and Storage of Audio Visual Materials](https://www.loc.gov/preservation/care/record.html)：magnetic mediaを含むrecording mediaの保存・取扱い。
- [MOTU：M2 Getting Started Guide](https://motu.com/m2-start)：M2のinput、48 V、direct monitoring、driverを確認する一次資料。
- [Steinberg：Cubase Pro 14 Operation Manual](https://www.steinberg.help/r/cubase-pro/14.0/ja)：Audio Connections、monitoring、Control Room、automationの一次資料。
