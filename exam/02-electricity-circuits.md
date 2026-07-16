<script setup lang="ts">
import LessonResume from '../.vitepress/theme/components/LessonResume.vue'
</script>

# JAPRS独学 02：電気・交流・オーディオ回路

<LessonResume lesson-path="/exam/02-electricity-circuits" lesson-title="電気・交流・オーディオ回路" />

## この章のねらい

録音機器の中では、空気の振動が電圧の変化へ置き換えられ、増幅・加工・伝送されます。この章では、回路を設計するためではなく、**信号がなぜ小さくなるのか、なぜ歪むのか、なぜノイズが入るのかを式と信号経路で説明できること**を目標にします。

この章を終えたら、次をできるようにします。

- 電圧・電流・抵抗・電力を区別し、オームの法則で未知量を求める。
- 直列・並列回路、分圧回路、キルヒホッフの法則を使う。
- 直流と交流、実効値、周期、周波数、位相を説明する。
- 抵抗・コンデンサー・コイルの周波数に対する振る舞いを説明する。
- インピーダンス、時定数、カットオフ周波数、共振周波数を計算する。
- 電流と磁界、電磁誘導、トランス、ダイナミック型変換器の関係を説明する。
- ダイオード、トランジスター、オペアンプの役割を大づかみに説明する。
- sourceとloadのインピーダンス、balanced伝送、shield、phantom電源を安全に扱う。
- multimeterとoscilloscopeで「何を測れるか」を判断する。

> [!NOTE]
> 2026年度の公式出題範囲と2022〜2025年の公開問題から、繰り返し必要になる概念を抽出して再構成した独自教材です。公式教材や公開問題の文章・図・設問は転載していません。受験年度に範囲が変わる可能性があるため、最後に公式ページも確認してください。

## 1. 電気の基本量 {#week-4-start}

### 1.1 電荷・電流・電圧

**電荷（electric charge）**は、電気現象のもとになる量です。記号は `Q`、単位はクーロン `C` です。

**電流（current）**は、ある断面を単位時間に通過する電荷の量です。記号は `I`、単位はアンペア `A` です。

`I = Q / t`

1 Aは、1秒間に1 Cの電荷が通過する流れです。慣用的な電流の向きは「電位の高い側から低い側」です。金属中の電子が移動する向きとは反対ですが、回路計算では慣用方向を使います。

**電圧（voltage）**は、2点間の電位差です。記号は `V`、単位はボルト `V` です。「その点が何V」ではなく、本来は基準点との**差**です。audio信号の波形は、多くの場合、時間とともに変化する電圧として扱えます。

### 1.2 抵抗・コンダクタンス

**抵抗（resistance）**は、直流の流れにくさを表す量です。記号は `R`、単位はオーム `Ω` です。

**コンダクタンス（conductance）**は流れやすさで、抵抗の逆数です。記号は `G`、単位はジーメンス `S` です。

`G = 1 / R`

水流のたとえは入口として便利ですが、限界があります。電圧を水圧、電流を流量、抵抗を細い管に置き換えると関係を想像できます。ただし、交流の位相、電磁誘導、伝送線路などは水のたとえだけでは正確に説明できません。

### 1.3 オームの法則

抵抗性の要素では、電圧・電流・抵抗に次の関係があります。

`V = I R`　`I = V / R`　`R = V / I`

単位をそろえてから代入します。

| 接頭語 | 記号 | 倍率 | audioでの例 |
| --- | --- | ---: | --- |
| mega | M | 1,000,000 | 1 MΩのHi-Z入力 |
| kilo | k | 1,000 | 10 kΩのline入力 |
| milli | m | 0.001 | 20 mA |
| micro | µ | 0.000001 | 47 µF |
| nano | n | 0.000000001 | 100 nF |
| pico | p | 0.000000000001 | cableの100 pF/m |

大文字と小文字を区別します。`MΩ` はmegaohm、`mΩ` はmilliohmで10億倍違います。

### Worked example 1：抵抗を流れる電流

9 Vを2.2 kΩへ加えたときの電流を求めます。

1. `2.2 kΩ = 2,200 Ω`
2. `I = V / R = 9 / 2,200 = 0.00409 A`
3. `0.00409 A = 4.09 mA`

答えは約 **4.1 mA** です。

### 1.4 電力と電力量

**電力（power）**は、単位時間に使われるエネルギーです。記号は `P`、単位はワット `W` です。

`P = V I`

オームの法則と組み合わせると、抵抗では次の形も使えます。

`P = I²R`　`P = V²/R`

**電力量（energy）**は、電力を時間で積算した量です。`E = Pt`。電力と電力量を混同しないでください。

### Worked example 2：抵抗の発熱

