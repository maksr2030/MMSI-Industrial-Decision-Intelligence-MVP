"use client";

import { useMemo, useState } from "react";

type Language = "ar" | "en";
type ScenarioId = "balanced" | "energy" | "throughput";

const copy = {
  ar: {
    eyebrow: "MMSI™ · تحقق صناعي مقيد قبل التنفيذ",
    title: "ذكاء القرار الصناعي على بيانات تشغيل حقيقية",
    intro:
      "عرض تحليلي مبني على بيانات تشغيل صناعية منشورة، يوضح سلامة البيانات ونتيجة الاختبار الزمني وحدود الاعتماد قبل أي تشغيل ميداني.",
    simulation: "بيانات صناعية حقيقية منشورة",
    language: "English",
    run: "إعادة تشغيل التحقق التحليلي",
    running: "جاري إعادة التحقق...",
    production: "السجلات المعالجة",
    energy: "دقة الاختبار الزمني",
    quality: "متوسط الخطأ المطلق",
    safety: "قرار الإنتاج",
    stable: "86,400",
    ready: "التحليل مكتمل",
    hold: "إيقاف إنتاجي",
    overview: "دليل التحقق",
    last24: "ملخص التحقق الزمني",
    output: "معامل التحديد R²",
    energyTrend: "RMSE",
    datasetTitle: "مصدر بيانات الاختبار",
    datasetSubtitle: "بيانات تشغيل منشورة لغلاية فحم صناعية",
    sourceLabel: "المصدر",
    sourceValue: "مصنع كيميائي في تشجيانغ، الصين",
    scopeLabel: "النطاق",
    scopeValue: "27 مارس إلى 1 أبريل 2022 · 5 ثوانٍ · 30 متغيراً",
    evidenceLabel: "سجل التحقق",
    evidenceValue: "تشغيل تحليلي مقيد · 17,280 سجلاً للاختبار",
    sourceLink: "فتح المصدر العلمي",
    evidenceBadge: "VALIDATED REPLAY",
    chartFootnote: "المقارنة بين التدريب والاختبار الزمني، وليست ضماناً للأداء التجاري",
    decisionGate: "بوابة القرار",
    gateSubtitle: "لا اعتماد إنتاجي في هذه النسخة",
    dataCheck: "سلامة البيانات",
    causalCheck: "التحقق الزمني",
    complianceCheck: "الاعتماد الإنتاجي",
    passed: "مستوفى",
    completed: "مكتمل",
    review: "مراجعة مطلوبة",
    recommendation: "الاستنتاج التحليلي",
    scenarioTitle: "مختبر السيناريوهات",
    scenarioSubtitle: "استكشاف نتائج التشغيل الحقيقي قبل أي قرار ميداني",
    balanced: "فحص سلامة البيانات",
    energyScenario: "مراجعة إشارات الانحراف",
    throughputScenario: "مراجعة الاختبار الزمني",
    expected: "المحصلة",
    noActuation: "لا يوجد اتصال تحكم أو كتابة أوامر",
    apply: "إضافة إلى سجل المراجعة",
    applied: "أضيفت إلى سجل المراجعة",
    causalTitle: "مسار التحقق",
    causalSubtitle: "مسار التحقق من المصدر إلى قرار الإنتاج",
    temperature: "مصدر البيانات",
    pressure: "تهيئة السجلات",
    energyNode: "اختبار زمني",
    qualityNode: "مراجعة بشرية",
    controls: "ضوابط المنصة",
    audit: "سجل تدقيق كامل",
    explanation: "تفسير هندسي لكل توصية",
    failClosed: "إغلاق عند الفشل",
    economic: "أثر اقتصادي قابل للقياس",
    footer:
      "MMSI™ · نتائج من بيانات صناعية منشورة · لا تُنسب النتائج إلى سابك · لا تصدر هذه النسخة أوامر تحكم فعلية.",
  },
  en: {
    eyebrow: "MMSI™ · BOUNDED INDUSTRIAL VALIDATION",
    title: "Industrial decision intelligence on real operating data",
    intro:
      "An analytical view built on published industrial operating data, showing data integrity, temporal holdout results and authorization limits before field deployment.",
    simulation: "Published real industrial data",
    language: "العربية",
    run: "Replay analytical validation",
    running: "Replaying validation...",
    production: "Rows processed",
    energy: "Temporal holdout R²",
    quality: "Mean absolute error",
    safety: "Production decision",
    stable: "86,400",
    ready: "Analysis complete",
    hold: "Production hold",
    overview: "Validation evidence",
    last24: "Temporal validation summary",
    output: "R² score",
    energyTrend: "RMSE",
    datasetTitle: "Validation data source",
    datasetSubtitle: "Published operating data from an industrial coal boiler",
    sourceLabel: "Source",
    sourceValue: "Chemical plant in Zhejiang, China",
    scopeLabel: "Scope",
    scopeValue: "27 Mar to 1 Apr 2022 · 5 seconds · 30 variables",
    evidenceLabel: "Validation record",
    evidenceValue: "Bounded analytical run · 17,280 holdout rows",
    sourceLink: "Open scientific source",
    evidenceBadge: "VALIDATED REPLAY",
    chartFootnote: "Training and temporal holdout comparison; not a commercial performance guarantee",
    decisionGate: "Decision gate",
    gateSubtitle: "No production authorization in this release",
    dataCheck: "Data integrity",
    causalCheck: "Temporal validation",
    complianceCheck: "Production authorization",
    passed: "Passed",
    completed: "Completed",
    review: "Review required",
    recommendation: "Analytical conclusion",
    scenarioTitle: "Scenario lab",
    scenarioSubtitle: "Explore real-data validation results before any field decision",
    balanced: "Inspect data integrity",
    energyScenario: "Review deviation signals",
    throughputScenario: "Review temporal holdout",
    expected: "Result",
    noActuation: "No control connection or command write",
    apply: "Add to review log",
    applied: "Added to review log",
    causalTitle: "Validation path",
    causalSubtitle: "From source data to production decision",
    temperature: "Data source",
    pressure: "Record preparation",
    energyNode: "Temporal holdout",
    qualityNode: "Human review",
    controls: "Platform controls",
    audit: "Full audit trail",
    explanation: "Engineering explanation per recommendation",
    failClosed: "Fail-closed governance",
    economic: "Measurable economic impact",
    footer:
      "MMSI™ · Results from published industrial data · Results are not attributed to SABIC · This release does not issue live control commands.",
  },
} as const;

