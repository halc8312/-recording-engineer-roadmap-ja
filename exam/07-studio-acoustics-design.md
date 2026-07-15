# 07 スタジオ音響設計：遮音・音場・設備・法規

## この章の目標

- 遮音、吸音、拡散、残響を区別し、対策の目的を選べる。
- 空気伝搬音、固体伝搬音、側路伝搬を「音源→経路→受音側」で追える。
- 吸音率、等価吸音面積、Sabine式、室modeの基礎計算ができる。
- control roomの初期反射、speaker配置、低域mode、測定の関係を説明する。
- studioの空調を、温度だけでなく換気、騒音、振動、保守から計画できる。
- 音響groundと保護接地を混同せず、安全な電気設備の原則を説明する。
- 建築・消防・騒音・電気の法令確認が必要な場面を判断する。

::: danger 設計・工事について
この章は試験学習用の概説で、建築・消防・電気・労働安全に関する設計図、施工指示、法的助言ではありません。壁の撤去、二重床、換気変更、電源増設、接地変更、防火材料の選定は、建築士・設備設計者・電気工事士・消防機関・建物管理者等へ相談し、所在地の最新法令・条例・用途・規模で確認してください。
:::

## 1. 遮音と吸音は目的が違う

| 用語 | 目的 | 代表的な手段 |
| --- | --- | --- |
| sound isolation / 遮音 | 部屋の内外を行き来する音を減らす | 重さ、気密、分離、二重構造、開口処理 |
| absorption / 吸音 | 室内で反射して戻る音energyを減らす | 多孔質材、panel、共鳴器 |
| diffusion / 拡散 | 反射方向・時間を分散する | 凹凸、形状、diffuser、書棚等の検討 |
| vibration isolation / 防振 | 機械・床・構造へ伝わる振動を減らす | 防振支持、浮き構造、flexible joint |

壁へ薄い吸音foamを貼るとflutter echoや高域反射は変わっても、bassやdrumが隣室へ漏れる量はほとんど改善しないことがあります。反対に重い遮音壁を作っても、室内の響きが自動的に整うわけではありません。

### source–path–receiver

問題は次の三点で分解します。

1. **source**：drum、speaker、voice、air conditioner、traffic。
2. **path**：壁、door、window、duct、床、配管、構造体、隙間。
3. **receiver**：隣室、住宅、mic、monitoring位置、近隣境界。

「壁の性能」だけでなく、実際の最も弱いpathが全体を決めます。

## 2. 音の伝わり方

### airborne sound

空気中を音圧変化として進み、壁・door等を振動させ、反対側へ再放射されます。voice、cymbal、speakerなどが代表です。

### structure-borne sound

kick pedal、bass amp、空調compressor等の振動が床・柱・配管へ入り、別の面から音として放射されます。低周波では離れた部屋まで伝わることがあります。

### flanking transmission

目的の間仕切りを直接通らず、天井裏、共通床、外壁、duct、配管、電気box周辺などを回り込む経路です。高性能な壁を作っても、共通天井やdoorの隙間が残れば全体性能は上がりません。

## 3. 遮音の四原則

### 1. mass（重さ）

単層の均質な壁は、理想化すれば面密度が大きいほど透過しにくくなります。mass lawでは、周波数または面密度を2倍にすると透過損失が約6 dB増える傾向があります。ただし、実壁には共鳴、coincidence、隙間、固定部、側路があり、この値を保証値として使えません。

### 2. airtightness（気密）

soundはair pathを通ります。door下、wall joint、cable穴、outlet、window、ductの小さな隙間が弱点になります。気密処理は重要ですが、必要な換気・避難・消防設備を塞いではいけません。

### 3. decoupling（構造分離）

二重壁、独立stud、resilient support、floating floorなどで振動経路を分けます。両側を硬い部材でbridgeするとshort circuitになり、分離効果が落ちます。

### 4. dampingとcavity

二重leaf間のair cavityと吸音材は、cavity内の共鳴を抑える助けになります。一方、二枚のleafとair springは**mass–air–mass resonance**を持ち、その付近で性能が落ちます。leaf間隔、面密度、固定方法、cavity材を一体で設計します。