12 Vが1 kΩにかかる場合：

- `I = 12 / 1,000 = 0.012 A = 12 mA`
- `P = V²/R = 144/1,000 = 0.144 W`

理想計算で0.144 Wでも、0.125 W定格の抵抗では不足です。実機では温度、連続使用、許容差を含め、定格に余裕を持たせます。

### 理解確認 1

1. 5 Vを10 kΩへ加えたとき、電流は何mAか。
2. 8 Ωの負荷に2 Aが流れるとき、電圧と電力はいくらか。
3. 0.47 MΩは何kΩか。

<details>
<summary>答えと考え方</summary>

1. `I = 5/10,000 = 0.0005 A = 0.5 mA`。
2. `V = IR = 2×8 = 16 V`、`P = VI = 16×2 = 32 W`。
3. `0.47 MΩ = 470 kΩ`。

</details>

## 2. 直列・並列・分圧

### 2.1 直列回路

**直列（series）**は、部品を一列につなぎ、同じ電流が順番に流れる接続です。抵抗の合成値は足し算です。

`Rtotal = R1 + R2 + ...`

```
+V ── R1 ── R2 ── 0 V
        同じ電流 I →
```

各抵抗で生じる電圧降下の合計は電源電圧と等しくなります。

### 2.2 並列回路

**並列（parallel）**は、部品の両端をそれぞれ共通の2点へつなぐ接続です。各枝の電圧は同じで、電流が分かれます。

`1/Rtotal = 1/R1 + 1/R2 + ...`

抵抗2本だけなら：

`Rtotal = R1R2 / (R1 + R2)`

同じ値 `R` の抵抗を `n` 本並列にすると `R/n` です。合成抵抗は、並列にしたどの抵抗よりも小さくなります。これは計算結果の検算に使えます。

```
         ┌── R1 ──┐
+V  ─────┤        ├──── 0 V
         └── R2 ──┘
      両方に同じ電圧
```

### 2.3 キルヒホッフの法則

**キルヒホッフの電流則（KCL）**：接続点へ流れ込む電流の合計と、流れ出す電流の合計は等しい。

**キルヒホッフの電圧則（KVL）**：閉じた経路を一周した電圧上昇と電圧降下の代数和は0。

オームの法則が1つの部品の関係を扱うのに対し、キルヒホッフの法則は回路全体のつじつまを確認します。

### 2.4 分圧回路

**分圧（voltage divider）**は、直列抵抗に生じる電圧降下を取り出す回路です。下側抵抗 `R2` の両端を出力とする場合：

`Vout = Vin × R2 / (R1 + R2)`

```
Vin ── R1 ──┬── Vout
             R2
              │
             0 V
```

2本の抵抗が等しければ、無負荷でVoutはVinの半分です。passive attenuatorやcontrol電圧を理解する基本になります。

### Worked example 3：分圧

Vin = 12 V、R1 = 2 kΩ、R2 = 4 kΩ。

`Vout = 12 × 4/(2+4) = 8 V`

同じ結果を電流からも確認できます。

1. `Itotal = 12/(2 kΩ+4 kΩ) = 2 mA`
2. `Vout = 2 mA × 4 kΩ = 8 V`

### 2.5 loadをつなぐと値が変わる

実際のVoutには次段の**入力インピーダンス（load）**がつながります。load `RL` はR2と並列になるため、理想分圧からずれます。

例：R1 = 10 kΩ、R2 = 10 kΩなら無負荷で1/2です。そこへRL = 10 kΩをつなぐと、下側は `10 kΩ || 10 kΩ = 5 kΩ`。したがって：

`Vout/Vin = 5/(10+5) = 1/3`

「測定器をつないだだけで値が変わる」こともあります。入力インピーダンスが十分高い測定器を使う理由です。

### 理解確認 2

1. 3 kΩと6 kΩの並列合成抵抗はいくらか。
2. Vin = 10 V、R1 = 3 kΩ、R2 = 2 kΩのVoutはいくらか。
3. 1 kΩ、2 kΩ、3 kΩを直列にし、12 Vを加えた。流れる電流はいくらか。

<details>
<summary>答えと考え方</summary>

1. `3×6/(3+6) = 2 kΩ`。
2. `10×2/(3+2) = 4 V`。
3. 合成6 kΩなので、`12/6 kΩ = 2 mA`。

</details>

## 3. 直流と交流 {#week-5-start}

### 3.1 DCとAC

**直流（DC: direct current）**は、電圧の極性や電流の向きが時間に対して一定の成分です。電池や回路の電源が代表例です。