const trend = [
  { label: "التدريب", labelEn: "Train", output: 53.3, energy: 30.0 },
  { label: "الاختبار الزمني", labelEn: "Holdout", output: 30.5, energy: 31.8 },
];

const scenarios: Record<ScenarioId, { impact: string; impactEn: string; recommendation: string; recommendationEn: string }> = {
  balanced: {
    impact: "86,400 من 86,400 سجلاً اجتاز فحص القيم غير الصالحة",
    impactEn: "86,400 of 86,400 rows passed invalid-value checks",
    recommendation: "جودة البيانات مستوفاة لهذا التشغيل التحليلي، مع إبقاء الاعتماد الإنتاجي خاضعاً للمراجعة البشرية.",
    recommendationEn: "Data quality passed for this analytical run; production authorization remains subject to human review.",
  },
  energy: {
    impact: "8,452 إشارة انحراف بنسبة 9.78% للمراجعة البشرية",
    impactEn: "8,452 deviation-review flags at a 9.78% review rate",
    recommendation: "الإشارات لا تمثل قرارات تحكم أو سبباً مثبتاً؛ تحتاج إلى مراجعة مهندس العملية قبل أي تفسير تشغيلي.",
    recommendationEn: "Flags are not control decisions or proven causes; process-engineer review is required before any operational interpretation.",
  },
  throughput: {
    impact: "R² = 0.305 في 17,280 سجلاً للاختبار الزمني",
    impactEn: "R² = 0.305 on 17,280 temporal holdout rows",
    recommendation: "النتيجة تثبت قابلية الفحص التحليلي فقط، ولا تثبت الجاهزية التشغيلية أو التنبؤ لمدة يومين إلى سبعة أيام.",
    recommendationEn: "The result supports analytical screening only; it does not establish operational readiness or two-to-seven-day prediction.",
  },
};

function MetricCard({ label, value, detail, tone }: { label: string; value: string; detail: string; tone: string }) {
  return (
    <article className={`metric-card ${tone}`}>
      <div className="metric-label">{label}</div>
      <div className="metric-value">{value}</div>
      <div className="metric-detail">{detail}</div>
    </article>
  );
}