### 開口部

| 部位 | 主なrisk | 設計上の考え方 |
| --- | --- | --- |
| door | perimeterと下端の隙間、軽い扉 | 重い扉、全周seal、必要ならsound lock |
| window | 薄いglass、同厚二重glassの共鳴 | 異なる厚さ、十分なair gap、気密、斜め配置の目的を検討 |
| duct | airと一緒に音が直通、部屋間cross-talk | silencer、曲がり、断面、低風速、独立経路 |
| cable penetration | sleeve周りの隙間 | 防火・気密を満たす適切な貫通処理 |
| outlet box | 背中合わせの薄い経路 | 位置をずらし、認定された納まりで処理 |

**room-in-room**は内側の床・壁・天井を外側からできるだけ分離する考え方です。荷重、耐震、天井高、換気、防火、避難、費用への影響が大きく、DIYの小改造として扱いません。

## 4. 遮音性能の読み方

- **transmission loss / sound reduction index**：試験体を通過する音の減少を周波数別に表す。
- **遮音のD値・室間音圧level差**：二室間の実測差を表す考え方。受音室の吸音や寸法にも影響される。
- **single-number rating**：周波数別性能を一つの値へまとめた評価。低域や特定帯域の弱点が隠れることがある。
- **background noise**：受音側にもともとあるnoise。十分低くなければ透過音を正確に測れない。

recording studioではkickやbassの低域が重要なので、単一数値だけでなく1/3-octave等の周波数別dataと実際のsource spectrumを確認します。

::: warning 二つの「D」を混同しない
遮音で使う室間音圧level差のDと、室内音響の**D50 / Deutlichkeit（明瞭度）**は別概念です。問題文の「部屋間」「遮音」と「最初の50 ms」「明瞭度」を手掛かりに区別します。
:::

### D50 / Deutlichkeit（明瞭度）

D50は、impulse responseのうち直接音の到来を0 msとして、最初の50 msまでに届くenergyが全energyに占める割合です。

```text
D50 = 最初の50 msまでのenergy ÷ 全energy
```

通常は0〜1または百分率で表し、値が大きいほど初期energyの割合が多く、speech等の明瞭さを支えやすいと解釈します。ただし、用途に適した響きはD50だけでは決まらず、残響時間、C50/C80、周波数、席位置等と併せて評価します。**遮音のD値とは同じ記号でも意味・測定対象が違います。**

## 5. 吸音

### 吸音率と等価吸音面積

**absorption coefficient（吸音率）** `α` は、面へ入射した音energyのうち吸収された割合を表す考え方です。0なら理想的に吸収なし、1なら全吸収です。実測・評価条件により1をわずかに超える表示が出る場合もあります。

部屋全体の等価吸音面積 `A` は、各面積 `S_i` と吸音率 `α_i` の積を合計します。

```text
A = Σ(α_i × S_i)    [m² sabin]
```

吸音率は周波数で変わります。「吸音率0.8」という単一値だけでbass性能を判断しません。

### porous absorber

glass wool、rock wool、繊維、open-cell foam等は、内部を空気が動く時の摩擦でenergyを熱へ変えます。

- 厚いほど低い周波数まで作用しやすい。
- rigid wallとの間にair gapを取ると、同じ材厚でも低域側へ効果を広げられる場合がある。
- 表面を空気の通らない板で完全に覆うと、高域の多孔質吸音が減る。
- 繊維の飛散、防火、湿気、施工安全を製品仕様で確認する。

### resonant absorber

- **panel / membrane absorber**：板や膜と背後air cavityの共鳴で低域を狙う。
- **Helmholtz resonator**：開口部のair massとcavityのair springの共鳴を利用。
- **perforated / slotted panel**：多数の穴・溝とcavityを使う。

共鳴型は狙った帯域へ効率的ですが、tuning、loss、施工誤差、設置面積に影響されます。測定なしに小さな箱を置けば室modeが消えるわけではありません。

## 6. 残響時間

