# オリジナル基礎模試 40問

これはJAPRS公式問題ではなく、公開出題範囲を参考に作った基礎確認です。公式試験の得点・rankを予測するものではありません。90分、資料なし、四者択一で解いてください。計算用紙は使用可。

## I. 音響・dB・デジタル音声

### 1

電圧amplitudeが2倍になったときのlevel差として最も近いものはどれか。

A. +3 dB  
B. +6 dB  
C. +10 dB  
D. +20 dB

### 2

powerが2倍になったときのlevel差として最も近いものはどれか。

A. +3 dB  
B. +6 dB  
C. +12 dB  
D. +20 dB

### 3

音速を343 m/sとしたとき、343 Hzの波長は約いくらか。

A. 0.1 m  
B. 0.5 m  
C. 1 m  
D. 10 m

### 4

理想的なfree fieldのpoint sourceから距離を1 mから2 mへ離した。direct soundの音圧level変化の概算として適切なのはどれか。

A. +6 dB  
B. +3 dB  
C. -3 dB  
D. -6 dB

### 5

dBについて正しいものはどれか。

A. どのdB表記も同じ絶対量を示す  
B. dBは比率で、dBFSやdB SPLは基準が異なる  
C. +6 dBは常に人間に2倍の大きさに聴こえる  
D. dBFSは空気中の音圧を直接示す

### 6

sample rateが48 kHzのPCM systemについて、Nyquistの考え方に最も合うものはどれか。

A. 理想的には24 kHz未満の帯域を扱う  
B. 48 kHzの正弦波を正確に記録する  
C. bit depthが48 bitになる  
D. latencyが必ず48 msになる

### 7

録音時に24-bitを使う主な利点として最も適切なのはどれか。

A. microphoneの周波数特性が平坦になる  
B. すべての音源が自動的に大きくなる  
C. 量子化noiseに対して余裕が大きく、headroomを取りやすい  
D. sample rate conversionが不要になる

### 8

ditherを使う典型的な場面はどれか。

A. 最終的にbit depthを下げるとき  
B. mic preampのgainを上げるとき  
C. feedbackを止めるとき  
D. MIDI timingを直すとき

### 9

MOTU M2のA/D変換前に入力がclipした録音について正しいものはどれか。

A. Cubaseのchannel faderを下げれば完全に元へ戻る  
B. 32-bit float projectなら必ず元へ戻る  
C. limiterを外せば完全に元へ戻る  
D. 後からfaderを下げても、変換時の歪みは消えない

### 10

複数のdigital audio機器を接続するとき、clock設定の基本として適切なのはどれか。

A. すべてを互いにmasterへする  
B. masterを1台決め、他を同期させる  
C. 各機器を異なるsample rateへする  
D. clockはanalog接続だけに必要である

## II. 電気音響・機器・録音

### 11

ASIO bufferを小さくしたときに一般に起こる傾向はどれか。

A. latencyは減るが、CPU負荷によるdropoutの危険が増える  
B. latencyもCPU負荷も必ず増える  
C. microphone感度が上がる  
D. bit depthが下がる

### 12

balanced接続の説明として適切なのはどれか。

A. 同じsignalの差動伝送を利用し、共通に乗ったnoiseを抑えやすい  
B. cableが短い時だけ電源を供給する方式  
C. stereo signal専用の方式  
D. speaker levelをmic levelへ変える方式

### 13

12 Vを4 Ωの抵抗へ加えたときの電流は何Aか。

A. 0.33 A  
B. 3 A  
C. 8 A  
D. 48 A

### 14

8 Ωの抵抗2本を並列接続した合成抵抗はどれか。

A. 2 Ω  
B. 4 Ω  
C. 8 Ω  
D. 16 Ω

### 15

48 V phantom powerの扱いとして最も適切なのはどれか。

A. すべてのdynamic micへ音量を上げる目的で必ず入れる  
B. 接続機器の対応を確認し、monitor levelを下げて切り替える  
C. speaker outputへ送る  
D. USBのlatencyを減らすために使う

### 16

microphone方式について正しいものはどれか。

A. condenser micはどの機種もdynamic micより必ず優れている  
B. dynamic micはphantom powerでのみ動作する  
C. 方式だけでなく、指向性、感度、最大SPL、self-noise等も確認する  
D. ribbon micはすべてphantom powerに同じ耐性を持つ

### 17

cardioid micを音源へ近づけたときに起こり得る現象はどれか。

A. proximity effectによる低域増加  
B. sample rateの低下  
C. bit depthの増加  
D. MIDI jitterの減少

### 18

polarityとphaseの説明として適切なのはどれか。

A. polarity reverseはsignalの正負を一括反転し、phase関係は周波数と時間差でも変わる  
B. どちらも常に同じ意味である  
C. phaseはdigital audioには存在しない  
D. polarity reverseは必ず音を無音にする

### 19

XY stereo pairの特徴として最も適切なのはどれか。

A. capsuleを離して大きな時間差だけでstereoを作る  
B. capsuleを近接させ角度差を使い、時間差を小さくしやすい  
C. omnidirectional micでなければ使えない  
D. monoへすると必ず完全に無音になる

### 20

passive electric guitarをMOTU M2へ直接録る場合、一般に適切な入力はどれか。

A. speaker input  
B. word-clock input  
C. Hi-Z / instrument input  
D. MIDI input

## III. ミキシング

### 21

