# 12週間ロードマップ

標準は週5時間です。忙しい週は2週間に分けても構いません。速さより、毎回「聴く → 仮説を立てる → 1つ変更する → 音量をそろえて比較する → 記録する」を守ることを優先します。

チェックとメモは [学習ダッシュボード](progress.md) に保存できます。この表のテーマ名から、各週の手順へ直接移動できます。

## 毎週の型

- 理論：90分
- Cubase実習：120分
- バンド素材または練習素材：60分
- 小テストと復習：30分

## 進捗

| 週 | テーマ | 完了条件 | 状態 |
| ---: | --- | --- | --- |
| 1 | [システムと信号経路](#week-1) | 録音から書き出しまでを図で説明できる | [記録](progress.md) |
| 2 | [音、周波数、dB](#week-2) | dB計算と逆二乗則の基本問題を解ける | [記録](progress.md) |
| 3 | [デジタル音声](#week-3) | sample rate / bit depth / clipping / ditherを説明できる | [記録](progress.md) |
| 4 | [電気音響とマイク](#week-4) | mic/line/Hi-Z、48V、極性と位相を区別できる | [記録](progress.md) |
| 5 | [収音と演奏](#week-5) | 2種類のマイク位置またはDI方法を比較できる | [記録](progress.md) |
| 6 | [編集とセッション管理](#week-6) | 非破壊でコンピングし、他人が開ける状態に整理できる | [記録](progress.md) |
| 7 | [スタティックミックス](#week-7) | プラグインなしで曲の意図が伝わるバランスを作れる | [記録](progress.md) |
| 8 | [EQ](#week-8) | 音量をそろえたA/BでEQの目的を説明できる | [記録](progress.md) |
| 9 | [ダイナミクス](#week-9) | attack/release/ratioを聴き分け、狙いを言語化できる | [記録](progress.md) |
| 10 | [空間・ステレオ・自動化](#week-10) | モノ互換を確認し、必要な箇所だけ自動化できる | [記録](progress.md) |
| 11 | [マスタリングとQC](#week-11) | pre-masterとmasterを作り、測定値と聴感を記録できる | [記録](progress.md) |
| 12 | [試験・権利・作品集](#week-12) | 模試、ケーススタディ、次の90日計画を完成できる | [記録](progress.md) |

## Week 1：システムと信号経路 {#week-1}

読む：[オーディオ基礎「信号経路」](lessons/01-audio-foundations.md#signal-flow)

実習：CubaseでMOTU M2のASIOドライバー、モノ入力1/2、ステレオ出力を設定。声または楽器を10秒録音し、24-bit WAVで書き出す。

記録する値：sample rate、record format、buffer size、往復レイテンシー、ピーク値。

成果物：紙またはMarkdownで `音源 → マイク/DI → M2 → ASIO → Cubase track → bus → output → M2 → headphones` を図示。

## Week 2：音、周波数、dB {#week-2}

読む：[音の基本](lessons/01-audio-foundations.md#sound-basics)と[dB](lessons/01-audio-foundations.md#decibels)

実習：同じ音を0 dB、-6 dB、-12 dBの3段階で書き出し、音量を戻した比較も行う。音量差が音質差に感じられる罠を体験する。

計算：[計算練習](practice/calculations.md)の1〜7、17。電気回路の8〜10はWeek 4で扱う。

成果物：周波数、振幅、周期、波長、音圧レベル、dBFSを自分の言葉で1行ずつ説明。

## Week 3：デジタル音声 {#week-3}

読む：[デジタル音声](lessons/01-audio-foundations.md#digital-audio)のsample rate、bit depth、quantization、clipping、clock、file format、dither。

実習：48 kHz / 24 bitで録った同じ素材を、44.1 kHz / 16 bitとMP3にも書き出す。元データを残し、用途ごとの違いを記録する。

成果物：「録音時24 bitを選ぶ理由」「ditherを最後に一度だけ使う理由」を説明。

計算：[計算練習](practice/calculations.md)の13〜15、18〜19。

## Week 4：電気音響とマイク {#week-4}

読む：[電気と回路](exam/02-electricity-circuits.md)の直流・Ohmの法則と、[録音と編集「マイクの基本」](lessons/02-recording-editing.md#microphone-basics)。

実習：可能なら同じ音源を、M2のマイク入力とHi-Z/DI入力で比較する。ファンタム電源が不要な機器へむやみに送らない。

計算：[計算練習](practice/calculations.md)の8〜10、16。電力と分圧は電気教材の例題も解く。

成果物：mic level / line level / instrument level、balanced / unbalancedの用途表。

## Week 5：収音と演奏 {#week-5}

読む：[マイク位置](lessons/02-recording-editing.md#microphone-placement)と[極性・位相](lessons/02-recording-editing.md#polarity-phase)。

実習A：マイクが1本なら、音源からの距離を10 cm、30 cm、100 cmで変えて録音。

実習B：マイクが2本なら、ステレオペアまたは別位置で録り、極性反転・時間差・モノ化を比較。

成果物：最良のテイクではなく、違いが最も説明しやすい3テイクと収音メモ。

## Week 6：編集とセッション管理 {#week-6}

読む：[編集](lessons/02-recording-editing.md#editing)と[セッション管理](lessons/02-recording-editing.md#session-management)。

実習：3テイクを録音し、comp、crossfade、clip gain、noise cleanupを最小限に行う。編集前後を別バージョンで保存。

命名：`01_Kick_In` のように番号・音源・位置を統一。色、フォルダー、マーカー、テンポ、拍子も整理。

成果物：他人に渡す想定のconsolidated audioとtrack sheet。

## Week 7：スタティックミックス {#week-7}

読む：[ミキシング「static mix」](lessons/03-mixing.md#static-mix)。

実習：すべてのInsertを外し、clip gain、fader、pan、polarityだけで90%まで作る。小音量、モノ、ヘッドホン片側でも確認。

成果物：Static Mix v1、最重要3要素と隠れてよい要素のメモ。

## Week 8：EQ {#week-8}

読む：[EQ](lessons/03-mixing.md#eq)。

実習：各EQには「何を、なぜ、どこで、何dB」を書く。広い帯域の小さな調整から始める。ブーストした版とカットした版を出し、ラウドネスをそろえて比較。

成果物：EQなし / EQありのlevel-matched A/Bと判断メモ。

## Week 9：ダイナミクス {#week-9}

読む：[compression](lessons/03-mixing.md#compression)。

実習：同じ素材でslow attack / fast attack、short release / long releaseを比較。gain reductionとoutput loudnessを記録し、bypass時と音量をそろえる。

成果物：vocalまたはbassのcompression比較3種。設定値ではなく、アタック・安定感・グルーヴの変化を書く。

## Week 10：空間・ステレオ・自動化 {#week-10}

読む：[reverbとdelay](lessons/03-mixing.md#reverb-delay)、[stereoとmono](lessons/03-mixing.md#stereo-mono)、[automation](lessons/03-mixing.md#automation)。

実習：FX channelへ1つのreverbと1つのdelayを作り、sendで共有。pre-delayとdecayを曲のテンポに合わせて調整。最後にボーカルと重要パートだけautomation。

計算：[計算練習](practice/calculations.md)の11〜12、20。

成果物：Mix v2、mono fold-down、スマートフォン相当の小型再生でのメモ。

## Week 11：マスタリングとQC {#week-11}

読む：[マスタリングの基本手順](lessons/04-mastering-delivery.md#mastering-workflow)と[最終QC](lessons/04-mastering-delivery.md#final-qc)。

実習：mix busに十分なheadroomを残したpre-masterを作る。別プロジェクトでmetering、tonal balance、dynamics、limiting、metadata、書き出しを行う。

成果物：24-bit master、必要なら16-bit版、測定値、無音・ノイズ・クリック・頭切れ・末尾切れのQC記録。

## Week 12：試験・権利・作品集 {#week-12}

読む：[資格・権利・仕事](lessons/05-exam-career.md#japrs-scope)。

実習：[JAPRS独自問題練習](exam/mock-exam.md)の10問ウォームアップ（任意）を受け、次に読む分野を記録する。試験コースを一周した後に100問・90分へ進む。正解した問題も根拠を説明できなければ復習対象にする。

成果物：[作品集ケーススタディ](templates/portfolio-case-study.md)を1本完成。資格受験までの弱点上位3分野と、次の90日で作る2作品を決める。

## 12週間後の継続方法

1. 新しい1曲でWeek 5〜11を繰り返す。
2. 月1回、公開過去問題を本番同様に解く。
3. 誤答を「知識不足」「計算ミス」「読み違い」「暗記不足」に分類する。
4. 3か月ごとに同じ素材をゼロからミックスし、前回との差をケーススタディ化する。
5. 他のバンド1組を無料または実費で録音し、締切・要望・修正対応を経験する。公開許可とクレジットは書面で確認する。
