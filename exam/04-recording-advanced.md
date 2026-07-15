# 04 録音技術・映像同期・マルチチャンネル

## この章の目標

- stereo収音を「方式名の暗記」ではなく、**レベル差・時間差・位相差**から説明する。
- orchestra、rhythm section、dubbing、live recordingで、main mic・spot mic・ambience micの役割を選べる。
- mixdownとmasteringを、制作工程と納品責任の違いから区別する。
- timecode、word clock、genlockを混同せず、映像と音声の同期手順を説明する。
- 5.1と22.2のchannel構成、LFE、bass management、downmixを説明する。
- direct / diffuse surround、Fukada Tree、fly-over、高さ収音を、再生構造とmic配置から説明する。

この章は[JAPRSの2026年度公開出題範囲](https://www.japrs.or.jp/exam/soundrecording/range/)と2022〜2025年の公開問題から、繰り返し現れる概念を抽出して独自に構成しています。公式問題の文章・選択肢・公式教材の説明は転載していません。

## 1. 録音方式を三つの軸で整理する

録音方式の名前を覚える前に、次の三つを分けます。

| 軸 | 主な選択 | 判断すること |
| --- | --- | --- |
| channel数 | mono / stereo / multichannel | 再生時に何本の独立信号を使うか |
| trackの作り方 | 同時録音 / multitrack / overdub | 後から個別調整できる範囲 |
| stereo手掛かり | level差 / 時間差 / 両方 | 定位、幅、mono互換、部屋の量 |

**channel**は伝送・再生の独立経路、**track**は記録・編集上の単位です。24 tracksで録音した曲を2 channelsのstereoにmixdownすることもあります。

### direct、early reflection、reverberation

- **direct sound（直接音）**：音源からmicへ最短経路で届く音。
- **early reflection（初期反射音）**：壁や床などで1回〜数回反射し、比較的早く届く音。
- **reverberation（残響音）**：多数の反射が密になり、個々の反射を分離しにくくなった音。

micを音源へ近づけるほど、一般には直接音の割合が増えます。遠ざければ部屋の割合は増えますが、良い響きになるとは限りません。距離は音量だけでなく、直接音と反射音の比、周波数特性、他楽器の被りを変えます。

## 2. pair microphone収音

2本のmicでstereoを作る方式を、capsule間の距離で大別します。

### coincident pair：ほぼ同一点

2本のcapsuleを可能な限り近づけ、主に指向性による**level差**で方向を表します。mic間の到達時間差が小さく、一般にmonoへまとめた時の崩れを抑えやすい方式です。

| 方式 | 構成 | 主な特徴 | 注意点 |
| --- | --- | --- | --- |
| X/Y | 同特性の単一指向性2本を交差 | level差中心。定位が安定しやすい | 角度が狭すぎると幅も狭い |
| Blumlein | figure-8を90°で交差 | 前後を含む自然な空間表現 | 背後の音・空調音も拾う |
| M/S | 正面向きMid＋横向きfigure-8 Side | 後から幅を調整しやすい | decodeとpolarityを理解する |

M/Sの基本decodeは次です。

```text
Left  = Mid + Side
Right = Mid - Side
```

`- Side` はSideのpolarityを反転した信号です。Side levelを上げると幅が増えますが、monoではLeftとRightのSideが相殺され、Midが中心に残ります。幅を過大にするとstereoで中抜けや不自然な側方感が起こり得ます。

### near-coincident pair：少し離して角度も付ける

mic間に小さな距離があり、level差と時間差の両方を使います。ORTFは代表例で、cardioid 2本を約17 cm離し、開き角を約110°にする出発点です。実際の設置ではcapsule位置を基準に測ります。

coincidentより広がりや空気感を得やすい一方、monoにした時は時間差によるcomb filteringを確認します。

### spaced pair：間隔を取る

A/Bは、2本のmicを離して主に到達**時間差**を得る方式です。omnidirectionalがよく使われますが、目的により別の指向性も使えます。低域の伸びと空間感を得やすい反面、間隔を広げすぎると中央が薄く感じたり、monoで周波数ごとの加算・相殺が起きたりします。

### よく混同する点

- **polarity reverse**：波形の正負を全帯域で反転する操作。
- **time delay**：信号全体を時間方向へ移動する操作。位相角は周波数により変わる。
- **phase difference**：同じ周波数成分どうしの周期内の位置関係。
- **comb filtering**：少し遅れた同系統の音が加わり、周波数ごとに強め合いと弱め合いが並ぶ現象。

micを足した時に「細くなる」なら、まず同じ音源への到達時間、polarity、距離、反射を調べます。波形を見た目だけで完全一致させると、本来のstereo時間差や奥行きを失う場合があります。

::: tip 2入力でできる比較実験
MOTU M2へ2本のmicを接続し、同じ演奏をX/Y、間隔20 cm、間隔60 cmで録音します。各takeを同じloudnessにそろえ、stereoとmonoの両方で中央像、低域、残響、被りを記録してください。
:::

## 3. orchestraとacoustic ensemble

orchestra録音では、1本ずつの楽器をclose micで集めるだけでは、客席で聴く一体感、奥行き、hallの響きを作りにくくなります。基本は次の階層で考えます。

| mic群 | 役割 | 典型的な判断 |
| --- | --- | --- |
| main pair / main array | ensemble全体、定位、奥行きの土台 | conductor位置付近でbalanceと響きを探す |
| spot / accent mic | 弱いsection、solo、明瞭度を補助 | mainを置き換えず、必要量だけ足す |
| ambience / room mic | hallの後方・側方の反射と包囲感 | 客席音、拍手、残響、noiseを確認 |

**spot mic**は狙うsectionを分離しやすい単一指向性が出発点になり、**ambience mic**は空間全体を自然に受ける指向性・位置を選ぶことが多い、という役割の違いがあります。ただし「必ずこの指向性」という法則ではありません。

### spot micを混ぜる時の時間差

遠いmain micには、近いspot micより音が遅れて届きます。mixで同時に再生すると、spotが先に聞こえ、音像が前へ飛び出すことがあります。

音速を約343 m/sとすれば、距離差1 mは約2.9 msです。

```text
遅延時間 [s] = 距離差 [m] ÷ 音速 [m/s]
```

spotを機械的にmainへ完全整列させるのではなく、定位、音色、演奏の明瞭度、残響のつながりを聴いて決めます。先行音効果により、先に届く音が定位を強く支配することも重要です。

### Fukada Tree：7本を一つの大きなメインアレイとして考える

**Fukada Tree**は、orchestra全体とhall音響を一体で捉えるsurround main arrayの考え方です。代表的な構成では、L / C / RとLs / Rsに対応する5本のdirectional micで前後・front 3ch間のseparationを作り、左右に2本のomnidirectional micを加えて側方のつながりとambienceを補います。

```text
                 orchestra / stage

          L         C         R       directional
       Omni-L                         Omni-R
              Ls             Rs       directional

                    hall rear
```

これは7本のclose micを別々に足す発想ではなく、**適切なdirect / reverberant balanceが得られる位置へ置く「大きなone-point mic」**として扱う発想です。**critical distance（臨界距離）**は、音源から届くdirect soundと、室内のreverberant soundがおおむね同程度になる距離です。実際の指向性、間隔、角度、高さは、編成とhallのcritical distance、客席noise、必要なfront / rear separationに合わせて決めます。図はchannelの関係を示す概念図で、固定寸法ではありません。

確認点は次です。

- rear micへorchestra direct soundが強く入りすぎると、後方へ音像が引かれ、front定位と透明度を損ないやすい。
- frontとrearを離しすぎると残響が遅れて別空間に聞こえ、近づけすぎるとchannel間相関が高まりseparationが弱くなる。
- omni 2本は「surround channelそのもの」と固定せず、front / side ambienceの補助として全channelのつながりを聴いて配分する。
- spacingによる時間差があるため、5.1だけでなくstereo / mono downmixでも低域、center像、残響を確認する。
- 大型barや高所riggingは荷重、落下防止、避難経路、会場許可を先に確認する。

### session前の準備

1. scoreと曲順から、大編成、solo、極端なpp〜ff、特殊楽器を確認。
2. stage plot、客席、mic stand、cable経路、避難経路を確認。
3. conductor・producerとtake番号、修正箇所の呼び方を統一。
4. 最大音量でheadroomを確認。小音量だけでgainを決めない。
5. 空調、照明、客席、譜面台、椅子、床振動のnoiseを録音して確認。

## 4. rhythm track recording

rhythm sectionでは、演奏者同士が同時にgrooveを作る利点と、各micへのbleedを後から調整しにくい欠点を交換します。

### drumの役割別mic

- close mic：kick、snare、tomなど個々のattackとbody。
- overhead：cymbalだけでなく、kit全体の像と左右関係。
- room mic：部屋のdecay、size、距離感。
- under/outer mic：別の面や距離から補助。polarityと時間差を必ず確認。

複数micでは「soloで良い音」より、全部を鳴らした時の合成結果が重要です。snare top/bottom、kick in/out、overhead/closeを順に足し、monoでも低域と中心像を確認します。

### bass、guitar、keyboard

| 音源 | 主な経路 | 利点 | 注意点 |
| --- | --- | --- | --- |
| electric bass | DI | 明確、再ampingしやすい | pickupの高impedanceを適切に受ける |
| bass/guitar amp | mic | speaker、cabinet、roomを含む | DIとの時間差・polarity |
| electric guitar | close mic＋room | attackと空間を別管理 | 他楽器のbleed、位相 |
| keyboard | line / DI | stereo出力を保てる | unbalanced長距離、level、ground loop |

DIとamp micを混ぜる時、amp側には電気・音響の遅れがあります。polarity反転と短いdelayの両方を試し、低域だけでなく中高域も確認します。

### isolationとcue

- isolationを増やすほど編集自由度は上がるが、演者間の視覚・音響的なつながりは減り得る。
- headphone cueは完成mixではなく、演奏に必要なtime、pitch、energyを届けるもの。
- latencyが演奏を乱す場合はbufferを小さくするだけでなく、direct monitoring、不要plugin停止、cue経路短縮を検討する。
- clickを大きくしすぎるとmicへ漏れ、演奏者のdynamicも硬くなることがある。

## 5. dubbing（overdub）

**overdub**は、すでに録音したtrackを再生しながら新しい演奏を別trackへ録ることです。日本の録音現場では「ダビング」と呼ばれる場合があります。完成音源を単にコピーする意味のdubbingとは文脈で区別します。

### 基本手順

1. tempo、拍子、key、sample rate、start位置を固定。
2. guide、click、必要な演奏をcue mixへ送る。
3. pre-rollを設け、演奏者が流れに入れるようにする。
4. punch-in/outでは前後を余裕を持って録る。
5. take、playlist、採用範囲、tuning、mic、gainを記録。
6. comp後はcrossfade、breath、decay、room toneを確認。

録音latencyをDAWが補正しても、monitoring経路の体感遅延が消えるとは限りません。また、誤ったdriver設定や外部digital機器のclock問題があると、長時間で位置がずれたりclickが入ったりします。

## 6. mixdownとmastering

### mixdown

multitrackから、最終的なchannel構成（多くはstereo）へbalanceを作る工程です。

- level、pan、EQ、dynamics、reverb、automation
- editingの最終確認
- vocal/instrumentの関係と曲の展開
- stereo/mono互換、headroom、bus処理
- stemやinstrumentalなど派生版の書き出し

### mastering

完成したmixを作品全体・媒体・納品仕様の視点で確認し、必要な最終処理とQCを行います。

- 曲間のtonal balanceと体感level
- peak、true peak、loudness、dynamic
- 曲順、曲間、fade、metadata
- sample-rate conversion、bit-depth変更、dither
- 納品fileを読み戻して全編QC

「vocalだけ大きすぎる」のようなtrack間問題は、可能ならmasteringで無理に直さずmixへ戻します。詳しい手順は[04 マスタリングと納品](/lessons/04-mastering-delivery)も参照してください。

## 7. live recording

liveではやり直しが難しく、録音品質と同じくらい**安全、冗長性、記録**が重要です。

### signalの取り方

| 方法 | 得られるもの | 主なrisk |
| --- | --- | --- |
| FOH consoleの2mix | 手軽、客席用balance | 会場で大きい音源がmix上小さい場合がある |
| direct out / splitからmultitrack | 後でmixできる | channel数、split、clock、gain責任が増える |
| 独立room pair | 客席、拍手、空間 | 明瞭度不足、観客noise |
| multitrack＋room | 自由度と臨場感 | data量、同期、backupが必要 |

FOHは会場の音を作り、recording mixは記録媒体上のbalanceを作ります。役割が異なるため、可能ならmic split後に別preamp/gainを持ちます。共有gainの場合は、誰が変更権限を持つか事前に決めます。

### 最低限の事故対策

- 本番前に全channelを録音・再生してpatchを確認。
- storage残量、file分割、電源、clock、sample rateを確認。
- 可能なら別系統の2mix recorderを回す。
- 開演前から録り、終演後の余韻・拍手まで止めない。
- takeではなく時刻とset listでmarkerを打つ。
- audience micのstand、cable、電源を避難経路へ出さない。
- 終演直後にfileを閉じ、別媒体へcopyし、開けることを確認。

## 8. timecodeと映像同期

### 三つの「同期」を分ける

| 信号 | 答える質問 | 代表例 |
| --- | --- | --- |
| timecode | 今は作品のどの位置か | SMPTE timecode、LTC |
| word clock | audio sampleをいつ刻むか | 48 kHz clock |
| video reference / genlock | video frameをいつ切り替えるか | black burst、tri-level sync |

同じtimecode表示でも、sample clockが別々なら長時間でdriftすることがあります。反対に同じword clockでも、timeline上の開始位置はtimecodeがなければ分かりません。

### timecodeの読み方

```text
HH:MM:SS:FF
時 : 分 : 秒 : frame番号
```

代表的なframe rateには23.976、24、25、29.97、30 fpsなどがあります。project開始時に、**rateだけでなくdrop-frame / non-drop-frame**も確認します。

29.97 fpsのdrop-frame timecodeは、実時間との表示差を小さくするため、一定規則で**frame番号を飛ばします**。映像frameそのものを削除する方式ではありません。一般に区切りを `;` で表すことがあります（例 `01:00:00;00`）。

### 実務の同期手順

1. picture file名、version、frame rate、timecode startを確認。
2. audio projectを指定sample rate・frame rateに設定。
3. reference pictureとguide audioを同じtimelineへ置く。
4. 2-pop、clapper、timecode等の同期基準を照合。
5. 冒頭だけでなく終端でもlip-syncを確認し、driftを検出。
6. picture差し替え時は変更listまたは新旧timecodeを記録。
7. 納品時にstart、duration、frame rate、channel/stem、loudness仕様を再確認。

**LTC（Longitudinal Time Code）**はtimecode情報をaudioのような連続波形で伝える方式です。通常の音としてspeakerへ送ったり、録音素材へ漏らしたりしません。**VITC**はvideo信号の垂直帰線期間を利用してtimecodeを運ぶ方式として発達しました。file制作ではcontainerやmetadataにtimecodeが入る場合もあります。

## 9. 5.1 channel surround

5.1の基本channelは次です。

| channel | 役割の例 |
| --- | --- |
| L / R | 前方左右、音楽の幅 |
| C | 前方中央、dialogueや安定したcenter像 |
| Ls / Rs | 左右surround、環境・包囲感 |
| LFE | 低域効果用の追加channel |

`.1`のLFE（Low Frequency Effects）は、すべての低音を入れる箱ではありません。主channelも本来はfull-rangeです。再生側が小型speakerの低域をsubwooferへ振り分ける**bass management**と、制作側がLFEへ送る判断を区別します。

ITU-R BS.775の基準配置では、聴取位置から等距離を基本とし、Cを0°としてL/Rはおよそ±30°、surroundはおよそ±100〜120°の範囲に置きます。実際の規格適合は最新版の原文と納品先仕様を確認してください。

### ダイレクトサラウンドとディフューズサラウンド

この対比は、まず**再生側でsurround音をどう届けるか**の違いです。

| 考え方 | 再生構造 | 得意な表現 | 注意 |
| --- | --- | --- | --- |
| direct surround | Ls / Rs等の少数speakerを基準位置へ向け、各channelを直接届ける | 個別音の方向、移動、細かな定位 | listening position外でlevel・arrival timeが変わりやすい |
| diffuse surround | side / rearへ複数speakerを分散し、広い範囲へ同系統のsurroundを届ける | 包囲感、hall ambience、広い客席coverage | pinpoint定位は曖昧になり、speaker間の干渉も管理が必要 |

「direct音を録ったらdirect surround、残響を録ったらdiffuse surround」と一対一には決まりません。収音では、front mainの方向手掛かりと、rear / side ambienceの相関・到来時間を管理し、想定再生方式で包囲感と前後のつながりを確認します。

**fly-over**は、例えば効果音をfrontからside / rearへ連続panし、listenerを越えて移動する印象を作る表現です。diffuseな分散配置は広い席でつながりを滑らかにしやすい一方、1点を精密に追う軌道は弱くなります。水平5.1だけのfly-overはchannel間level / timingで作る前後移動であり、独立した高さchannelを持つ方式とは分けて考えます。

### 制作上の注意

- channel順はfile規格により異なるため、名前ではなく納品仕様で確認。
- polarity、delay、level、speaker距離をcalibrationする。
- centerを使う理由とphantom centerを使う理由を決める。
- surroundへ重要音を置く時は再生環境とdownmixを確認。
- LFEのband limitとmonitoring gainを規格・納品先に合わせる。
- stereo downmix時の係数、phase、dialogue、peakを確認する。

## 10. 22.2とimmersive audio

22.2 multichannel soundは、上下方向を含む三層のspeakerで三次元の音場を表現するchannel-based方式です。名称の内訳は**22本の主channel＋2本のLFE**です。

| 層 | 主channel数 | 主な位置の考え方 |
| --- | ---: | --- |
| upper layer | 9 | 上方の前・横・後、真上 |
| middle layer | 10 | 耳の高さの前・横・後 |
| lower layer | 3 | 前方下部 |
| LFE | 2 | 低域効果 |

5.1よりchannel数が多いだけでなく、高さ方向の移動、上方の反射、垂直方向の空間を表せます。日本の8K放送音声で採用された方式として知られます。

### 高さ情報を収音する

高さ対応制作では、ear-levelのmain arrayへ**height / overhead mic layer**を加え、天井・balcony・上方から届く反射と音源方向を独立trackへ記録する方法があります。大切なのは「micを高く上げる」ことと「高さchannelを作る」ことを区別することです。main mic全体を高くするとorchestra balanceやdirect / reverberant比が変わるだけで、必ずしも上下情報を分離できません。

設計・収録では次を確認します。

1. 再生layoutのupper / middle layerに対応するよう、micの方位と高さ関係を記録する。
2. 下層と上層のmicへ同じdirect soundが強く入る場合、arrival time、polarity、相関を測る。
3. 上層channelをsoloで派手にするのでなく、全channel再生で天井反射、包囲感、音色の連続性を判断する。
4. 5.1 / stereo downmixで過大level、comb filtering、残響の濁りが起きないか確認する。
5. 高所stand、吊りrig、cableには会場承認、落下防止、避難・視界・照明との調整が必要。

### channel-based、object-based、scene-based

- **channel-based**：各speaker channelへ音を割り当てる。5.1、22.2など。
- **object-based**：音声と位置・動き等のmetadataを渡し、rendererが再生配置に合わせる。
- **scene-based**：ある点を中心とした音場全体を成分として表し、再生側でdecodeする考え方。

方式が違っても、最終確認では定位、包囲感、timbral consistency、loudness、downmix、metadata、channel mappingを点検します。

## 11. 判断問題の解き方

試験で未知の方式名が出ても、次の順で整理します。

1. micのcapsuleは同一点か、離れているか。
2. stereoの手掛かりはlevel差か、時間差か、両方か。
3. main、spot、ambienceのどの役割か。
4. 録音中のtrack数と、納品channel数を分ける。
5. position情報、sample周期、video周期のどの同期か。
6. LFEとbass managementを分ける。
7. channel-basedか、metadataを使うobject-basedか。

## 理解確認

1. X/YとA/Bでは、stereoの主な手掛かりがどう違いますか。
2. M/S decode後の左右をmono合成すると、Side成分が消えるのはなぜですか。
3. main micより3 m音源に近いspot micがあります。到達時間差のおおよその値を求めてください。
4. orchestraでspot micを大きくしすぎると、どのような不自然さが起こり得ますか。
5. DIとamp micを混ぜた時、低域が減りました。最初に確認する三項目は何ですか。
6. timecodeとword clockの役割を一文ずつ説明してください。
7. drop-frame timecodeは映像frameそのものを間引きますか。
8. 5.1の`.1`は何を表しますか。bass managementとの違いも説明してください。
9. 22.2の「22」と「2」はそれぞれ何ですか。
10. liveでFOH 2mixだけを録る場合、会場では聞こえるのに録音で小さくなりやすい音源の例を説明してください。
11. direct surroundとdiffuse surroundを、speaker配置と定位の観点から区別してください。
12. Fukada Treeの5本のdirectional micと2本のomnidirectional micは、概念上どのように役割が違いますか。
13. 水平5.1のfly-overと、高さchannelを持つsystemの上下移動は何が違いますか。

<details>
<summary>解答例</summary>

1. X/Yは主に指向性によるlevel差、A/Bは主にmic間隔による到達時間差を使います。
2. decode後の左右ではSideが逆polarityなので、L+Rのmonoで相殺されるためです。
3. `3 ÷ 343 ≒ 0.00875 s`、約8.7 msです。
4. sectionだけが前へ飛び出す、ensembleの奥行きが崩れる、mainとの時間差で音色が変わる、などです。
5. polarity、到達時間差、両信号のlevelです。必要に応じてamp・speaker・変換経路も確認します。
6. timecodeはtimeline上の位置を示し、word clockはdigital audioのsampleを刻む周期をそろえます。
7. いいえ。実時間との表示差を補正するため、timecode上の一部の番号を飛ばします。
8. LFEという低域効果channelです。bass managementは再生側が主channelの低域をsubwooferへ振り分ける処理です。
9. 22本の主channelと2本のLFEです。
10. acoustic drumや大音量guitar ampは客席へ直接届くのでFOHであまり足されず、consoleの2mixでは小さくなる場合があります。
11. directは少数の基準speakerから個別channelを直接届けて定位を作り、diffuseはside / rearの複数speakerへ分散して広い範囲の包囲感を作ります。
12. 5本でfront 3chとfront / rearのseparationを作り、左右のomni 2本で側方のつながりとambienceを補うのが代表的な考え方です。
13. 水平5.1ではfront / surround間のlevel・timingで前後移動を作ります。高さ対応systemは独立したupper channelまたはobject位置を使い、垂直方向も表せます。

</details>

## 章末チェック

- [ ] coincident / near-coincident / spaced pairを図に描ける
- [ ] X/Y、A/B、M/S、Blumlein、ORTFの違いを説明できる
- [ ] main、spot、ambience micの役割を説明できる
- [ ] Fukada Treeを5本の方向性mic＋2本のomni補助という構造から説明できる
- [ ] distance差からmsを計算できる
- [ ] rhythm録音でDI、close、overhead、roomを組み合わせられる
- [ ] overdubのcue、pre-roll、punch、take管理を説明できる
- [ ] mixdownとmasteringを区別できる
- [ ] live録音の冗長性とdata backupを説明できる
- [ ] timecode / word clock / genlockを区別できる
- [ ] drop-frameの意味を説明できる
- [ ] 5.1の6 channelsとLFEを言える
- [ ] direct / diffuse surroundとfly-overを再生構造から説明できる
- [ ] 22.2の三層と22＋2の意味を言える
- [ ] main arrayを高くすることと独立した高さ収音layerを区別できる
- [ ] channel / object / scene-basedを分類できる

## 一次資料・規格

- [JAPRS：2026年度サウンドレコーディング技術認定試験 出題範囲](https://www.japrs.or.jp/exam/soundrecording/range/)
- [JAPRS：過去の問題・解答（2022〜2025年）](https://www.japrs.or.jp/exam/soundrecording/past/)
- [JAPRS：2023年公開試験問題（PDF）](https://www.japrs.or.jp/pdf/srtest2023.pdf)：Fukada Treeが公開範囲に含まれることの確認用。本文・選択肢は転載していません。
- [JAPRS：2025年公開試験問題（PDF）](https://www.japrs.or.jp/pdf/srtest2025.pdf)：direct / diffuse surroundとfly-overが公開範囲に含まれることの確認用。本文・選択肢は転載していません。
- [AES E-Library 10108：Akira Fukada, Multichannel Music Recording Based on Psychoacoustic Principles](https://www.aes.org/e-lib/browse.cfm?elib=10108)
- [ITU-R BS.775：Multichannel stereophonic sound system](https://www.itu.int/rec/R-REC-BS.775/)
- [ITU-R BS.2051：Advanced sound system for programme production](https://www.itu.int/rec/R-REC-BS.2051/)
- [ITU-R BS.2076：Audio Definition Model](https://www.itu.int/rec/R-REC-BS.2076/)
- [NHK放送技術研究所：22.2マルチチャンネル音響](https://www.nhk.or.jp/strl/english/technology/22-2-multichannel-sound/)
- [SMPTE：Time Code関連規格の検索](https://pub.smpte.org/)

規格は改訂されます。試験年度と納品先が指定する版を優先してください。
