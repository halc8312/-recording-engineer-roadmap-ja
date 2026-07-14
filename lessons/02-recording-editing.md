# 02 録音と編集：マイク、部屋、位相、演奏、データ管理

## 学習目標

- マイクの方式・指向性・距離を、音源と部屋に合わせて選ぶ。
- polarity、phase、time alignmentを区別して判断する。
- MOTU M2の2入力を制約ではなく、配置とオーバーダブを学ぶ道具として使う。
- 録音からバックアップまで、再現できる手順を残す。

## 1. 録音は音源から始まる

録音前に直す順序は、演奏、楽器、部屋、マイク位置、gain、最後にpluginです。弦、チューニング、ドラムヘッド、ノイズ源、譜面、テンポ、構成を先に確認すると、mixでの修復作業が減ります。

## 2. マイクの基本 {#microphone-basics}

### 方式

- dynamic：丈夫で大音圧に使いやすいものが多い。感度や高域特性は機種ごとに違う。
- condenser：一般に感度が高く、48V phantomを必要とする機種が多い。対応を必ず確認。monitor音量とinput gainを下げ、接続後にON、OFF後は放電を待ってから抜く。
- ribbon：構造・phantom耐性・preamp要件が機種ごとに異なる。説明書なしに扱わない。

方式だけで音を決めつけず、frequency response、polar pattern、sensitivity、maximum SPL、self-noise、用途を確認します。

### 指向性

- cardioid：正面を中心に収音。背面の抑え方は周波数で変わる。
- omnidirectional：全方向。pressure型では一般にproximity effectがない。
- figure-8：前後を収音し、側面を強く抑える。M/SやBlumleinにも使う。

directional micを近づけると低域が増えるproximity effectが起こり得ます。EQの前に距離を試します。

## 3. マイク位置 {#microphone-placement}

距離は、direct soundとroom sound、低域、高域、演奏ノイズの比率を変えます。1 cmの差でも高域やcomb filteringが変わることがあります。

### 1本で録る実験

1. まず耳で部屋を歩き、自然に聴こえる位置を探す。
2. 近接、標準、遠方の3点を録る。
3. 同じ演奏が難しければ、speakerから同じ音を再生して比較する。
4. clip gainで音量をそろえて判断する。

### 2本で録るとき

M2は2入力なので、stereo pair、close＋room、vocal＋guitar、DI＋micなどに使えます。

- XY：capsuleを近づけ角度差でstereoを作る。時間差が小さくmono互換を得やすい。
- spaced pair：幅と空間を得やすいが、時間差によるcomb filteringを確認する。
- close＋room：混ぜる前にpolarity、時間差、低域の増減を確認する。
- DI＋amp mic：波形を目で合わせるだけでなく、耳とmonoで確認する。

3:1 ruleは、複数音源・複数mic間のleakを減らす出発点であり、物理法則の万能解ではありません。

## 4. polarityとphase {#polarity-phase}

- polarity reverse：波形の正負を全体に反転。180°の一定操作。
- phase relationship：周波数ごとに変わり得る時間的関係。
- time alignment：片方を時間方向に動かす。すべての周波数へ同じ角度を与えるわけではない。

判断手順：

1. 2本を同音量でmono再生。
2. polarity reverseを試し、低域と芯の変化を聴く。
3. 数sample〜数ms動かす場合は、改善した帯域と悪化した帯域の両方を見る。
4. stereoの広がりを守ることとmonoの安定性を比較する。
5. 「波形がきれいに見える」だけで決めない。

## 5. MOTU M2での現実的なバンド録音

### オーバーダブ案

1. clickとguideを作る。
2. guitar/bass DIまたは仮演奏を録る。
3. drumは外部studioのmulti-track、電子drum、または2 micの演奏を使う。
4. bass、guitar、vocal、chorus、overdubを順番に録る。
5. 最後に不要なguideを外す。

利点は編集と音作りの自由度。欠点は一体感を失いやすいことです。演者同士が見える、同じ部屋でguideを弾く、完成像を共有するなどで補います。

### 一発録り案

M2の2入力でstereo room録音、または主要2音源だけを録り、デモやライブ感の作品にします。全楽器を独立mixできないため、演奏バランスと配置がmixになります。

## 6. 編集 {#editing}

編集は演奏の意味を守りながら、不要な問題を除く作業です。

- comp：複数takeから選ぶ。音色・距離・emotionの連続性も見る。
- crossfade：edit点のclickを防ぎ、呼吸やdecayを自然につなぐ。
- clip gain：plugin前に大きな差を整える。
- timing edit：gridへ全て吸着させず、grooveの基準音と意図を決める。
- pitch edit：音程だけでなくformant、transition、vibrato、artifactを確認する。
- noise cleanup：無音化し過ぎるとroom toneが不自然になる。必要なら一貫したroom toneを残す。

## 7. セッション管理 {#session-management}

最低限の命名例：

`01_Kick_In` / `02_Kick_Out` / `10_Bass_DI` / `20_Gtr_L` / `30_LeadVox`

保存例：

`SongName_2026-07-14_Tracking_v01.cpr`

作業の節目ごとに `Save New Version` を使い、上書きだけで進めません。録音後すぐに、project backupまたはaudio fileを別driveへ複製します。最低でも「作業中のPC」と「別媒体」の2か所、重要録音は3 copies・2種類の媒体・1 copyを別場所に置く3-2-1 backupを目標にします。

引き渡し時は、sample rate、bit depth、tempo、time signature、bar 1または同一time origin、track名、dry/wet、tuning、notesを揃えます。

## 録音前チェック

- [ ] 曲名、BPM、拍子、key、構成
- [ ] 誰が最終判断するか
- [ ] 入力割当とphantomの要否
- [ ] cable、stand、pop filter、headphone
- [ ] drive空き容量とbackup先
- [ ] 最大音量でlevel check
- [ ] cueとclick
- [ ] 10秒test recordingを再生確認
- [ ] take sheetと時刻
- [ ] 公開・クレジット・支払条件
