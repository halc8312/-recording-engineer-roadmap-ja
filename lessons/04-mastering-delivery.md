# 04 マスタリングと納品：測定、判断、書き出し、QC

## 学習目標

- masteringを「音を大きくする作業」だけでなく、最終判断と納品管理として理解する。
- LUFS、true peak、sample peak、LRAを区別する。
- mixを壊さず、複数曲のまとまり、metadata、format、QCまで扱う。
- 配信サービスの正規化値を唯一の制作目標にしない。

## 1. mixとmasterを分ける理由

mixは各trackの関係を作り、masteringは完成したmixを別視点で評価して、媒体・作品全体・再生環境に合わせます。同じ人が両方行う場合も、別project、休憩、reference、固定monitor levelなどで視点を切り替えます。

masteringでmixの大問題を無理に直さず、可能ならmixへ戻ります。vocalだけ暗い、snareだけ大きい、reverbだけ長い問題は、2mix処理よりmix revisionが自然です。

## 2. pre-masterの準備

- stereo busで意図しないclipがない。
- limiterの有無と目的を記録する。音作りとして必要なら外す必要はない。
- peakを必ず-6 dBFSにする魔法の規則はない。処理の余裕とclipのない状態を確保する。
- original sample rate、24-bit以上のlossless fileを基本にする。
- MP3からmasterを作らない。
- song title、version、sample rate、bit depth、dateをfilenameに入れる。
- referenceとmix notesを添える。

## 3. meterの意味

- sample peak：保存されたsample値の最大。
- true peak：sample間に生じ得る再構成波形のpeakを推定。codec変換やD/Aでのoverを考える。
- momentary loudness：短い時間窓のloudness。
- short-term loudness：数秒規模のloudness。
- integrated loudness：programme全体をgate付きで平均したloudness。
- loudness range：programmeのloudness変動の分布を表す指標。短い曲や構成によって解釈が変わる。

ITU-R BS.1770はloudnessとtrue-peakの測定法を定義し、EBU R 128は放送運用の推奨です。EBUの-23 LUFSを音楽配信masterの固定目標へそのまま移しません。

## 4. masteringの基本手順 {#mastering-workflow}

1. file integrityとformatを確認。
2. 最初から最後まで、止めずに聴いてtimestamp付きメモ。
3. referenceを音量合わせして比較。
4. tonal balance、dynamic、stereo、noise、distortionを確認。
5. 最小限のEQ、compression、saturation等を必要な場合だけ行う。
6. limiterでpeakを管理し、複数のlevelでartifactを確認。
7. level-matchedで未処理版と比較。
8. 曲順、曲間、fade、metadataを決める。
9. target formatへ書き出し。
10. 書き出したfileを新規projectまたはplayerへ読み戻し、最初から最後までQC。

chainを先に固定せず、問題に応じて選びます。典型例は `meter → corrective EQ → gentle dynamics/colour → limiter → final meter/dither` ですが、何もしない判断も正解です。

## 5. loudnessの考え方

「配信サービスが正規化するから必ず-X LUFS」のように一つの数値へ固定しません。

判断材料：

- genreとartistの意図
- referenceのdynamicとtransient
- distortion、pumping、low-end collapse
- codec変換後のtrue peak
- 複数曲間の体感level
- 納品先の最新仕様
- 将来の別用途に使える高品質archive master

正規化で再生levelを下げられても、過度なlimitingで失ったtransientや歪みは戻りません。一方、dynamicが大き過ぎて小さな再生環境で重要部分が聴こえない場合もあります。音楽として決め、meterで検証します。

## 6. ditherとsample-rate conversion

- 単純なworkflowでは、bit depthを下げる最終処理としてditherを1回。途中で固定小数点へ再量子化する工程がある場合は各工程を個別に設計する。
- sample-rate conversionは高品質設定で必要な回数だけ。
- 24-bit archive master、納品先指定版、確認用compressed fileを区別。
- MP3/AAC作成前のlossless masterを保存。

## 7. 最終QC {#final-qc}

### 音

- [ ] 頭切れ、末尾切れ、意図しない無音
- [ ] click、pop、edit、dropout
- [ ] vocalの歯擦音、plosive、breath
- [ ] low-endの歪み、limiter pumping
- [ ] stereo/mono、左右逆、polarity
- [ ] fadeと曲間
- [ ] headphone、小型speaker、通常音量、小音量

### file

- [ ] filenameとversion
- [ ] sample rate / bit depth / channel count
- [ ] duration
- [ ] sample peak / true peak / integrated loudness
- [ ] metadata、artist、title、ISRC等は依頼内容に従う
- [ ] checksumまたはsizeを引き渡し時に確認
- [ ] archive masterとdelivery copyを別保存

## 測定ログ例

| Version | SR/bit | Integrated | Max true peak | LRA | 判断 |
| --- | --- | ---: | ---: | ---: | --- |
| premaster_v03 | 48k/24 |  |  |  |  |
| master_v01 | 48k/24 |  |  |  |  |
| delivery_v01 | 指定 |  |  |  |  |

数値は「良い音の点数」ではなく、再現と事故防止の記録です。