**交流成分（AC: alternating current）**は、電圧や電流が時間とともに変化する成分です。正弦波のような周期信号を基本modelにしますが、実際のaudioにはtransientやnoiseのような非周期的な変化も含まれます。実回路ではDCの動作点にaudioのAC成分が重なっていることもあります。

```
電圧
 ↑       +Vp      ／＼      ／＼
 │               ／  ＼    ／  ＼
0├──────────────／────＼／────＼────→ 時間
 │             ／              ＼
 ↓       -Vp
          ←── 1周期 T ──→
```

### 3.2 周期・周波数・角周波数

- **周期 `T`**：1回繰り返す時間。単位s。
- **周波数 `f`**：1秒間の繰り返し回数。単位Hz。
- **角周波数 `ω`**：回転角として表した速さ。単位rad/s。

`f = 1/T`　`T = 1/f`　`ω = 2πf`

1 kHzの周期は `1/1,000 s = 1 ms` です。

### 3.3 peak、peak-to-peak、RMS

- **peak値 `Vp`**：0から正または負の最大値まで。
- **peak-to-peak値 `Vpp`**：正のpeakから負のpeakまで。中心が0の対称な正弦波では `Vpp = 2Vp`。
- **実効値（RMS）**：同じ抵抗に同じ平均電力を与える直流値に対応する表し方。

正弦波では：

`Vrms = Vp/√2 ≈ 0.707Vp`

`Vp = √2 Vrms ≈ 1.414Vrms`

波形が正弦波でないときは、この0.707をそのまま使えません。RMSは波形全体から計算します。

### Worked example 4：正弦波の値

正弦波が10 V peakなら：

- `Vpp = 20 V`
- `Vrms = 10/√2 ≈ 7.07 V`

この7.07 Vrmsを8 Ωの純抵抗へ加えると、`P = Vrms²/R ≈ 6.25 W` です。

### 3.4 位相

**位相（phase）**は、周期のどこにいるかを角度で表したものです。1周期は360°、または `2π rad`。

同じ周波数の2つの正弦波が：

- 0°差：山と山が一致する。
- 90°差：1/4周期ずれる。
- 180°差：一方の山と他方の谷が一致する。

時間差 `Δt` を位相差へ換算する式は：

`位相差[°] = 360 × f × Δt`

同じ時間差でも、周波数が変われば位相差が変わります。これが「polarity反転」と「phaseのずれ」を区別する理由です。

### 3.5 ACの電力

正弦波交流の有効電力は：

`P = Vrms Irms cosφ`

`cosφ` は**力率（power factor）**で、電圧と電流の位相差を反映します。純抵抗ではφ = 0°、力率1。コンデンサーやコイルを含むと、電源と負荷の間を往復するエネルギーが生じ、単純な `Vrms×Irms` の全部が消費電力になるとは限りません。

### 理解確認 3

1. 50 Hzの周期は何msか。
2. 2 kHzで0.125 msの時間差は何度か。
3. 4 Vrmsの正弦波のpeak値とpeak-to-peak値はいくらか。

<details>
<summary>答えと考え方</summary>

1. `1/50 = 0.02 s = 20 ms`。
2. `360×2,000×0.000125 = 90°`。
3. `Vp = 4√2 ≈ 5.66 V`、`Vpp ≈ 11.3 V`。

</details>

## 4. R・C・Lとインピーダンス

### 4.1 抵抗 R

理想的な**抵抗器（resistor）**では、電圧と電流が同じ位相です。周波数が変わっても抵抗値は一定とみなします。現実の部品には小さな寄生成分がありますが、基礎問題ではまず理想部品として扱います。

### 4.2 コンデンサー C

**コンデンサー（capacitor）**は、2つの導体の間の電界に電荷を蓄える部品です。容量は `C`、単位はファラド `F`。

`Q = CV`

理想コンデンサーでは、電圧が変化すると電流が流れます。一定の直流では充電後に電流が止まるので、よく「DCを遮り、ACを通す」と説明されます。ただし実際は周波数に応じて通しやすさが変わります。

コンデンサーの**容量リアクタンス**：

`XC = 1/(2πfC)`

- `f` が高いほどXCは小さい。
- `C` が大きいほどXCは小さい。
- 理想コンデンサーでは、電流が電圧より90°進む。

コンデンサーの合成は抵抗と逆です。

- 並列：`Ctotal = C1 + C2 + ...`
- 直列：`1/Ctotal = 1/C1 + 1/C2 + ...`

極性のある電解コンデンサーは、指定された極性・電圧を守ります。逆接続や過電圧は破損・破裂の危険があります。

### 4.3 コイル L

**コイル／インダクター（inductor）**は、電流によって生じる磁界にエネルギーを蓄える部品です。インダクタンスは `L`、単位はヘンリー `H`。

