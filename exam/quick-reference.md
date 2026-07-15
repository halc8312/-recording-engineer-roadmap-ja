# 試験直前クイックリファレンス

このページは、学んだ内容を短時間で**取り出せる状態にするための確認表**です。初めて学ぶための公式集ではありません。式を隠して条件を説明する、信号経路を紙に描く、混同欄を自分の言葉で言い直す、という順で使ってください。

> [!IMPORTANT]
> ここにある式は、理想化したモデルや特定の条件で成立します。問題文の「何を比べるか」「直流か交流か」「自由音場か室内か」「実効値かピーク値か」を先に確認してください。

関連：[音響・聴覚](/exam/01-acoustics-hearing)／[電気・回路](/exam/02-electricity-circuits)／[スタジオシステム](/exam/03-studio-systems)／[録音技術](/exam/04-recording-advanced)／[音楽・楽器](/exam/05-music-theory-instruments)／[権利・歴史・スタッフ](/exam/06-copyright-history-staff)／[スタジオ音響設計](/exam/07-studio-acoustics-design)

## 1. 式は「条件→式→単位」で思い出す

### 音・波・レベル

| 求めるもの | 式 | 成立条件・単位 | 混同しやすい点 |
| --- | --- | --- | --- |
| 周期 | `T = 1 / f` | `T` は s、`f` は Hz | kHzをHzへ直してから代入 |
| 波長 | `λ = c / f` | `λ` は m。空気中の `c` は温度などで変化し、20 ℃付近の目安は約343 m/s | 音速は周波数で決まる値ではない |
| 距離から到達時間 | `t = d / c` | `d` は m、`t` は s | 1 m差は約2.9 msという目安 |
| 時間差から位相角 | `φ = 360 f Δt` | `f` は Hz、`Δt` は s、`φ` は degree | 同じ時間差でも位相角は周波数ごとに違う |
| 電圧・音圧など振幅量の比 | `L = 20 log10(A2/A1)` | 同じ種類・同じ単位の量を比較 | 電力比の10 logと取り違えない |
| 電力比 | `L = 10 log10(P2/P1)` | `P1` と `P2` は同じ単位 | 電力2倍は約+3 dB、振幅2倍は約+6 dB |
| 音圧レベル | `Lp = 20 log10(p/p0)` | 空気中では通常 `p0 = 20 µPa` | dBだけでは基準が分からない |
| 無相関レベルの合成 | `LΣ = 10 log10(Σ 10^(Li/10))` | 独立した音源など、エネルギーを加える場合 | 同相の同一信号を電圧加算する場合とは別 |
| 点音源の距離減衰 | `L2-L1 = 20 log10(r1/r2)` | `r1`から`r2`へ移動。反射や吸収を無視できる自由音場の近似 | 室内・線音源・近接場へ無条件に使わない |
| うなり | `fbeat = |f1 - f2|` | 近い2周波数を同時に鳴らす | うなりの回数と各音の周波数を混同しない |
| cent差 | `cent = 1200 log2(f2/f1)` | 12平均律では100 centが半音 | Hz差が同じでもcent差は音域で変わる |
| 12平均律の周波数比 | `f2/f1 = 2^(n/12)` | `n` は半音数 | 12半音で2倍、7半音は完全5度相当 |

### 電気・交流・回路

| 求めるもの | 式 | 成立条件・単位 | 混同しやすい点 |
| --- | --- | --- | --- |
| 電流 | `I = Q/t` | A = C/s | 電子の移動方向と慣用電流の向きは逆 |
| オームの法則 | `V = IR` | 抵抗性の要素。V、A、Ω | kΩ、mAなどの接頭語を先にそろえる |
| 電力 | `P = VI = I²R = V²/R` | 後ろ2式は抵抗負荷。W | 電力Wと電力量Whは別 |
| 直列抵抗 | `RΣ = R1 + R2 + …` | 各抵抗に同じ電流 | 並列式と逆にしない |
| 並列抵抗 | `1/RΣ = 1/R1 + 1/R2 + …` | 各枝に同じ電圧 | 合成値は最小の抵抗より小さい |
| 無負荷の分圧 | `Vout = Vin × R2/(R1+R2)` | R2両端を出力とし、負荷電流を無視 | 負荷をつなぐとR2との並列合成が必要 |
| 正弦波の実効値 | `Vrms = Vpeak/√2` | 歪みのない正弦波 | 任意波形にはそのまま使えない |
| peak-to-peak | `Vpp = 2 Vpeak` | 正負対称の波形 | RMS、peak、peak-to-peakを区別 |
| 容量リアクタンス | `XC = 1/(2πfC)` | Ω。正弦波定常状態 | 周波数が上がると小さくなる |
| 誘導リアクタンス | `XL = 2πfL` | Ω。正弦波定常状態 | 周波数が上がると大きくなる |
| RC時定数 | `τ = RC` | RはΩ、CはF、τはs | cutoff周波数そのものではない |
| 1次RCのcutoff | `fc = 1/(2πRC)` | 理想的な1次回路 | `fc` では通過帯域より約3 dB低い |
| LC共振 | `f0 = 1/(2π√LC)` | 理想LCの近似 | 実部品の損失・寄生成分を無視している |
| 理想transformerの電圧比 | `V2/V1 = N2/N1` | `N` は巻数 | impedance比は巻数比の2乗 |
| 理想transformerのimpedance比 | `Z2/Z1 = (N2/N1)²` | 理想変圧器 | 電圧比と同じ比にしない |