export default function Home() {
  const [lang, setLang] = useState<Language>("ar");
  const [scenario, setScenario] = useState<ScenarioId>("balanced");
  const [running, setRunning] = useState(false);
  const [applied, setApplied] = useState(false);
  const t = copy[lang];
  const selected = scenarios[scenario];
  const direction = lang === "ar" ? "rtl" : "ltr";
  const recommendation = lang === "ar" ? selected.recommendation : selected.recommendationEn;
  const impact = lang === "ar" ? selected.impact : selected.impactEn;

  const scenarioLabel = useMemo(() => {
    if (scenario === "energy") return t.energyScenario;
    if (scenario === "throughput") return t.throughputScenario;
    return t.balanced;
  }, [scenario, t]);

  function runSimulation() {
    setRunning(true);
    setApplied(false);
    window.setTimeout(() => setRunning(false), 850);
  }

  return (
    <main className="mmsi-app" dir={direction}>
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <div className="mmsi-container">
        <header className="topbar">
          <div className="brand-lockup">
            <div className="brand-mark">M</div>
            <div>
              <div className="brand-name">MMSI<span>™</span></div>
              <div className="brand-subtitle">Industrial Decision Intelligence</div>
            </div>
          </div>
          <div className="topbar-actions">
            <span className="data-pill"><i /> {t.simulation}</span>
            <button className="language-button" onClick={() => setLang(lang === "ar" ? "en" : "ar")}>
              {t.language}
            </button>
          </div>
        </header>

        <section className="hero-section">
          <div className="hero-copy">
            <p className="eyebrow">{t.eyebrow}</p>
            <h1>{t.title}</h1>
            <p className="hero-intro">{t.intro}</p>
            <button className="primary-button" onClick={runSimulation} disabled={running}>
              <span className="button-icon">{running ? "…" : "▶"}</span>
              {running ? t.running : t.run}
            </button>
          </div>
          <div className="hero-status">
            <div className="status-orbit orbit-one" />
            <div className="status-orbit orbit-two" />
            <div className="status-core">
              <span className="core-dot" />
              <strong>{t.ready}</strong>
              <small>PRE-EXECUTION</small>
            </div>
          </div>
        </section>

        <section className="metrics-grid" aria-label={t.overview}>
          <MetricCard label={t.production} value="86,400" detail={lang === "ar" ? "5 ثوانٍ · 30 متغيراً" : "5 seconds · 30 variables"} tone="teal" />
          <MetricCard label={t.energy} value="0.305" detail={lang === "ar" ? "17,280 سجلاً للحجز الزمني" : "17,280 temporal holdout rows"} tone="amber" />
          <MetricCard label={t.quality} value="2.394" detail={lang === "ar" ? "متوسط الخطأ المطلق للاختبار" : "holdout mean absolute error"} tone="blue" />
          <MetricCard label={t.safety} value="HOLD" detail={lang === "ar" ? "مراجعة بشرية مطلوبة" : "human review required"} tone="green" />
        </section>

        <section className="panel evidence-panel">
          <div className="panel-heading">
            <div>
              <p className="panel-kicker">{t.datasetTitle}</p>
              <h2>{t.datasetSubtitle}</h2>
            </div>
            <span className="evidence-status">CC0 · PUBLIC</span>
          </div>
          <div className="evidence-grid">
            <div className="evidence-item"><span>{t.sourceLabel}</span><strong>{t.sourceValue}</strong><a href="https://springernature.figshare.com/articles/dataset/A_long-tailed_distribution_time-series_dataset_in_boiler_equipment/28868849" target="_blank" rel="noreferrer">{t.sourceLink}</a></div>
            <div className="evidence-item"><span>{t.scopeLabel}</span><strong>{t.scopeValue}</strong><small>{t.evidenceValue}</small></div>
            <div className="evidence-item"><span>{t.evidenceLabel}</span><strong>{lang === "ar" ? "تشغيل 11 أغسطس 2026" : "Run dated 11 Aug 2026"}</strong><small>46fa5984f8c136b5</small><small className="hash-line">CSV SHA-256 · e4c6078775fc24a72e3c1be4bb36c36902a2d6c30c1358bcba409caadf072f84</small></div>
          </div>
        </section>

        <section className="dashboard-grid">
          <article className="panel chart-panel">
            <div className="panel-heading">
              <div>
                <p className="panel-kicker">{t.overview}</p>
                <h2>{t.last24}</h2>
              </div>
              <span className="live-badge"><i /> {t.evidenceBadge}</span>
            </div>
            <div className="chart-legend">
              <span><i className="legend-output" /> {t.output}</span>
              <span><i className="legend-energy" /> {t.energyTrend}</span>
            </div>
            <div className="bar-chart" role="img" aria-label={t.last24}>
              {trend.map((point) => (
                <div className="bar-group" key={point.label}>
                  <div className="bar-track">
                    <div className="bar output-bar" style={{ height: `${point.output}%` }} />
                    <div className="bar energy-bar" style={{ height: `${point.energy}%` }} />
                  </div>
                  <span>{lang === "ar" ? point.label : point.labelEn}</span>
                </div>
              ))}
            </div>
            <div className="chart-footnote"><span>R² 0.305</span> {t.chartFootnote}</div>
          </article>

          <article className="panel gate-panel">
            <div className="panel-heading">
              <div>
                <p className="panel-kicker">{t.decisionGate}</p>
                <h2>{t.gateSubtitle}</h2>
              </div>
              <span className="shield-icon">✓</span>
            </div>
            <div className="gate-list">
              <div className="gate-row"><span className="gate-index">01</span><span>{t.dataCheck}</span><strong>{t.passed}</strong></div>
              <div className="gate-row"><span className="gate-index">02</span><span>{t.causalCheck}</span><strong>{t.completed}</strong></div>
              <div className="gate-row hold-row"><span className="gate-index">03</span><span>{t.complianceCheck}</span><strong>{t.hold}</strong></div>
            </div>
            <div className="hold-banner"><span>!</span><div><strong>{t.hold}</strong><small>{t.noActuation}</small></div></div>
          </article>
        </section>

        <section className="panel scenario-panel">
          <div className="panel-heading scenario-heading">
            <div>
              <p className="panel-kicker">{t.scenarioTitle}</p>
              <h2>{t.scenarioSubtitle}</h2>
            </div>
            <span className="scenario-number">03</span>
          </div>
          <div className="scenario-body">
            <div className="scenario-options">
              {(["balanced", "energy", "throughput"] as ScenarioId[]).map((id) => (
                <button key={id} className={`scenario-option ${scenario === id ? "selected" : ""}`} onClick={() => { setScenario(id); setApplied(false); }}>
                  <span className="option-radio" />
                  <span>{id === "balanced" ? t.balanced : id === "energy" ? t.energyScenario : t.throughputScenario}</span>
                </button>
              ))}
            </div>
            <div className="recommendation-card">
              <div className="recommendation-top"><span>{t.recommendation}</span><span className="review-tag">{t.review}</span></div>
              <h3>{scenarioLabel}</h3>
              <p>{recommendation}</p>
              <div className="impact-line"><span>{t.expected}</span><strong>{impact}</strong></div>
              <button className="secondary-button" onClick={() => setApplied(true)}>{applied ? `✓ ${t.applied}` : t.apply}</button>
            </div>
          </div>
        </section>

        <section className="panel causal-panel">
          <div className="panel-heading">
            <div>
              <p className="panel-kicker">{t.causalTitle}</p>
              <h2>{t.causalSubtitle}</h2>
            </div>
            <span className="causal-label">CAUSAL PATH</span>
          </div>
          <div className="causal-chain">
            {[t.temperature, t.pressure, t.energyNode, t.qualityNode].map((node, index) => (
              <div className="causal-step" key={node}>
                <div className={`causal-node node-${index + 1}`}><span>{String(index + 1).padStart(2, "0")}</span>{node}</div>
                {index < 3 && <div className="causal-arrow">{lang === "ar" ? "←" : "→"}</div>}
              </div>
            ))}
          </div>
        </section>

        <section className="controls-section">
          <div className="controls-heading"><p className="panel-kicker">{t.controls}</p><h2>{lang === "ar" ? "القرار يبقى قابلاً للتفسير والتدقيق" : "The decision remains explainable and auditable"}</h2></div>
          <div className="control-grid">
            {[t.audit, t.explanation, t.failClosed, t.economic].map((label, index) => (
              <div className="control-item" key={label}><span className="control-check">✓</span><div><strong>{label}</strong><small>{index === 2 ? t.hold : t.passed}</small></div></div>
            ))}
          </div>
        </section>

        <footer className="mmsi-footer">{t.footer}</footer>
      </div>
    </main>
  );
}