コイルの**誘導リアクタンス**：

`XL = 2πfL`

- `f` が高いほどXLは大きい。
- `L` が大きいほどXLは大きい。
- 理想コイルでは、電流が電圧より90°遅れる。

理想コイルの合成は抵抗と同じです。

- 直列：`Ltotal = L1 + L2 + ...`
- 相互誘導を無視した並列：`1/Ltotal = 1/L1 + 1/L2 + ...`

### 4.4 impedance

**インピーダンス（impedance）**は、交流に対する総合的な流れにくさです。記号は `Z`、単位はΩ。抵抗成分とリアクタンス成分を持ち、周波数によって変化します。

直列RC回路なら、大きさは：

`|Z| = √(R² + XC²)`

単なる足し算にならないのは、抵抗の電圧とコンデンサーの電圧が位相の異なる量だからです。試験で複素数まで求められない場合でも、**Rは実数方向、CとLは±90°方向**という関係を覚えておくと誤りを防げます。

### Worked example 5：容量リアクタンス

1 µFのコンデンサーを1 kHzで使うと：

`XC = 1/(2π×1,000×1×10⁻⁶) ≈ 159 Ω`

同じコンデンサーを100 Hzで使えば約1.59 kΩです。低域ほど通しにくくなることが分かります。

### 4.5 RC時定数

**時定数（time constant）**は、回路の変化の速さを表す尺度です。RC回路では：

`τ = RC`

直流stepを加えて充電すると、1τ後に最終値の約63.2%へ達します。放電では1τ後に約36.8%が残ります。おおむね5τで最終値に非常に近づきます。

例：R = 10 kΩ、C = 10 µFなら：

`τ = 10,000×10×10⁻⁶ = 0.1 s`

### 4.6 1次filterのcutoff

RとCでlow-passまたはhigh-pass filterを作れます。理想的な1次RC filterのcutoff周波数は：

`fc = 1/(2πRC)`

cutoffでは振幅が通過帯域に対して `1/√2`、約 `-3.01 dB` になります。cutoffを越えた領域の傾きは、1次filterなら1 octaveあたり約6 dB（1 decadeあたり20 dB）です。

```
RC low-pass：入力 ── R ──┬── 出力
                           C
                           │
                          0 V

RC high-pass：入力 ── C ──┬── 出力
                            R
                            │
                           0 V
```

同じ部品でも、どこから出力を取るかで役割が変わります。

### Worked example 6：high-passのcutoff

R = 10 kΩ、C = 0.1 µFの場合：

`fc = 1/(2π×10,000×0.1×10⁻⁶) ≈ 159 Hz`

部品の許容差や次段loadによって実測値は変わります。

### 4.7 LC共振

コイルとコンデンサーのリアクタンスの大きさが等しくなる周波数を**共振周波数**と呼びます。

`f0 = 1/(2π√(LC))`

共振の鋭さは抵抗損失にも左右されます。speakerのcrossover、filter、発振回路、無線回路だけでなく、roomや機械系の共振を理解する比喩にもなります。ただし電気共振とroom modeを同じ式で計算してはいけません。

### 理解確認 4

1. 周波数が10倍になると、XCとXLはそれぞれどう変わるか。
2. 120 µFと240 µFを直列にした合成容量はいくらか。
3. R = 1 kΩ、C = 1 µFの時定数とcutoff周波数を求める。

<details>
<summary>答えと考え方</summary>

1. XCは1/10、XLは10倍。
2. `120×240/(120+240) = 80 µF`。
3. `τ = 1,000×1×10⁻⁶ = 1 ms`。`fc = 1/(2π×0.001) ≈ 159 Hz`。

</details>

## 5. 磁気と電磁誘導

### 5.1 電流が磁界を作る

電流が流れる導体の周囲には**磁界（magnetic field）**ができます。導線をcoil状に巻くと磁界を集中でき、鉄心などの磁性体を使うと磁束を導きやすくなります。

- **磁束 `Φ`**：磁界の流れを面全体で表す量。単位weber `Wb`。
- **磁束密度 `B`**：単位面積あたりの磁束。単位tesla `T`。磁気録音では `nWb/m` のように「track幅あたりの磁束」を基準levelとして扱う文脈があります。

### 5.2 電磁誘導

coilを通る磁束が時間的に変化すると電圧が生じます。これが**電磁誘導（electromagnetic induction）**です。磁束の変化を妨げる向きに作用することがLenzの法則です。

概念式：

`誘導電圧 e = -N × 磁束の変化率`

`N` は巻数です。負号は「変化を打ち消す向き」を表します。

この原理は次に現れます。