### デジタル・テンポ・室内音響

| 求めるもの | 式 | 成立条件・単位 | 混同しやすい点 |
| --- | --- | --- | --- |
| 標本化可能な上限の境界 | `fN = fs/2` | 理想標本化のNyquist周波数 | 実機ではanti-alias filterの遷移帯域が必要 |
| sample数 | `N = fs × t` | `fs` は samples/s、`t` は s | sample rateとbit depthは別の軸 |
| 未圧縮PCMの概算データ量 | `fs × bit数 × channel数 × 時間` | bitを8で割るとbyte。header等は別 | file sizeとbit rateを混同しない |
| 4分音符の時間 | `60,000/BPM` | ms。4分音符=1拍の場合 | 6/8などではtempo記号の音価を確認 |
| 音符同期delay | `4分音符時間 × 音価係数` | 8分=1/2、付点=3/2、三連系は2/3を考える | dottedとtripletは逆方向 |
| 矩形室の軸mode | `f = c/2 × n/L` | 1方向だけを見る簡略式。`n=1,2,…` | 実室では3方向・斜めmodeと減衰も関係 |
| Sabineの残響時間 | `RT60 ≈ 0.161 V/A` | SI単位、十分拡散した音場を仮定。`V` m³、`A` m² sabin | 小室・偏った吸音・低域へ常に正確ではない |
| 等価吸音面積 | `A = Σ αi Si` | `α` は周波数別吸音率 | 吸音率と遮音性能は別 |
| D50 / Deutlichkeit | `D50 = E(0〜50 ms) / E(全時間)` | impulse responseの初期energy比。0〜1または% | 遮音の室間音圧level差を表すDとは別概念 |

### 接頭語と量の名前

| 記号 | 倍率 | 例 | 注意 |
| --- | ---: | --- | --- |
| `G` | 10⁹ | GHz | `g` ではない |
| `M` | 10⁶ | MΩ | 小文字`m`と10億倍違う |
| `k` | 10³ | kHz、kΩ | kiloは小文字`k` |
| `m` | 10⁻³ | ms、mV | milli |
| `µ` | 10⁻⁶ | µs、µF | micro。環境により`u`表記もある |
| `n` | 10⁻⁹ | nF | nano |
| `p` | 10⁻¹² | pF | pico |

`Hz` は1秒当たりの周期数、`s` は時間、`m` は長さ、`Pa` は圧力、`V` は電圧、`A` は電流、`Ω` は抵抗・impedance、`F` はcapacitance、`H` はinductance、`W` は電力です。同じ文字が文脈で別の意味になるため、**数値の直後は単位、式中は量記号**として読み分けます。

## 2. 信号経路を一本の線にする

### 基本の録音経路

```text
演奏・音源
  ↓ 空気中の音圧変化
microphone（音響→微小な電気信号）
  ↓ mic level
mic preamp（gain、必要ならphantom power）
  ↓ line level
A/D converter（anti-alias処理→sampling・quantization）
  ↓ digital audio
DAW track（record、edit、process、mix）
  ↓ stereo / multichannel bus
D/A converter
  ↓ analog line level
monitor controller / power amplifier
  ↓
speaker（電気→機械振動→空気中の音）
  ↓ 部屋と耳
判断
```

**録音経路**と**monitor経路**は途中で分かれます。録音fileに入ったnoiseなのか、再生側だけのnoiseなのかを切り分けるには、経路を上流から一段ずつsolo・bypass・差し替えします。

