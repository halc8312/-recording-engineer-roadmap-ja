# Cubase Pro 14 実習12本

画面名は日本語版を基準にしていますが、更新で表記が変わる場合は公式マニュアルで検索してください。各実習は「設定値を当てる」のではなく、処理前後を音量合わせして違いを説明できれば合格です。

## Lab 1：MOTU M2入出力と往復確認

目的：signal flow、ASIO、input bus、output busを理解する。

1. Studio SetupでMOTU M Series ASIOを選ぶ。
2. Audio ConnectionsでMono In 1、Mono In 2、Stereo Outを作る。
3. 48 kHz / 24 bit projectを作る。
4. input 1へ声または楽器を入れ、本番最大音量でgainを調整。
5. 10秒録音し、再生、WAV export、再importまで行う。

記録：buffer、input latency、output latency、record peak、export format。

合格：M2 GAIN、track input、fader、Stereo Out、monitor knobの役割を図示できる。

## Lab 2：gain stagingとlevel-matched比較

1. 同じclipを3trackへ複製。
2. clip gainを0、-6、-12 dBにする。
3. faderまたはoutputで最終levelをそろえた比較も作る。
4. peak meterと聴感を記録。

合格：「大きいから良く聴こえる」影響と音質差を分けて説明できる。

## Lab 3：sample rate、bit depth、codec

1. 48 kHz / 24 bitの30秒素材を作る。
2. 44.1 kHz / 24 bit、44.1 kHz / 16 bit、確認用MP3へexport。
3. 全fileを新projectへimportし、formatとdurationを確認。
4. 可能なら差分を聴くが、聴き分けられない時は正直に記録。

合格：用途ごとにどのfileをarchive / delivery / previewにするか決められる。

## Lab 4：1本または2本のマイク位置

1. 同じ音源を近・中・遠で録る。
2. 2本ある場合はclose＋roomまたはstereo pairも録る。
3. clip gainでlevelをそろえる。
4. low end、attack、room、noise、mono時の変化を表へ記録。

合格：最良位置を「明るいから」だけでなく、曲中の役割で選べる。

## Lab 5：polarity、time差、mono

1. 2本で録った同一音源、または同じclipを複製して数sampleずらした素材を使う。
2. stereo、mono、片方mute、polarity reverseを比較。
3. 低域とcomb filteringの変化を聴く。
4. 波形表示と耳の判断が一致するか記録。

合格：polarity reverseとtime alignmentを別の操作として説明できる。

## Lab 6：compingとcrossfade

1. 1phraseを3take録る。
2. lane/comp機能でbest performanceを作る。
3. edit点にcrossfadeを入れる。
4. soloだけでなくbackingと一緒に確認。
5. raw / comp / tuned等を別versionで保存。

合格：clickがなく、phraseとroom toneが自然で、元takeへ戻せる。

## Lab 7：pluginなしstatic mix

1. practice multitrackをimportし、track名、色、folder、groupを整理。
2. Insertを外し、clip gain、fader、pan、mute、polarityだけでmix。
3. normal stereo、mono、小音量で確認。
4. `StaticMix_v01.wav` をexport。

合格：最重要3要素が伝わり、pluginで直す問題を最大5つに絞れている。

## Lab 8：EQのlevel-matched A/B

1. 問題trackを1つ選び、時刻と問題を書く。
2. broad EQ版、narrow EQ版、処理なし版を作る。
3. bypass時とoutput loudnessをそろえる。
4. solo / full mix / monoで比較。

記録：frequency、gain、Q、filter type、目的、side effect。

合格：数値ではなく、他trackとの関係で採用版を選べる。

## Lab 9：compressorのattack/release

1. vocal、bass、snare等から1trackを選ぶ。
2. ratioとgain reductionをおおむね揃え、fast/slow attackを比較。
3. releaseもshort/longを比較。
4. output gainで音量をそろえる。
5. transient、sustain、groove、noiseの変化を書く。

合格：meterを見ずに採用理由を説明し、その後meterで検証できる。

## Lab 10：FX sendとautomation

1. reverb用FX channel、delay用FX channelを1つずつ作る。
2. sendで複数trackを共有させる。
3. BPMからdelay timeを計算し、耳で微調整。
4. vocal level、delay throw、reverb sendを必要箇所だけautomation。

合格：FX returnをmuteした時に曲の奥行きは変わるが、主役が崩れない。

## Lab 11：referenceとmonitoring

1. referenceを専用trackまたはControl Roomの外部入力へ用意。専用trackを使う場合は、自分のmix用stereo-bus処理を通らない出力へrouteする。
2. 自分のmixとloudnessを近づけてA/B。
3. low end、vocal、brightness、width、dynamicを5段階で比較。
4. 自分のmixをreferenceそのものへ似せず、修正は最大3点。

合格：音量差のない比較と、referenceを選んだ理由を記録できる。

## Lab 12：masteringとQC

1. 24-bit pre-masterを別projectへimport。
2. meterでsample peak、true peak、integrated loudness等を確認。
3. 必要な処理だけ行い、limiterの有無を比較。
4. 24-bit masterと指定があれば16-bit版をexport。
5. export fileを読み戻し、最初から最後まで通して聴く。
6. `templates/mastering-qc.md` を埋める。

合格：処理前後をlevel-matchして採用理由を説明し、file仕様とQCを第三者へ渡せる。
