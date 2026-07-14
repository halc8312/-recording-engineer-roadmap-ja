# 01 オーディオ基礎：信号経路、音、dB、デジタル音声

## 学習目標

- 音がMOTU M2を通ってCubaseへ入り、再び耳へ届くまでを説明する。
- dBを「絶対値」ではなく比率として扱い、dBFSなど基準付きの単位と区別する。
- sample rate、bit depth、buffer、clock、ditherの役割を説明する。
- 録音時のクリップと、DAW内部のフェーダー操作の違いを理解する。

## 1. 信号経路 {#signal-flow}

典型的な録音経路は次のとおりです。

`声/楽器 → 空気/ケーブル → マイクまたはDI → M2プリアンプ → A/D変換 → USB/ASIO → Cubase入力bus → audio track → group/FX → stereo out → D/A変換 → headphone/monitor → 耳`

重要なのは、音量を変えられる場所が複数あることです。M2のGAINはA/D変換前、Cubaseのchannel faderは録音済みデータの再生側です。録音後にフェーダーを下げても、A/D変換時に起きたクリッピングは直りません。

### レベルの種類

- mic level：マイクから出る小さな信号。プリアンプで増幅する。
- instrument / Hi-Z：パッシブギターやベースのような高インピーダンス信号。
- line level：機器間で使う、micより大きい信号。
- speaker level：パワーアンプからスピーカーを駆動する大きな信号。M2のline入力へ入れない。

端子の形が同じでも信号の種類は同じとは限りません。XLR/TRSコンボ端子では、接続先とM2側の入力モードを確認します。

## 2. gain staging

目的は「常に大きく録ること」ではなく、ノイズに埋もれず、予想外のピークにも耐え、後段で処理しやすい状態にすることです。

24-bit録音では十分な実用ダイナミックレンジがあります。演者に本番最大音量で演奏してもらい、赤表示や0 dBFSへ近づける競争をせず、安定した余裕を残します。予測しにくい演奏ほどheadroomを多く取ります。

録音前に確認する順番：

1. 接続と入力種別
2. ファンタム電源の要否
3. 本番最大音量
4. M2の入力メーター
5. Cubaseの入力メーター
6. direct monitoring / software monitoringの二重音がないか
7. headphone cueとclick

## 3. 音の基本 {#sound-basics}

- frequency：1秒あたりの周期数。単位Hz。音高と関係するが、音色は倍音・包絡・ノイズ成分などにも左右される。
- amplitude：波の大きさ。電圧、音圧、デジタルsample値など、何を測るかで意味が変わる。
- period：1周期の時間。`T = 1 / f`。
- wavelength：`波長 = 音速 / 周波数`。室温付近の音速を約343 m/sとして概算できる。
- phase：周期上の位置関係。時間差や周波数によって関係が変わる。
- polarity：正負を一括で反転する操作。位相と同義ではない。

## 4. dB {#decibels}

dBは比率を対数で表す単位です。何を基準にしているかで意味が変わります。

- 電圧や振幅の比：`20 log10(A2 / A1)`
- 電力の比：`10 log10(P2 / P1)`
- 振幅が2倍：約+6.02 dB
- 振幅が半分：約-6.02 dB
- 電力が2倍：約+3.01 dB

代表的な基準付き表記：

- dBFS：デジタルfull scaleを0とする。通常の固定小数点PCMでは0 dBFSを越えて保存できない。
- dB SPL：20 µPaを基準にした音圧レベル。
- dBu：0.775 Vrmsを基準にした電圧レベル。

「+6 dBなら人間に必ず2倍の大きさに聴こえる」のような単純化は避けます。知覚は周波数、時間、音色、再生音量、個人差に影響されます。

## 5. デジタル音声 {#digital-audio}

### sample rate

1秒間に何回標本化するかを表します。Nyquistの考え方では、理想的にはsample rateの半分未満の帯域を表現します。44.1 kHzと48 kHzは用途・納品仕様で選び、プロジェクト途中で無目的に変えません。

### bit depth

量子化の細かさとnoise floorに関係します。理想的な量子化雑音を前提とした概算ダイナミックレンジは `約6.02N + 1.76 dB`。録音は24 bitを基本にすると、適切なheadroomを取りやすくなります。

### 32-bit float

Cubase内部の演算に大きな余裕があっても、M2のA/D変換前にクリップした音は救えません。また、最終的なD/Aや固定小数点ファイルの出力では0 dBFSを意識します。

### clockとjitter

digital audio機器はsampleのタイミングをclockで共有します。M2だけをUSB接続する基本構成では複雑な外部clock設定は不要です。複数のdigital機器を接続するときは、masterを1台にして他を同期させます。

### bufferとlatency

- 小さいbuffer：latencyが小さく録音しやすいが、CPU負荷によるdropoutが起きやすい。
- 大きいbuffer：mixで多数のpluginを使いやすいが、software monitoringの遅延が増える。

録音時とmix時でbufferを変えることは正常な運用です。M2のdirect monitoringを使う場合は、Cubase側の同じ入力monitorを重ねて二重音にしないよう確認します。

### file format

- WAV/BWF：録音・編集・納品で一般的な非圧縮PCM。BWFはtimecode等のmetadataを持てる。
- FLAC：可逆圧縮。用途と相手側対応を確認。
- MP3/AAC：非可逆圧縮。確認用には便利だが、録音素材や編集masterの保存形式にはしない。

### dither

bit depthを下げるとき、量子化誤差を耳障りな歪みとして相関させないために微小なnoiseを加えます。単純な制作workflowでは通常、最終段で必要なbit depthへ落とす時に1回だけ使います。途中で固定小数点へ再量子化する特殊な工程がある場合は、その工程ごとに設計が必要です。24-bitのまま納品するなら、理由なく16-bit ditherを入れません。

## 理解確認

1. M2のGAINとCubaseのfaderは、信号経路上のどこが違うか。
2. 24-bit録音で0 dBFSぎりぎりを狙う必要がない理由は何か。
3. amplitudeが4倍なら何dBか。
4. 48 kHz projectを44.1 kHzで納品するとき、どの工程が必要か。
5. 32-bit floatでも防げないクリッピングは何か。