### cueを含む分岐

```text
input → preamp → A/D → DAW record track
             └→ direct monitor ┐
DAW playback / click ──────────┼→ cue mix → headphone amp → performer
DAW main mix → D/A → monitors ┘
```

低latency cueではdirect monitorを使うことがあります。ただし、同じ入力をdirect側とDAW return側で同時に重ねると、遅延差によるcomb filteringや二重音が起きます。

### 三つの同期を分ける

| 何をそろえるか | 代表語 | そろっていない時の症状 |
| --- | --- | --- |
| digital sampleの刻み | word clock / digital audio clock | click、dropout、sample rate不一致、長時間のずれ |
| 映像frameと時間位置 | timecode | 再生開始位置や編集位置が合わない |
| 映像機器の走査timing | genlock / video reference | frame境界が安定しない |

timecodeは音質を決めるsample clockそのものではありません。「時刻ラベルが同じ」ことと「同じ速さでsampleを刻む」ことを別々に確認します。[詳しくは第4章](/exam/04-recording-advanced)。

### levelと接続の混同を外す

| 用語 | 何を表すか | 覚えるより先に確認すること |
| --- | --- | --- |
| mic level | microphone直後の比較的小さい信号 | sourceの出力仕様とpreamp入力 |
| instrument level | passive guitar等の高impedanceな信号 | Hi-Z入力またはDIの要否 |
| line level | 機器間伝送を想定した信号 | nominal level、balanced/unbalanced、headroom |
| speaker level | power amplifier後の大電力信号 | line入力へ接続しない、負荷impedanceを確認 |
| balanced | 主に2本の信号導体を同等のimpedanceにし、差動受信する伝送 | stereoではない。shieldは別の役割。connector形状だけでは断定不可 |
| phantom power | 対称なmic線路を通じるDC給電方式 | 対応機器、配線、mute、接続順を確認 |
| ground | 電位の基準や安全接地など文脈のある語 | shieldと常に同義ではない |

### 高頻度の用語衝突

| 似た語 | 一文で区別 | 復習先 |
| --- | --- | --- |
| D50 / Deutlichkeit ↔ 遮音のD | D50は最初の50 msのenergy比、遮音Dは二室間のlevel差 | [07](/exam/07-studio-acoustics-design) |
| passive dividing network ↔ active channel divider | 前者はpower amp後のspeaker level、後者はamp前のline/digital領域で帯域分割 | [03](/exam/03-studio-systems) |
| SC / LC ↔ simplex / duplex | SC・LCは光connector形状、simplex・duplexはfiber / 光pathの系統数 | [03](/exam/03-studio-systems) |
| direct surround ↔ diffuse surround | 前者は少数の基準speakerで方向を明確にし、後者はside / rearへ分散して包囲感を広げる | [04](/exam/04-recording-advanced) |
| fly-over ↔ 高さlayer | fly-overは前後・側方へ連続移動する表現、高さlayerは上方の独立channel群 | [04](/exam/04-recording-advanced) |
| Fukada Tree | 代表構成は5本のdirectional mic＋2本のomni。front/rear separationと側方ambienceを組み合わせる | [04](/exam/04-recording-advanced) |
| Pult / プルト | 通常は1台の譜面台を共有する弦奏者2人の単位。mic本数そのものではない | [05](/exam/05-music-theory-instruments) |
| counterpoint ↔ homophony / homorhythm | 対位法は独立旋律の組合せ、homophonyは主旋律＋従属声部、homorhythmは各声部がほぼ同rhythm | [05](/exam/05-music-theory-instruments) |

## 3. 収音方式は「手掛かり」と「代償」で比べる

| 方式 | 構成の核 | 主なstereo手掛かり | 強み | 先に確認する弱点 |
| --- | --- | --- | --- | --- |
| X/Y | 近接した同種の指向性micを交差 | level差中心 | mono互換を保ちやすく定位が明確 | 角度と指向性で幅が変わる |
| Blumlein | figure-8を90°で交差 | level差中心 | 前後の空間を含む自然な像 | 背後の反射・noiseも拾う |
| M/S | 正面Mid＋横向きfigure-8 Side | matrix後のlevel差 | 録音後もSide量で幅を調整可能 | decode、polarity、過大なSide量 |
| ORTF | cardioid 2本、capsule間約17 cm・開き約110°を出発点 | level差＋時間差 | 明瞭な定位と自然な広がりの折衷 | mono時の干渉、実際のcapsule位置 |
| A/B | 2本を離す | 時間差中心 | 低域と空間感を得やすい | 中央の薄さ、mono時のcomb filtering |
| main＋spot | 全体像へ局所micを補う | 複数 | balanceを後から補助できる | 到達時間差、spotが前へ飛び出す |
| room / ambience | 音源から距離を取る | 反射・残響 | 奥行き、包囲感、客席感 | 空調・客席noise、過剰な残響 |