**reverberation time T60**は、音源停止後に室内のsound levelが60 dB減衰するのに相当する時間です。実測ではnoise floorのため、20 dBや30 dBの減衰からT20/T30を外挿することがあります。

Sabine式の基本形は次です。

```text
T60 ≈ 0.161 × V ÷ A

V：室容積 [m³]
A：等価吸音面積 [m² sabin]
```

例：`V = 60 m³`、`A = 20 m² sabin`なら、

```text
T60 ≈ 0.161 × 60 ÷ 20 = 0.483 s
```

同じ部屋でAを40へ増やすと約0.24 sです。これは拡散音場を仮定した近似です。小室、低域、吸音が偏った部屋では、周波数ごとの測定や別のmodelが必要です。

### 用途と残響

- voice booth：明瞭度を得たいが、全帯域を不均衡にdeadにするとboxyになる。
- live room：楽器を支える反射と、mic位置を選べる減衰が必要。
- control room：直接音と初期反射を管理し、録音判断を再現しやすくする。
- hall：音楽style、容積、客席、舞台、明瞭度、包囲感を一体で設計。

「短いほど正確」「長いほど音楽的」という一方向の正解はありません。

## 7. 反射と音場

### early reflectionとcomb filtering

speakerから耳へのdirect soundに、console、desk、side wall、ceiling等の反射が少し遅れて加わるとcomb filteringが生じます。反射面を吸音する、向きを変える、speaker・聴取位置・家具位置を変えるなど、pathそのものを調整します。

### flutter echo

平行で硬い二面の間を反射が往復し、手拍子で「ビンビン」「パタパタ」と聞こえる現象です。片面または両面の一部へ吸音・拡散・角度変化を導入します。

### diffusion

反射energyを広い方向・時間へ分散し、強いspecular reflectionを減らしながらlivenessを残します。diffuserは奥行きと対象波長の関係があり、薄い凹凸でdeep bassを拡散することはできません。小室へ大きなdiffuserを置くと、聴取距離不足や有効容積減少も起こります。

## 8. room modeと定在波

平行境界の間で波が往復し、特定周波数で位置ごとのpeak/nullができる現象です。長方形roomのmode周波数は次の式で近似できます。

```text
f(nₓ,nᵧ,n_z) = c/2 × √[(nₓ/Lₓ)² + (nᵧ/Lᵧ)² + (n_z/L_z)²]
```

- `c`：音速 [m/s]
- `Lₓ, Lᵧ, L_z`：室の長さ・幅・高さ [m]
- `nₓ, nᵧ, n_z`：0以上の整数。ただし全部0は除く。

4 m方向の最初のaxial modeは、音速343 m/sなら、

```text
f = 343 ÷ (2 × 4) ≈ 42.9 Hz
```

- **axial mode**：一組の向かい合う面に関係。
- **tangential mode**：二組の面に関係。
- **oblique mode**：三組すべての面に関係。

低域nullへEQ boostしても、位置で相殺されているなら大きなheadroomを消費するだけで改善しにくいことがあります。まずspeaker・listener・subwoofer位置、複数位置のresponse、bass absorptionを検討します。

## 9. control roomとmonitor配置

### geometryの出発点

- 左右対称なroom形状と配置を優先。
- L/R speakerとlistening positionをほぼ正三角形の出発点にする。
- tweeterを耳の高さ・推奨axisへ合わせる。
- 左右の壁・家具・windowによるreflection条件をそろえる。
- speakerと前壁、listenerと後壁の距離を測り、低域responseで調整。
- 部屋の幾何学的中心や、各寸法のちょうど1/2・1/4だけに固定しない。

### SBIR

**speaker-boundary interference response**は、speakerのdirect soundと境界からの反射が干渉して、低域〜中低域にpeak/nullを作る現象です。speakerを壁から少し動かすと、干渉周波数も変わります。「壁から必ず何cm」という万能値はありません。

### 測定の順序

