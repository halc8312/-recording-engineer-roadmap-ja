---
title: 初学者3分ガイド
description: JAPRSの勉強を一度もしていない人が、試験の形と最初の10分を迷わず確認するためのガイド
aside: false
outline: false
---

# はじめてのJAPRS：3分ガイド

まだ問題を解いたことがなくても大丈夫です。ここでは点数を測りません。**試験の地図を3分で見て、今日の10分を始めること**だけが目標です。

<div class="beginner-steps" aria-label="3分ガイドの構成">
  <span><strong>1分目</strong>試験の形</span>
  <span><strong>2分目</strong>学ぶ順番</span>
  <span><strong>3分目</strong>今日やること</span>
</div>

## 1分目：どんな試験？

JAPRSサウンドレコーディング技術認定試験は、4つの分野から25問ずつ、合計100問を90分で解く四者択一試験です。合否を決めるのではなく、得点に応じてA〜Eランクと分野別成績が交付されます。

<div class="beginner-domain-grid">
  <section><strong>I</strong><span>音・聴覚・電気の基礎</span></section>
  <section><strong>II</strong><span>マイク・配線・スタジオ機器</span></section>
  <section><strong>III</strong><span>録音・ミックス・先進音響</span></section>
  <section><strong>IV</strong><span>音楽・著作権・録音史</span></section>
</div>

今はランクを決める必要はありません。まず4分野を一周し、説明・計算・問題練習を繰り返します。

試験日時・受験料・評価方法は年度により変わる可能性があります。受験を申し込む前に、JAPRS公式の[実施要項](https://www.japrs.or.jp/exam/soundrecording/guide/)と[出題範囲](https://www.japrs.or.jp/exam/soundrecording/range/)を確認してください。

## 2分目：何から始める？

順番はこれだけです。

1. **Week 1から基礎を読む**
2. 読んだ内容を、資料を閉じて短く説明する
3. 理解確認を解き、間違えた節へ戻る
4. 7章を一周したら、独自問題と100問模試で測る
5. 最後に未見の公式公開過去問題で到達度を確認する

::: tip 過去問を急いで解かなくて大丈夫
公式公開問題は、基礎を一周した後の「初見測定」に残せます。最初の10問ウォームアップも任意です。未学習時の点数で適性は決まりません。
:::

## 3分目：今日やること

今日はWeek 1の最初だけ、10分で終えます。

- 6分：客観的な音と主観的な音を読む
- 3分：ページを閉じ、「音の2つの意味」を自分の言葉で言う
- 1分：理解確認1に答える

全部覚えなくて構いません。分からない言葉が出ても、止まらず一度最後まで進みます。

<BeginnerGuideComplete />

## 迷ったときの戻り先

- 次にやることを1つだけ見る：[学習ホーム](/progress)
- 16週間の全体像を見る：[JAPRS 16週間プラン](study-plan.md)
- 出題傾向を詳しく調べる：[過去問1,300問分析](past-exam-analysis.md)

<style>
.beginner-steps {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
  margin: 22px 0 34px;
}
.beginner-steps span {
  display: grid;
  min-height: 82px;
  gap: 4px;
  align-content: center;
  padding: 14px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 13px;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg-soft);
  font-size: .84rem;
}
.beginner-steps strong { color: var(--vp-c-brand-1); }
.beginner-domain-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
  margin: 20px 0;
}
.beginner-domain-grid section {
  display: flex;
  min-height: 72px;
  gap: 12px;
  align-items: center;
  padding: 14px 16px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
}
.beginner-domain-grid strong {
  display: grid;
  width: 34px;
  height: 34px;
  flex: 0 0 auto;
  place-items: center;
  border-radius: 50%;
  color: var(--vp-button-brand-text, #fff);
  background: var(--vp-c-brand-1);
}
@media (max-width: 560px) {
  .beginner-steps,
  .beginner-domain-grid { grid-template-columns: 1fr; }
  .beginner-steps span { min-height: 68px; }
}
</style>