M/S decodeは `L = M + S`、`R = M - S`。monoへ合成すると理想的にはSideが相殺されます。「相殺するからSideが不要」ではなく、stereo幅を作りつつmono中心を保ちやすい構造です。

### microphoneの選択順

1. **音源と目的**：何の音を、どの距離感で、他の何から分けるか。
2. **指向性**：正面だけでなく側面・背面の音と部屋をどう扱うか。
3. **方式**：dynamic、condenser、ribbon等の変換原理と給電条件。
4. **性能**：最大SPL、self-noise、sensitivity、frequency response。
5. **実装**：stand、shock mount、pop filter、cable、視界、安全。

「condenserだから高音質」「dynamicだから大音量用」という一語判断は避け、個別modelの仕様と目的を照合します。[詳しくは第3章](/exam/03-studio-systems)。

## 4. 録音・mix・masteringの判断順

| 工程 | 主な目的 | 事故を減らす問い |
| --- | --- | --- |
| setup | 演奏と収音の条件を作る | stage plot、電源、避難経路、patch、予備は確認したか |
| gain staging | noiseとclipの間に余裕を取る | 本番最大音でmeterとmonitorを確認したか |
| recording | 後工程で必要な素材を確実に残す | file、take名、sample rate、backup、cueは正しいか |
| editing | 良いtakeを時間軸上で組み立てる | click、breath、decay、位相関係を壊していないか |
| mixing | 複数trackから意図したbalanceと空間を作る | fader・pan・muteだけで問題を特定したか |
| mastering | 完成mixを媒体・曲順・納品仕様へ整える | mix修正とmaster処理を取り違えていないか |
| delivery | 再現可能なfileとmetadataを渡す | format、head/tail、channel、命名、checksum、権利情報は合うか |

signal processorは名前より役割で分類します。

- EQ：周波数ごとのlevel関係を変える。
- compressor：検出条件に応じてdynamic rangeを扱う。thresholdだけでなくratio、attack、release、knee、make-up gainを見る。
- limiter：上限管理を主目的にした高ratio処理。clipを必ず無害化する装置ではない。
- gate / expander：小さい信号側のlevel関係を変える。releaseが短すぎるとdecayを切る。
- delay：時間をずらす。反復、奥行き、同期、干渉のいずれを狙うかを分ける。
- reverb：反射密度とdecayを模擬・付加する。pre-delayとdecay timeは別。

## 5. 音楽・譜面・楽器の最小確認

### scoreを読む順番

1. clef、key signature、time signature、tempo記号。
2. repeat、1st/2nd ending、D.C.、D.S.、Coda。
3. rehearsal markとbar番号。
4. dynamic、articulation、奏法、移調楽器。
5. take sheet上の呼び方を出演者・producerと統一。

| 対応 | 要点 | 混同ポイント |
| --- | --- | --- |
| octave | 周波数比2:1 | 12平均律では12半音 |
| dotted note | 元の長さ×3/2 | tripletの2/3と逆 |
| tie | 同じpitchの音価を連結 | slurはphrase・奏法の指示 |
| 6/8 | 8分音符6個、通常は3個ずつの2拍感 | clickの基準音価を確認 |
| transposing instrument | 記譜音と実音が異なる楽器 | scoreがconcert pitch表示か確認 |
| written range / sounding range | 記譜上／実音上の音域 | 「楽器の音域」は奏者・奏法でも変わる |

楽器は発音原理から整理します。

- 弦：弦の振動をbodyやpickupへ伝える。bowedとpluckedでattack・倍音の時間変化が違う。
- 木管：air reed、single reed、double reedなど。材質名だけで分類しない。
- 金管：唇の振動を管で共鳴させる。bell正面だけが楽器全体の音ではない。
- 打楽器：膜・板・棒・空洞などの振動。音高が明確なものと不明確なものがある。
- 鍵盤：鍵盤は操作interfaceであり、piano・organ・synthesizerでは発音原理が違う。
- 声：声帯の音源を声道でfilterする。歌手の向き、距離、pop、headphone bleedを同時に考える。