1. speakerのpolarity、channel、gain、standの安定を確認。
2. micのcalibration fileとinput levelを確認。
3. 左右別、sub別、組合せを測る。
4. frequency responseだけでなくimpulse、decay、distortion、background noiseを見る。
5. 1点だけでなくlistening areaの複数点を比較。
6. placementと物理処理を先に検討し、最後に補正EQを使う。
7. 変更前後を同じ条件で保存する。

補正softwareは深いnull、長いdecay、左右非対称、doorからの漏音を物理的に消せません。

## 10. 空調・換気設備

studioには人、computer、display、amplifier、照明から熱が出ます。窓を閉める遮音室では、冷房と**外気換気**を別に考えます。

### noiseを減らす考え方

- 必要風量を確保しながらduct断面を大きくし、風速を下げる。
- fanやcompressorを敏感なroomから離し、防振支持・flexible jointを検討。
- duct silencer、曲がり、lined duct等でfan noiseとroom間cross-talkを減らす。
- diffuserで吹出しnoiseと演奏者へのdraftを抑える。
- ductを壁・天井へ固定する部分から振動bridgeを作らない。
- filter、drain、inspection hatchへ保守accessを残す。

silencerや細いductを追加すると圧力損失が増え、fanを強くして逆にnoiseが増える場合があります。音響、風量、pressure、温湿度、energyを設備設計者と同時に計算します。

### 評価指標

- A-weighted sound level：人の聴感に近づけた一つの総合値。
- octave / 1/3-octave band：低域rumbleや高域hissを周波数別に見る。
- NC / NR curve：background noise spectrumを曲線で評価する方法。

同じdBAでも、40 Hzのrumbleと4 kHzのhissでは録音への影響が違います。micを置く位置と空調の各運転modeで測ります。

#### NC / NRカーブの読み方

**NC（Noise Criteria）**と**NR（Noise Rating）**は、どちらも番号ごとにoctave-band sound pressure levelの許容曲線を持つ評価方法です。単一のdBA値ではなく、低域から高域までの測定spectrumをcurve群へ重ねて読みます。

1. project仕様が指定するband、測定位置、設備運転mode、測定時間でbackground noiseを測る。
2. 各octave bandのlevelを、指定されたNCまたはNR chartへplotする。
3. すべての測定点を超えずに覆う、最も低い番号のcurveをratingの出発点とする。
4. 一つのbandだけが突出している場合は、同じratingでもrumble、hiss、toneとして問題にならないかspectrumと聴感で確認する。

番号が小さいほど一般に静かな条件を表します。ただし、**NC-20は20 dBAという意味でも、全bandが20 dBという意味でもありません**。NCとNRはcurve形状・適用規程が同一ではないため、相互に同じ番号へ読み替えず、図表の版とproject指定を使います。studio / booth / control roomの目標値も用途、mic距離、空調mode、予算で変わるため、単一の暗記値を全室へ当てはめません。

## 11. 電気設備とnoise

### 安全と音質を分ける

- **protective earth（保護接地）**：感電・故障時の安全のため。勝手に外さない。
- **signal reference / audio common**：audio回路上の基準。
- **cable shield**：電磁noiseを遮蔽し、接続方式によりcurrent pathにもなる。

hum対策で電源plugのearth pinを折る、保護接地を切る、といった方法は危険です。audio transformer、balanced connection、適切な接続、設備側の等電位bondingを専門家と確認します。

### 計画項目

- 予定機器の消費電力、起動電流、将来増設を回路ごとに集計。
- lighting、motor、dimmer、空調、audioの配線経路と回路を検討。
- 過電流・漏電保護、接地、雷surge、停電時の安全停止。
- UPSは必要負荷、運転時間、waveform、fan noise、battery交換を確認。
- audio cableと電源cableを長距離平行に束ねず、交差するなら必要に応じて角度を付ける。
- patch、rack、metal conduit、建物earthのbondingをsystemとして設計。

ground loopは、複数の接地・shield経路に電位差があり、不要currentが流れる時に起こります。原因を測定し、balanced入力、isolation、接続点の整理で解決します。すべてを一律に片側shield接続へ変える方法は、RF、安全、機器設計により逆効果になる場合があります。