- dynamic microphone：diaphragmに連動するcoilが磁界内で動き、電圧を生む。
- dynamic speaker：coilへ電流を流し、磁界との力でdiaphragmを動かす。
- transformer：一次coilの交流磁束が二次coilへ電圧を誘導する。
- magnetic tape head：電気信号とtape上の磁化を相互変換する。

### 5.3 transformer

**トランス（transformer／変圧器）**は、共通の磁束を介して交流エネルギーを伝える部品です。理想トランスでは巻数比と電圧比が等しくなります。

`Vp/Vs = Np/Ns`

電流比は逆、一次側から見えるload impedanceは巻数比の2乗で変換されます。

`Zp/Zs = (Np/Ns)²`

DCは一定磁束しか作らないため、理想トランスは連続的なDCを二次側へ伝えません。実機では低域でcoreが飽和し、高域では漏れinductanceや寄生capacitanceの影響が出ます。

### Worked example 7：transformerのimpedance変換

一次:二次の巻数比が2:1で、二次側に600 Ωがつながっているとします。

`Zp = (2/1)² × 600 = 2,400 Ω`

一次側からは理想的に2.4 kΩのloadに見えます。

### 理解確認 5

1. dynamic microphoneとspeakerに共通する物理現象は何か。
2. 巻数比10:1の理想トランスで、一次10 Vなら二次は何Vか。
3. なぜトランスはground loopを切る用途に使えることがあるか。

<details>
<summary>答えと考え方</summary>

1. 電流・運動・磁界の相互作用と電磁誘導。
2. 1 V。
3. 一次と二次が導線で直結せず、磁気結合で信号を渡せるため。実機のshieldや接地方法は製品仕様に従う。

</details>

## 6. オーディオ機器に使う電子部品

### 6.1 抵抗器のcolor code

4band抵抗では、最初の2色が有効数字、3色目が10の乗数、4色目が許容差を表します。許容差bandは他より離れて配置されることがあります。

| 色 | 数字 | 乗数 |
| --- | ---: | ---: |
| 黒 | 0 | ×10⁰ |
| 茶 | 1 | ×10¹ |
| 赤 | 2 | ×10² |
| 橙 | 3 | ×10³ |
| 黄 | 4 | ×10⁴ |
| 緑 | 5 | ×10⁵ |
| 青 | 6 | ×10⁶ |
| 紫 | 7 | ×10⁷ |
| 灰 | 8 | ×10⁸ |
| 白 | 9 | ×10⁹ |

goldは乗数×0.1、silverは×0.01として使われます。許容差は代表的にgold ±5%、silver ±10%、brown ±1%、red ±2%です。5band抵抗では有効数字が3桁になるため、band数を先に確認します。

例：brown-black-red-goldは `10×10² = 1,000 Ω = 1 kΩ`、許容差±5%。

### 6.2 可変抵抗・switch・relay・fuse

- **potentiometer**：つまみやfaderに使う3端子の可変分圧器。2端子だけなら可変抵抗としても使える。
- **switch**：回路を機械的・電子的に切り替える。pole数とthrow数で接点構成を表す。
- **relay**：coilを駆動して別の接点を切り替える部品。制御側と信号側を分離できる。
- **fuse**：過大電流で溶断し、火災や大きな故障を防ぐ保護部品。定格・速断/遅延特性を勝手に変更しない。

fuseは人を感電から完全に守る装置ではありません。感電保護、接地、漏電遮断、絶縁は別の設計要素です。

### 6.3 diode

**ダイオード（diode）**は、主に一方向へ電流を流す半導体部品です。

- rectifier：ACを一方向の脈流へ変える。
- protection：逆電圧や過電圧から回路を守る。
- clipping：一定levelを越えた波形を制限する。
- LED：順方向電流で発光する。

理想diodeは一方向だけ完全に導通しますが、実際には順方向電圧、漏れ電流、最大電流・逆耐圧があります。

### 6.4 transistor

**トランジスター（transistor）**は、小さな電圧または電流で、より大きな電流を制御する半導体素子です。増幅器、switch、定電流回路、電源などに使われます。

- BJT：base電流でcollector電流を制御する見方をする。
- FET：gate電圧でdrain電流を制御し、入力インピーダンスを高くしやすい。

「トランジスター1個が音を大きくする」のではなく、電源から取り出すエネルギーを入力信号に応じて制御し、負荷へより大きな信号を作ります。

### 6.5 op ampとnegative feedback

**オペアンプ（operational amplifier）**は、2つの入力の電圧差を非常に大きく増幅する集積回路です。実用回路では出力の一部を入力へ戻す**negative feedback（負帰還）**によって、安定したgainやfilter特性を作ります。

理想op ampを使った代表式：