## 6. 権利は「曲・実演・原盤・利用行為」を分ける

```text
詞・曲という著作物 ── 著作者／著作権者
          ↓ 演奏・歌唱
実演 ───────────── 実演家
          ↓ 最初の固定
音源（レコード）───── レコード製作者
          ↓ 複製・配信・映像同期など
利用方法ごとに、関係する権利者・契約・管理状況を確認
```

| 問い | 確認するもの |
| --- | --- |
| 誰が曲を作ったか | 作詞・作曲・編曲、共同制作、出版契約 |
| 誰が演奏したか | 実演家、出演・録音・二次利用の同意や契約 |
| 誰が最初に音を固定したか | レコード製作者、制作費・原盤契約・master管理 |
| 何をするか | 録音、複製、頒布、配信、上映、放送、編曲など具体的な利用 |
| 誰が権利を管理しているか | 本人、音楽出版社、管理事業者、label等。推測せず確認 |
| どの国・期間・契約か | 保護期間、条約、地域、既存契約。最新の一次資料と専門家を確認 |

「自分たちで演奏したので曲の許諾は不要」「購入した音源なので自由に動画へ使える」「非営利なら常に自由」は、いずれも安全な一般則ではありません。試験では権利の層を分け、実務では利用前に管理状況と契約を確認します。現行法に関する参照先はページ末尾にまとめています。

## 7. 録音史は前後関係と変わった能力で押さえる

厳密な年は資料間の「発明・公開・商品化・普及」のどれを指すかで変わるため、まず次の順序と変化を説明できるようにします。

| おおまかな順序 | 技術・媒体 | 制作で変わったこと |
| ---: | --- | --- |
| 1 | 機械式の録音・再生 | 音を物理的な溝として固定・再生 |
| 2 | disc方式と複製 | 複製・流通に適したrecord生産が発展 |
| 3 | electrical recording | microphone、amplifier、loudspeakerを介した収録・再生 |
| 4 | magnetic tape | 消去、再録音、切り貼り編集、長時間録音が容易に |
| 5 | multitrack | 時間を分けたoverdubとtrack別balanceが発展 |
| 6 | stereo／多channel | 左右・周囲の空間情報を媒体へ保持 |
| 7 | PCM digital recording | sampleと量子化値として記録、複製・処理の性質が変化 |
| 8 | optical disc・file | random access、非線形編集、network流通へ発展 |
| 9 | DAW・network制作 | 編集・mix・recall・遠隔交換をsoftware中心で統合 |
| 10 | immersive／object-based | 水平面だけでなく高さ、object metadataを含む再生へ拡張 |

「最初」を問う時は、発明、特許、実演、放送採用、民生発売、日本導入のどれかを問題文で特定します。[詳しくは第6章](/exam/06-copyright-history-staff)。

### staffは成果物と決定権で区別

| 役割 | 中心となる責任 | 混同しやすい点 |
| --- | --- | --- |
| artist / musician | 実演と表現 | producerが演奏指示を担う場合もある |
| producer | 作品・session全体の方針と成立 | 組織ごとに予算・契約責任の範囲が違う |
| recording engineer | 収音、recording system、音の技術判断 | assistantとの分担は現場で変わる |
| assistant engineer | setup、patch、session記録、運用補助 | 単なる雑務ではなく事故防止の要 |
| mix engineer | multitrackから完成mixを作る | recording engineerと同一人物の場合もある |
| mastering engineer | 完成mixの媒体・曲間・納品最終調整 | mixの根本問題を必ず直せるわけではない |
| arranger / orchestrator | 編曲、編成、楽器への展開 | 作曲者・producerとの境界は契約で変わる |
| A&R / production staff | artist・作品・label側制作の調整 | 名称と権限は会社ごとに違う |

## 8. 室内音響・設備は別の目的を混ぜない

