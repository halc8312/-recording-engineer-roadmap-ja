# オリジナル基礎模試 解答・解説

## 解答一覧

| 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| B | A | C | D | B | A | C | A | D | B |

| 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| A | A | B | B | B | C | A | A | B | C |

| 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| B | A | A | A | B | A | C | A | B | A |

| 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| A | A | C | B | A | A | A | C | B | C |

## 解説

1. 振幅比は `20 log10(2)` で約+6.02 dB。
2. power比は `10 log10(2)` で約+3.01 dB。
3. `343/343 = 1 m`。
4. free fieldの理想的point sourceは距離2倍で約-6 dB。
5. dBは比率。dBFS、dB SPL、dBuなどは基準が違う。
6. Nyquist frequencyはsample rateの半分。実systemではanti-alias filter等のtransitionも考える。
7. 24-bitは小さいsignalを0 dBFS近くまで無理に上げず、headroomを取りやすい。
8. ditherは通常、最終的にbit depthを下げるときに使う。
9. A/D前のclipは後段のfaderやfloat処理では元へ戻らない。
10. digital clockは1台をmasterにし、他を同期させるのが基本。
11. small bufferは低latencyだがCPU処理の期限が短くなる。
12. balanced lineは差動signalを受け、共通mode noiseを打ち消しやすい。
13. `I=V/R=12/4=3 A`。
14. 同じ8 Ωを2本並列なら4 Ω。
15. phantomは接続機器の仕様を確認し、monitorを下げ、安全な順序で扱う。
16. microphone方式だけでは優劣や用途は決まらない。
17. directional micではproximity effectが起こり得る。
18. polarityは正負一括反転。phase relationshipは時間差と周波数で変化する。
19. XYはcapsuleを近づけ角度差でstereo imageを作るcoincident方式。
20. passive guitarは高impedanceを受けるHi-Z/instrument入力が一般的。
21. static mixではまず基本balanceと曲の優先順位を作る。
22. Qが高いほどbandwidthは狭くなる。
23. fast attackはtransientへ早く反応し、attack感を弱め得る。
24. slow releaseは次のeventまでgain reductionが残り得る。
25. processed側が大きいだけで良く感じるbiasを減らすためlevel-matchする。
26. shared reverbはFX channel＋sendが管理しやすい。
27. `60,000/120=500 ms`。
28. pre-delayはdirect soundとreverb onsetを離し、明瞭度と距離感を変える。
29. monoでphase cancellationやbalance崩れがないか確認する。
30. automationは時間で変わるmix判断に使う。
31. true peakはsample間peakを推定する。
32. integrated loudnessはprogramme全体をgate付きで評価する。
33. masteringはsequence、format、metadata、QCも含む。-6 dBFSは絶対規則ではない。
34. 単純な制作workflowでは、bit depth reduction時のditherは通常final stageで必要な1回。途中で固定小数点へ再量子化する特殊な工程は別途設計する。
35. isolationと室内acoustic treatmentは目的が違う。吸音材だけで完全防音にはならない。
36. room dimensionで決まるmodeは低域の場所差を生む。
37. studio空調は人の安全・快適性と低noise/低振動を両立させる。
38. mix担当だけではcomposition、performance、master等の権利を自動取得しない。
39. file管理、backup、迅速で正確な報告はassistantの基本。
40. 担当範囲と他者credit、判断過程を正直に示す方が再現性と信頼につながる。

## 採点の使い方

- 36〜40：基礎は安定。公式過去問題と歴史・規格・法規へ進む。
- 28〜35：弱い分野を1〜2つ選び、実習と計算をやり直す。
- 20〜27：Lesson 1〜4を順番に再学習し、各Labを説明できるようにする。
- 0〜19：焦らずWeek 1から開始。2週間後に同じ模試を再受験する。

分野別：1〜10は音響/デジタル、11〜20は電気音響/録音、21〜30はmix、31〜40はmastering/studio/権利/仕事です。

本模試には、公式教材固有の年表、機器規格、法規、歴史暗記を十分含めていません。受験年度の公式テキスト、公式問題集、公開過去問題で必ず補ってください。
