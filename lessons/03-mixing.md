# 03 ミキシング：意図、バランス、EQ、ダイナミクス、空間

## 学習目標

- pluginを挿す前に、曲の中心と問題を言葉にする。
- level-matched A/Bで、処理による改善と単なる音量差を分ける。
- EQ、compression、reverb、automationを目的から選ぶ。
- 小音量・mono・別環境でも重要要素が伝わるmixを作る。

## 1. 最初の15分

1. 全trackを通して聴き、止めずに3点だけ書く。
2. referenceを1〜2曲選ぶ。音量をそろえる。
3. 曲の最重要要素を最大3つ決める。
4. technical問題とartistic好みを分ける。
5. mixの期限とversion数を決める。

referenceは「同じ音にする答え」ではなく、low end、vocal位置、dynamic、width、brightness、arrangement密度の尺度です。

## 2. static mix {#static-mix}

最初はInsertをすべてbypassし、clip gain、fader、pan、polarity、muteだけで作ります。

推奨の確認順：

1. trackの不要音、edit、polarity
2. 最重要要素
3. kick/bassなどlow-end関係
4. rhythmとharmony
5. widthとcenter
6. headroom

「soloで美しい音」ではなく、全体で役割を果たす音を作ります。小音量にすると、balanceとarrangementの優先順位が見えやすくなります。

## 3. EQ {#eq}

EQの目的例：

- 不要帯域を減らす
- 重要な特徴を見せる
- 他の音とのmaskingを減らす
- 距離感・明暗・質感を変える
- resonanceをdynamicに抑える

手順：

1. 問題を時刻と文で書く。
2. どのtrackを変えると最小処理で解決するか考える。
3. broad / narrow、static / dynamicを選ぶ。
4. bypass時とoutput loudnessをそろえる。
5. 全体、solo、mono、小音量で確認する。

high-pass filterを全trackへ機械的に入れません。不要なsubsonicやrumbleを除くには有効ですが、fundamental、body、phase response、arrangementとの関係を聴きます。

## 4. compression {#compression}

主要parameter：

- threshold：どこから動作するか
- ratio：thresholdを超えた変化をどの程度抑えるか
- attack：立ち上がりへ反応する速さ
- release：抑えた後に戻る速さ
- knee：動作開始の滑らかさ
- makeup / output：比較用のlevelを整える

目的例：peak control、演奏levelの安定、sustain、transient shaping、groove、色付け、bus glue。

聴き分け実験：

1. 効果を理解するため一度強めに設定。
2. attackを速い/遅いで比較し、transientの変化を聴く。
3. releaseを曲のpulseに合わせ、pumpingや戻り遅れを確認。
4. gain reductionを目的に必要な範囲へ戻す。
5. outputをそろえてbypass比較。

meterの数値だけで良否を決めません。同じ3 dBのgain reductionでも、detector、time constant、program materialで聴こえ方が変わります。

### parallel compression

dryと強く圧縮したsignalを混ぜます。単に「原音を守れる魔法」ではなく、comb filtering、latency compensation、noise、brightness、transientの二重化を確認します。

## 5. gate、de-esser、saturation

- gate/expander：leakやnoiseを減らす。attack/releaseとhysteresisで語尾やdecayを切らない。
- de-esser：sibilanceを狙うdynamic処理。マイク位置、clip gain、automationの方が自然な場合もある。
- saturation：harmonicsとsoft clippingで密度や色を加える。level-matchedで、low endとtransientの損失も確認。

## 6. reverbとdelay {#reverb-delay}

InsertよりFX channelへのsendを基本にすると、複数trackが同じ空間を共有し、CPUと管理を節約できます。

- pre-delay：dry音とreverbの始まりの間隔。前後感と明瞭度に関係。
- decay time：残響の長さ。tempoとarrangement密度に合わせる。
- early reflections：部屋の大きさ・距離の印象。
- damping / EQ：残響の明暗とmasking。

delay timeの概算：四分音符msは `60,000 / BPM`。二分、八分、付点、三連へ倍率をかけます。ただし演奏のgrooveに合わせて耳で微調整します。

## 7. stereoとmono {#stereo-mono}

- center：kick、bass、lead vocalなどを置くことが多いが、arrangementで判断。
- width：panだけでなく、演奏差、time差、level差、room、stereo processingで生まれる。
- mono compatibility：小型speaker、片耳、放送、clubなどで重要。mono化して消える要素、low-end、vocal、reverbを確認。
- correlation meter：参考にするが、曲全体の単一数値だけで判断しない。

M/S処理は便利ですが、sideの過剰なboostはmono時に消える情報を増やします。まず通常のbalanceとarrangementで解決します。

## 8. automation {#automation}

compressionで全てを平らにせず、言葉、phrase、solo、effect send、mute、panを時間軸で整えます。

優先順：

1. vocal rides
2. soloやhook
3. verse/chorusのenergy
4. effect send/return
5. transition

## 9. Cubaseでの基本構成

- folder：録音素材の整理
- group channel：drums、music、vocalsなどのまとめ
- FX channel：reverb、delay
- MixConsole Channel Strip / EQ / Compressor：基本処理
- Control Room / meter：referenceとmonitoring、loudness確認
- MixConsole snapshotまたは新version：比較

signal flowが説明できない複雑なroutingは作りません。plugin名ではなく、入力、出力、目的、gain changeを記録します。

## 終了条件

- [ ] 最重要要素が小音量でも分かる
- [ ] vocalやmelodyの言葉・phraseが伝わる
- [ ] low endがreferenceに対して極端でない
- [ ] monoで重要要素が消えない
- [ ] bypass比較が音量差に騙されていない
- [ ] clipping、click、edit noise、頭切れ、末尾切れがない
- [ ] 変更理由を3文で説明できる
- [ ] 締切を守り、次versionで直す項目を最大5つに絞った