| 目的 | 主な考え方 | それだけでは解決しないもの |
| --- | --- | --- |
| 遮音 | 室内外を通過する音を減らす。質量、気密、二重構造、flanking pathを扱う | 室内の響きの長さ・音色 |
| 吸音 | 室内で反射して戻るenergyを減らす | 外部への音漏れを自動的には止めない |
| 拡散 | 反射を時間・方向へ散らし、強い鏡面反射を和らげる | 低域modeや総吸音量 |
| 室形状 | mode分布、初期反射、左右対称性を計画 | 施工誤差・家具・機器・扉の影響 |
| 浮き構造 | 構造振動の伝達を減らす | rigid bridgeがあると性能を損なう |
| 空調換気 | 熱・CO₂・湿度を管理しつつnoiseを抑える | 風量を落とすだけでは必要換気を満たせない |
| 電気設備 | 安全、容量、接地、noise対策、保守性を計画 | 独自接地などを自己判断で施工しない |
| fire／避難 | 人命安全、材料、区画、避難経路を確保 | 音響都合より法令・有資格者の判断が優先 |

### 部屋で症状が出た時の順番

1. 片channel、polarity、cable、speaker自体の故障を除外。
2. listening positionと左右対称性を確認。
3. 前後へ移動して低域の山谷が位置で変わるか確認。
4. speaker・listener位置を動かしてから、必要な吸音・bass対策を検討。
5. early reflection、flutter echo、decayの周波数差を測る。
6. EQは最後。深いnullは電気的boostだけで直しにくい。

建築・電気・消防・換気の実施工は、所在地、用途、規模、既存建物の条件で適用が変わります。この教材だけで設計・施工せず、現行法令と有資格者を確認してください。[詳しくは第7章](/exam/07-studio-acoustics-design)。

## 9. 最後の15問セルフチェック

答えを見ず、紙へ式・単位・経路を書いてください。

1. 1 kHzの周期と、空気中での波長の目安を求められるか。
2. 振幅2倍と電力2倍を、それぞれdBへ直せるか。
3. 80 dBの独立した2音源を合成した値を概算できるか。
4. 10 Vが2 kΩへ加わる時の電流と電力を求められるか。
5. sineのRMS、peak、peak-to-peakの関係を描けるか。
6. capacitorとinductorのreactanceが周波数でどう変わるか説明できるか。
7. sample rate、bit depth、bit rate、file sizeを区別できるか。
8. micからspeakerまでの信号経路を、変換器を含めて描けるか。
9. word clock、timecode、genlockの目的を言い分けられるか。
10. X/Y、M/S、ORTF、A/Bをstereo手掛かりとmono互換で比べられるか。
11. mixdownとmasteringの成果物を言い分けられるか。
12. 6/8の拍感とtempo記号の関係を説明できるか。
13. 曲、実演、音源の三層で関係者を挙げられるか。
14. 機械式、電気式、磁気、digital、DAWの順と変化を説明できるか。
15. 遮音、吸音、拡散を、それぞれ何を減らす・変える処理か説明できるか。

一つでも言葉だけになった項目は、リンク先の章へ戻り、例題を数値を変えて解き直します。

## 現行法・規格・公開範囲の確認先

以下は**2026年7月15日確認**。法令・規格・試験範囲は改正・改訂されるため、受験時・制作時に最新版を再確認してください。

- [JAPRS：2026年度サウンドレコーディング技術認定試験 出題範囲](https://www.japrs.or.jp/exam/soundrecording/range/) — このページの分類確認に使用。文章・表・設問は転載していません。
- [e-Gov法令検索：著作権法（昭和45年法律第48号）](https://laws.e-gov.go.jp/law/345AC0000000048) — 著作物、録音・複製、公衆送信、実演家、レコード製作者、著作隣接権などの定義と現行条文。
- [CRIC：著作権法](https://www.cric.or.jp/db/domestic/a1_index.html) — 条文を章・条ごとに確認する補助。最終確認はe-Govを優先。
- [RIAJ：著作権制度の概要](https://www.riaj.or.jp/copyright/about/) — レコード製作者と著作隣接権を音源制作側から整理する参考。
- [ITU-R BS.1770](https://www.itu.int/rec/R-REC-BS.1770) — programme loudnessとtrue-peak測定algorithmの版を確認する一次資料。
- [EBU R 128](https://tech.ebu.ch/publications/r128) — 放送向けloudness normalisationの勧告。特定の配信先へその数値を自動適用しない。
- [International ISRC Agency](https://isrc.ifpi.org/) — ISRCは録音・music videoを識別し、楽曲そのものや演奏者を識別する番号ではないことを確認。

> [!NOTE]
> このページは独自に作成した学習補助資料で、JAPRS公式教材・公式問題の代替や合格・ランクを保証するものではありません。権利・設計・安全についての個別判断は、権利管理者、専門家、有資格者へ確認してください。