static mixの最初の作業として最も適切なのはどれか。

A. すべてのtrackへlimiterを挿す  
B. fader、pan、clip gain、polarityで曲の優先順位を作る  
C. masterを0 dBFSへ固定する  
D. referenceより必ず大きくする

### 22

EQのQを高くすると一般にどうなるか。

A. 対象bandが狭くなる  
B. 対象bandが広くなる  
C. outputが必ずmonoになる  
D. phaseが存在しなくなる

### 23

compressorのattackを非常に速くしたときに起こり得る変化はどれか。

A. transientが強く抑えられる  
B. sample rateが上がる  
C. stereo widthが必ず広がる  
D. noiseが必ず消える

### 24

compressorのreleaseが曲に対して長過ぎる場合に起こり得ることはどれか。

A. 次の音が来てもgain reductionから戻らず、energyが抑えられ続ける  
B. microphoneのpolar patternが変わる  
C. bit depthが増える  
D. file名が変わる

### 25

compressorをbypass比較するときに重要なことはどれか。

A. processed側を必ず大きくする  
B. output loudnessをおおむね揃え、音量差の好みを減らす  
C. meterを見ずに0 dBFSへする  
D. attackとreleaseを同じ数値へする

### 26

複数trackで同じreverb空間を共有したい。管理しやすい方法はどれか。

A. FX channelへreverbを置き、各trackからsendする  
B. すべてのeventを削除する  
C. audio interfaceを外す  
D. MIDI noteをtransposeする

### 27

120 BPMで四分音符delayを作る場合の開始値はどれか。

A. 120 ms  
B. 250 ms  
C. 500 ms  
D. 1,000 ms

### 28

reverbのpre-delayを長くする主な効果の一つはどれか。

A. dry音と残響の開始を時間的に離し、明瞭度や距離感を変える  
B. bit depthを増やす  
C. microphoneへphantom powerを送る  
D. tempoを自動検出する

### 29

mono compatibility確認の目的として適切なのはどれか。

A. stereoを禁止するため  
B. mono再生で重要要素やlow endが消えたり大きく変わったりしないか調べるため  
C. file sizeを必ず半分にするため  
D. compressorを不要にするため

### 30

automationの用途として最も適切なのはどれか。

A. phraseごとのvocal levelやeffect sendを時間軸で整える  
B. A/D変換前のclipを完全修復する  
C. cableの断線を修理する  
D. 著作権を自動取得する

## IV. マスタリング・音響設計・権利・仕事

### 31

true peak meterがsample peak meterと異なる点はどれか。

A. sample間に生じ得る再構成波形のpeakを推定する  
B. 楽曲の著作権者を表示する  
C. tempoだけを測る  
D. microphoneの感度を測る

### 32

integrated loudnessの説明として最も適切なのはどれか。

A. programme全体の平均的loudnessをgate付きで示す指標  
B. 最も大きい1 sampleだけの値  
C. cableの抵抗値  
D. roomの残響時間そのもの

### 33

masteringについて適切なのはどれか。

A. すべてのpre-masterは必ずpeak -6 dBFSでなければならない  
B. limiterで大きくすることだけがmasteringである  
C. 音、曲間、format、metadata、QCまで含む最終工程である  
D. mixを聴かずに数値だけで完成できる

### 34

16-bit delivery fileを作るため、24-bit masterからbit depthを下げる。一般的な処理順として適切なのはどれか。

A. ditherを最初に何度も加える  
B. 最終段で必要なditherを1回使う  
C. MP3へしてからWAVへ戻す  
D. sample rateを0 Hzへする

### 35

sound isolationとroom acoustic treatmentの違いとして適切なのはどれか。

A. isolationは内外への伝搬を抑え、treatmentは室内の反射やdecayを整える  
B. どちらもEQ pluginだけで行う  
C. absorption panelを1枚置けば完全防音になる  
D. isolationはheadphoneにだけ必要である

### 36

小さな直方体roomで特定の低音だけが場所により大きく変わる主な原因候補はどれか。

A. room mode  
B. MIDI velocity  
C. metadata  
D. phantom power

### 37

録音studioの空調計画で音響上重要なことはどれか。

A. noiseと振動を抑えながら換気・温度を維持する  
B. fanを常に最大にしてnoiseは後で全て消す  
C. 換気を完全に止める  
D. sample rateだけで空調noiseを防ぐ

### 38

他人の楽曲を自分がmixした場合の公開権について適切なのはどれか。

A. mix作業をしたので無条件に全世界へ公開できる  
B. DAWを所有しているので権利確認は不要  
C. composition、performance、master、素材license等の権利と許可を確認する  
D. 音量を変えれば必ず新しい著作物として自由に使える

### 39

録音sessionのassistantとして最も適切な行動はどれか。

A. 問題を隠し、終了後まで報告しない  
B. file名とbackupを整え、問題は早く正確に報告する  
C. 演者の許可なく未発表音源を公開する  
D. 自分の音作りをproducerの指示より常に優先する

### 40

作品集の説明として最も信頼されやすいものはどれか。

A. 「全部自分が完璧にやった」とだけ書く  
B. plugin一覧だけを載せる  
C. 担当範囲、制約、問題、判断、検証、他者のcreditを明示する  
D. 市販曲のstemを無断で再配布する

## 回答欄

| 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |  |  |  |  |

| 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |  |  |  |  |

| 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |  |  |  |  |

| 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |  |  |  |  |