### 配線経路、配管、ケーブルピットの計画原則

配線図では端子同士だけでなく、**実際にcableが通る立体経路と保守方法**を描きます。

| 項目 | 計画すること | 避けたい状態 |
| --- | --- | --- |
| 経路分離 | power、dimmer / motor、analog mic、digital / network、speaker、controlを用途別に整理 | low-level audioとnoise源を長距離同じ束で平行敷設 |
| 交差 | やむを得ない異種cableの交差は短くし、配置・shield・規程を設計者と確認 | 「必ず直角なら安全」と測定せず決める |
| conduit / tray | cable外径、曲げ半径、引張り、将来増設、pull box、識別、放熱を見込む | 満杯の管へ無理に追加入線、sharp bend、行先不明 |
| wall / floor貫通 | 防火区画、煙、遮音、気密、防振、結露を同時に納める | 開口を空けたまま、硬い配管で浮き構造を短絡 |
| access | connector、junction、patch、点検口へ安全に到達できる | 故障時に壁・吸音仕上げを壊さないと触れない |
| documentation | 両端label、経路番号、竣工図、予備管、実測結果を残す | 図面と現場が一致せず、予備経路も使えない |

**cable pit / floor trench**は、多数の回線を床下でまとめ、必要位置から取り出す設備です。蓋の段差・耐荷重・がたつきnoise、浸水・清掃、cableの曲げ半径、電源との区画、bonding、将来の引替え、避難動線を同時に検討します。pitや空配管は便利ですが、room間を結ぶ空洞は漏音・煙・火のpathにもなります。遮音shellや防火区画を貫通する箇所では、必要本数へ整理し、認定されたfirestopと音響seal、構造分離の納まりを建築・消防・電気・音響担当で調整します。

必要な離隔、管の占積率、曲げ、支持、接地、firestop、通路寸法等の**法規数値は、用途、電圧、工法、建物、自治体、製品認定、改訂時期で変わります**。この教材の一つの数字を現場仕様にしません。最新版の法令・告示・自治体条例と製造元資料を確認し、建築士、消防設備関係者、電気主任技術者・電気工事士など、その工事に必要な有資格者へ設計・施工可否を確認します。

## 12. 法規の入口

studioを新築・改修する時は、少なくとも次の領域を確認します。

| 領域 | 主な確認例 |
| --- | --- |
| 建築基準法・関係令 | 用途、構造、内装制限、換気、採光、避難、区画、確認申請、用途変更 |
| 消防法・火災予防条例 | 消火・警報・避難設備、防炎物品、収容人員、火気、消防への届出 |
| 騒音規制法・自治体条例 | 指定地域・施設、敷地境界、時間帯、近隣noise、作業noise |
| 電気事業法・電気設備技術基準・電気工事士法 | 配線、保護、接地、工事資格、設備の安全 |
| 労働安全衛生法 | staffの騒音ばく露、作業環境、重量物、長時間作業、安全管理 |
| barrier-free・地方条例・賃貸契約 | 段差、通路、建物固有rule、改修承認、原状回復 |

foam、curtain、carpetに「音響用」と書かれていても、防火性能が適合するとは限りません。製品の認定・試験dataと使用部位を確認します。卵pack等を壁一面へ貼る方法は、低域遮音にならず、衛生・防火riskもあるため使いません。

## 13. studio設計の工程

### 1. brief

- 用途：band tracking、vocal、mix、mastering、配信、映像post。
- 最大人数、楽器、最大SPL、利用時間。
- 必要room、視線、communication、搬入、accessibility。
- 予算、schedule、将来拡張、賃貸条件。

### 2. site survey

- 24時間のbackground noiseとvibration。
- traffic、航空機、鉄道、近隣、屋上設備、rain、wind。
- 建物構造、既存wall/floor/duct/pipe、電源、耐荷重。
- 隣接roomの用途と時間帯。

### 3. performance criteria

- roomごとの許容background noise spectrum。
- source roomとreceiver room間の必要isolation。
- residual noise、reverberation、monitoring accuracy。
- temperature、humidity、ventilation、電源、network。