- inverting amplifier：`gain = -Rf/Rin`
- non-inverting amplifier：`gain = 1 + Rf/Rg`

負号はpolarityが反転することを表します。

### Worked example 8：op amp gain

inverting構成でRin = 10 kΩ、Rf = 100 kΩなら：

`gain = -100/10 = -10`

振幅は10倍、polarityは反転します。電圧gainをdBにすれば `20 log10(10) = 20 dB`。ただし出力は電源電圧、最大電流、slew rate、bandwidthを越えられません。

### 理解確認 6

1. 整流に使う代表的な部品は何か。
2. FETがinstrument入力の初段に向く理由の1つは何か。
3. inverting op ampでRin = 20 kΩ、Rf = 40 kΩのgainはいくらか。

<details>
<summary>答えと考え方</summary>

1. diode。
2. 高い入力インピーダンスを作りやすく、passive pickupをloadしにくい。
3. `-40/20 = -2`。振幅2倍、polarity反転。

</details>

## 7. source・load・伝送

### 7.1 出力impedanceと入力impedance

信号を送り出す側を**source**、受ける側を**load**と呼びます。

- **出力インピーダンス `Zout`**：sourceを外から見た交流的な内部抵抗。
- **入力インピーダンス `Zin`**：loadがsourceへ示す交流的な負荷。

現代のaudio電圧伝送では、通常 `Zin` を `Zout` より十分大きくする**bridging接続**を使います。目安として10倍以上がよく使われますが、製品仕様を優先します。これによりsource電圧を大きく落とさず、1つの出力から適切に信号を渡せます。

古い600 Ω系やRF伝送、digital cableでは**impedance matching**が必要な場合があります。「audioは常に同じΩへ合わせる」は誤りです。

### 7.2 Hi-Z入力

passive guitar/bass pickupはsource impedanceが高く、cable capacitanceとの組み合わせで高域が変わります。instrument/Hi-Z入力は一般に数百kΩ〜1 MΩ以上の高いZinを持ち、pickupを強くloadしないようにします。

MOTU M2では前面combo入力をinstrument modeへ切り替えて使います。端子に挿さることと、電気的に適合することは別です。

### 7.3 cable capacitance

shield cableは導体同士の間に静電容量を持ちます。source impedanceが高く、cableが長く、capacitanceが大きいほど、RC low-passによる高域減衰が可聴帯域へ近づきます。

例：pickupを単純化してsource resistance 10 kΩ、cable capacitance合計1 nFとすると：

`fc = 1/(2π×10 kΩ×1 nF) ≈ 15.9 kHz`

実際のpickupはinductanceも持つため、単純な1次RCより複雑です。それでも「高いZout × 長いcable」が高域に不利という方向は説明できます。

### 7.4 balanced伝送

**balanced line**は、2本の信号導体がgroundに対して等しいインピーダンスを持ち、受信側が2本の**差**を取り出す伝送方式です。外来noiseが2本へ同じように加われば、差動入力で打ち消しやすくなります。これを**common-mode rejection**と呼びます。

```
送信側                 cable                  差動受信
signal + ────────────────┐
                          ├─ (+) − (−) → audio
signal - ────────────────┘
shield  ─── chassis / shield
```

2本が必ず「同じ振幅で逆polarity」に能動driveされるとは限りません。balancedの本質はgroundに対するimpedance balanceと差動受信です。対して**unbalanced**は通常、信号1本とreturn/shieldを使います。

### 7.5 shieldとground

- **signal common**：回路が信号電圧を参照する点。
- **chassis ground**：筐体・shieldを高周波noiseや安全のために扱う経路。
- **protective earth**：感電保護のための接地。

これらは目的が異なり、機器内部でどこに接続するかは設計によります。humを止めるために電源のprotective earthを外す行為は危険です。ground loop対策はbalanced接続、正しい配線、isolator/transformer、電源配置の見直しで行います。

### 7.6 phantom power

48 V phantom電源は、balanced microphone lineの2本の信号導体へ同じDC電圧を抵抗経由で供給し、pin 1側をreturnにする仕組みです。正しくbalanced接続されたdynamic microphoneではdiaphragm駆動coilの両端にほぼ同じDCがかかるため、差電圧が生じにくい設計です。

ただし、破損cable、誤配線、unbalanced変換、ribbon microphoneや古い機器では危険があります。

安全な基本順序：

1. monitor/headphoneをmuteまたは十分下げる。
2. gainを下げる。
3. XLRを確実に接続する。
4. 必要な入力だけ48 VをONにする。
5. 数秒待ってからgainを上げる。
6. 外すときは逆順で、48 VをOFFにして放電を待つ。

### 理解確認 7

1. Zout 100 Ωのline出力にZin 10 kΩをつなぐのは、matchingとbridgingのどちらか。
2. balanced lineが外来noiseに強い理由を「2本の差」という語を使って説明する。
3. humが出たとき、電源plugのearthを外してはいけない理由は何か。

<details>
<summary>答えと考え方</summary>

1. bridging。ZinはZoutの100倍。
2. 2本へ共通に入ったnoiseを差動受信で引き算し、2本の差であるaudioを残しやすいから。
3. protective earthは感電時の電流経路を作り、保護装置を動作させる安全設備だから。

</details>

## 8. 測定と安全

### 8.1 multimeterで測れるもの

一般的な**digital multimeter（DMM）**は、DC/AC電圧、DC/AC電流、抵抗、導通などを測れます。機種によってcapacitance、diode、周波数も測れます。

- 電圧：回路の2点へ**並列**に当てる。
- 電流：回路を切り、meterを**直列**に入れる。
- 抵抗・導通：原則として**電源を切り、capacitorを放電**して測る。

電流rangeのまま電圧源へ並列接続すると、meter内部を短絡させる危険があります。leadを挿す端子とrangeを、測定前に指差し確認します。

### 8.2 oscilloscopeで分かること

**oscilloscope**は電圧の時間変化を表示します。波形、peak-to-peak、period、周波数、DC offset、clipping、2ch間の時間差などを観察できます。

multimeterは「代表値」を数値で示すのが得意ですが、波形の形を直接は表示しません。oscilloscopeは波形を見られますが、probeのgroundが保護接地につながる機種では誤接続で短絡させる危険があります。

### 8.3 mainsとpower amplifierは実習対象外

家庭用AC mains、power amplifier出力、電源回路、大容量capacitorは、人命・火災・機器破損に関わります。この教材の計算問題を理由に筐体を開けて測定しないでください。

- 製品の筐体を開けない。
- wall outletや分電盤を測らない。
- speaker outputをMOTU M2の入力へ入れない。
- phantom power中にconnectorを半挿ししない。
- fuseを針金で代用しない。
- 濡れた手、金属アクセサリー、散らかった床で配線しない。

Cubaseのtest generatorを使う場合も、monitor levelを最小から上げます。sine波は音楽より連続的に大きな電力をspeaker/tweeterへ与えられるため、聴感だけで安全を判断しません。

### 理解確認 8

1. 抵抗測定の前に電源を切る理由は何か。
2. DMMを電流rangeにしたまま電源へ並列接続すると何が起こり得るか。
3. 1 kHz sine波をmeterで測って値が出ても、clippingの形を判断できないのはなぜか。

<details>
<summary>答えと考え方</summary>

1. 外部電圧が測定を誤らせ、meterや回路を壊す可能性があるため。capacitorの残留電荷にも注意する。
2. 低抵抗の電流測定回路で電源を短絡し、fuse溶断・発熱・故障が起こり得る。
3. 通常のDMMは波形を時間軸表示せず、RMSなどの代表値へ集約するから。波形観察にはoscilloscope等を使う。

</details>

## 9. 試験で式を選ぶ手順

計算を暗記だけで解くと、単位や直列・並列を取り違えます。次の順を固定します。

1. **何を求めるか**に下線を引く。
2. 回路を描き直し、直列・並列・出力点を示す。
3. 既知量をSI単位へ直す。kΩ、mA、µFを特に確認する。
4. 文字式を先に書く。
5. 数値を代入する。
6. 単位を付ける。
7. 常識checkをする。並列抵抗は最小値より小さいか、divider出力は電源を越えていないか。

### 総合worked example：passive high-passのload

source resistance 1 kΩ、series capacitor 1 µF、次段入力10 kΩのhigh-passを考えます。capacitorから見た抵抗は概算で `1 kΩ + 10 kΩ = 11 kΩ`。

`fc ≈ 1/(2π×11,000×1×10⁻⁶) ≈ 14.5 Hz`

もし次段入力が1 kΩなら合計2 kΩとなり、`fc ≈ 79.6 Hz`。同じcapacitorでもload impedanceで低域特性が変わります。

ここから、機器を接続するときは「端子形状」だけでなく、Zout・Zin・coupling capacitor・cable capacitanceまでが周波数特性に関わると分かります。

## 10. 章末ミニテスト

紙に途中式を書き、電卓は最後の計算だけに使ってください。