### 4. coordinated design

建築、音響、空調、電気、消防、構造を同じ図面で調整します。音響壁をductやbraceが貫通した時の納まりまで確認します。

### 5. commissioning

- room間isolationを周波数別に測定。
- background noiseを全設備modeで測定。
- reverberation、impulse response、frequency responseを測定。
- polarity、routing、clock、speaker level、emergency設備を検査。
- 竣工図、機器設定、測定data、保守手順を引き渡す。

## 14. 小さな自宅roomで安全に始める

構造工事をせず、次の順で改善します。

1. 最も静かな時間帯と外部noiseを記録。
2. speakerとlistening positionを左右対称にし、複数配置を測る。
3. desk reflection、side wall、ceiling、後壁の問題を個別に聴く。
4. 厚みとair gapのある、難燃性等を確認した市販吸音製品を必要位置へ置く。
5. cornerの低域decayを測り、十分な厚さ・面積のbass treatmentを検討。
6. door/windowの隙間は、換気・避難・賃貸条件を守る範囲で改善。
7. 小音量monitoringとclosed headphoneを併用し、近隣へ大音量を出さない。

重い材料の天井固定、電源改造、換気口閉鎖、sprinklerや感知器の移設は自分で行いません。

## 理解確認

1. 遮音と吸音の目的を一文ずつ説明してください。
2. 高性能な壁を作ってもdoor下の隙間で性能が決まる理由は何ですか。
3. airborne、structure-borne、flankingの例を一つずつ挙げてください。
4. double-leaf wallのmass–air–mass resonanceとは何ですか。
5. 面積20 m²、吸音率0.6の面の等価吸音面積はいくつですか。
6. 容積100 m³、等価吸音面積25 m² sabinのT60をSabine式で求めてください。
7. 5 m方向の最初のaxial modeを、音速343 m/sとして求めてください。
8. porous absorberを厚くする、または背後にair gapを取る主な目的は何ですか。
9. flutter echoとcomb filteringの違いを説明してください。
10. 低域nullへ大きなEQ boostをする前に試すことを三つ挙げてください。
11. 冷房と換気を分けて考える理由は何ですか。
12. duct silencerを追加するだけでnoiseが必ず下がるとは限らない理由は何ですか。
13. protective earthをhum対策で切ってはいけない理由は何ですか。
14. studio改修で建築と消防の両方を早期に確認する理由は何ですか。
15. commissioningで測る項目を四つ挙げてください。
16. NC / NR ratingを、単一のdBA値ではなくoctave-band spectrumから読む手順を説明してください。
17. cable pitが便利な一方で、遮音・防火上の弱点にもなり得る理由は何ですか。
18. 配線離隔や貫通部の法規数値を、この教材の固定値として覚えて現場へ適用してはいけない理由は何ですか。

<details>
<summary>解答例</summary>

1. 遮音は部屋の内外へ伝わる音を減らし、吸音は室内の反射energyを減らします。
2. 音は最も通りやすいair pathを通り、全体性能は弱い開口・側路に制限されるためです。
3. voiceが壁を通る、kick振動が床を通る、共通天井を回り込む、などです。
4. 二枚の壁をmass、間のairをspringとして起こる共鳴で、その付近の遮音が低下します。
5. `20 × 0.6 = 12 m² sabin`です。
6. `0.161 × 100 ÷ 25 = 0.644 s`、約0.64秒です。
7. `343 ÷ (2 × 5) = 34.3 Hz`です。
8. より低い周波数まで吸音効果を広げるためです。
9. flutter echoは平行面間の反射列、comb filteringはdirectと遅延した同系統音の加算・相殺による周波数responseです。
10. speaker位置、listener位置、sub位置、複数点測定、bass absorption等です。
11. 冷房は主に熱を運び、換気は必要な外気を入れ汚染物質を排出する別の機能だからです。
12. 圧力損失が増え、必要風量を得るためfan出力・風速・乱流noiseが増える場合があるためです。
13. 感電・故障電流から人を守る安全経路だからです。
14. 遮音構造や内装が、避難、区画、換気、感知器、防炎等に同時に影響するためです。
15. 遮音、background noise、残響、impulse/frequency response、設備mode、routing/polarity等です。
16. 指定条件で各octave bandを測り、chartへplotし、全bandを超えずに覆う最も低いcurveを出発点として、突出bandやtoneも確認します。
17. room間をつなぐ空洞・貫通経路となり、音、煙、火が回り込むpathを作り得るためです。区画、seal、構造分離、点検性を同時に設計します。
18. 適用値と必要資格は、用途、電圧、工法、建物条件、自治体、法令改訂で変わるためです。現行法、製品認定、所轄、有資格者へ確認します。