1. 24 Vを4.7 kΩへ加える。電流をmAで求める。
2. 4 Ωと12 Ωの並列合成抵抗を求める。
3. Vin = 15 V、上側2 kΩ、下側3 kΩのdividerでVoutを求める。
4. 250 Hzの周期をmsで求める。
5. 6 Vrmsの正弦波のpeak値を求める。
6. 0.22 µFのcapacitorを1 kHzで使うとき、XCを概算する。
7. 100 mHのcoilを1 kHzで使うとき、XLを概算する。
8. R = 4.7 kΩ、C = 100 nFのRC cutoffを概算する。
9. 一次:二次が3:1の理想transformerの二次に8 Ωをつないだ。一次から見えるZを求める。
10. 出力impedanceが1 kΩのpassive guitarを、10 kΩ line入力と1 MΩ instrument入力へつなぐ場合、どちらが電圧を保ちやすいか。理由も書く。

<details>
<summary>章末ミニテストの解答</summary>

1. `24/4,700 = 0.00511 A ≈ 5.1 mA`。
2. `4×12/(4+12) = 3 Ω`。
3. `15×3/(2+3) = 9 V`。
4. `1/250 = 0.004 s = 4 ms`。
5. `6√2 ≈ 8.49 V peak`。
6. `1/(2π×1,000×0.22×10⁻⁶) ≈ 723 Ω`。
7. `2π×1,000×0.1 ≈ 628 Ω`。
8. `1/(2π×4,700×100×10⁻⁹) ≈ 339 Hz`。
9. `(3/1)²×8 = 72 Ω`。
10. 1 MΩ instrument入力。Zin/Zoutが大きく、sourceをloadして生じる電圧低下を小さくしやすい。実際のpickupではinductanceとcable capacitanceも音色に影響する。

</details>

## 章末チェックリスト

- [ ] `V = IR` を3通りに変形できる。
- [ ] `P = VI`、`P = I²R`、`P = V²/R` を使い分けられる。
- [ ] 抵抗の直列と並列の合成を、式を見ずに書ける。
- [ ] dividerの出力点を見て、上側・下側抵抗を正しく選べる。
- [ ] KCLとKVLを1文ずつ説明できる。
- [ ] peak、peak-to-peak、RMSを図で区別できる。
- [ ] `T = 1/f` と時間差→位相差の換算ができる。
- [ ] 周波数が上がるとXCは下がり、XLは上がると説明できる。
- [ ] `τ = RC` と `fc = 1/(2πRC)` を使える。
- [ ] impedanceとDC resistanceの違いを説明できる。
- [ ] 電磁誘導を、microphone・speaker・transformer・tapeの例へ結びつけられる。
- [ ] diode、transistor、op ampの役割を混同しない。
- [ ] impedance bridgingとmatchingの使い分けを説明できる。
- [ ] balanced伝送の本質を「等しい対ground impedance」と「差動受信」で説明できる。
- [ ] phantom powerとprotective earthを安全に扱える。
- [ ] DMMの電圧・電流・抵抗測定の接続方法を区別できる。

## 出典・追加確認

本文は下記を参照して独自に構成しました。リンク先の文章・図を暗記するのではなく、定義・単位・安全条件を確認するために使ってください。

- [JAPRS：2026年度 サウンドレコーディング技術認定試験 出題範囲](https://www.japrs.or.jp/exam/soundrecording/range/)：電気の基礎、基本回路、parts、audio回路、磁気記録、交流、単位、規格表の公式範囲。
- [JAPRS：公開過去問題・解答](https://www.japrs.or.jp/exam/soundrecording/past/)：2022〜2025年の出題形式と必要概念の確認用。問題文は本章へ転載していません。
- [BIPM：The International System of Units (SI Brochure), 9th edition](https://www.bipm.org/en/publications/si-brochure)：ampere、volt、ohm、farad、henry、weber、tesla等のSI定義。
- [NIST：SI Units — Electric Current](https://www.nist.gov/pml/owm/si-units-electric-current)：電流とSI単位の解説。
- [OpenStax：University Physics Volume 2](https://openstax.org/details/books/university-physics-volume-2)：DC回路、capacitance、inductance、AC、電磁誘導のopen textbook。
- [IEC Webstore：IEC 61938:2018を検索](https://webstore.iec.ch/)：audio interface、source/load、phantom給電の国際規格「Multimedia systems — Guide to the recommended characteristics of analogue interfaces」（規格本文は有料の場合があります）。
- [AES Standards Search：AES48を検索](https://aes2.org/publications/standards-search/)：professional audio機器のshield、chassis、EMC接続の規格情報。revisionは受験時点のcatalogで確認します。
- [RaneNote 110：Sound System Interconnection](https://www.ranecommercial.com/legacy/note110.html)：balanced/unbalanced接続、shield、hum対策の技術資料。
- [MOTU：M2 Getting Started Guide](https://motu.com/m2-start)：M2のinput mode、48 V、monitoringを実機で確認する一次資料。