</details>

## 章末チェック

- [ ] 遮音・吸音・拡散・防振を区別できる
- [ ] source–path–receiverで漏音経路を列挙できる
- [ ] mass、気密、分離、cavityの役割を説明できる
- [ ] door、window、duct、貫通部の弱点を説明できる
- [ ] 吸音率と等価吸音面積を計算できる
- [ ] Sabine式の計算と適用限界を説明できる
- [ ] room modeの式で最初のaxial modeを求められる
- [ ] early reflection、comb、flutter、diffusionを区別できる
- [ ] speaker/listener位置を測定から調整できる
- [ ] 空調noise、防振、cross-talk、換気を説明できる
- [ ] NC / NRをoctave-band curveとして読み、dBAとの違いを説明できる
- [ ] protective earth、shield、signal referenceを区別できる
- [ ] power / audio / dataの配線経路、配管、pit、貫通部を保守・遮音・防火と一体で計画できる
- [ ] 法規数値と工事資格は現行法・所轄・有資格者へ確認する必要を説明できる
- [ ] 建築・消防・騒音・電気・労働安全の確認先を挙げられる
- [ ] commissioningの測定計画を作れる

## 一次資料・規格・法令

- [JAPRS：2026年度サウンドレコーディング技術認定試験 出題範囲](https://www.japrs.or.jp/exam/soundrecording/range/)
- [JAPRS：過去の問題・解答（2022〜2025年）](https://www.japrs.or.jp/exam/soundrecording/past/)
- [JAPRS：2023年公開試験問題（PDF）](https://www.japrs.or.jp/pdf/srtest2023.pdf)：NC curveが公開範囲に含まれることの確認用。本文・選択肢は転載していません。
- [JAPRS：2024年公開試験問題（PDF）](https://www.japrs.or.jp/pdf/srtest2024.pdf)：配線経路、配管、ケーブルピットが公開範囲に含まれることの確認用。掲載された数値を現行工事の一律基準にはしていません。本文・選択肢も転載していません。
- [ITU-R BS.1116：Methods for the subjective assessment of small impairments in audio systems](https://www.itu.int/rec/R-REC-BS.1116/)
- [ISO 3382-2：Measurement of room acoustic parameters — Reverberation time in ordinary rooms](https://www.iso.org/standard/36201.html)
- [e-Gov法令検索：建築基準法](https://laws.e-gov.go.jp/law/325AC0000000201)
- [e-Gov法令検索：建築基準法施行令](https://laws.e-gov.go.jp/law/325CO0000000338)
- [e-Gov法令検索：消防法](https://laws.e-gov.go.jp/law/323AC1000000186)
- [e-Gov法令検索：消防法施行令](https://laws.e-gov.go.jp/law/336CO0000000037)
- [e-Gov法令検索：騒音規制法](https://laws.e-gov.go.jp/law/343AC0000000098)
- [e-Gov法令検索：労働安全衛生法](https://laws.e-gov.go.jp/law/347AC0000000057)
- [e-Gov法令検索：電気工事士法](https://laws.e-gov.go.jp/law/335AC1000000139)
- [e-Gov法令検索：電気設備に関する技術基準を定める省令](https://laws.e-gov.go.jp/law/409M50000400052)

規格、法令、自治体条例は改訂されます。受験年度・所在地・建物条件に合わせて最新版を確認してください。
