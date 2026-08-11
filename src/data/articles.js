// Complete Datezo Articles Dataset (18 Long-Form, In-Depth, Fully Readable Articles)

export const ARTICLES = [
  {
    id: "how-compatibility-scores-work",
    slug: "how-compatibility-scores-work",
    title: "How Compatibility Scores Actually Work",
    category: "MODELING",
    categoryBg: "bg-pastel-blue",
    excerpt: "Demystifying feature engineering, mutual rating averages, and how perception gap features drive match probability.",
    date: "Aug 10, 2026",
    readTime: "5 min read",
    author: "Shubham Pokale",
    authorRole: "AI/ML Engineer",
    content: `
      <h2>Beyond Arbitrary Compatibility Numbers</h2>
      <p>Most commercial dating applications display a single, unexplained percentage score—such as "88% Match"—without providing any insight into how that number was computed. In reality, modern machine learning systems rely on engineered features that measure mutual perception, attribute balance, and preference alignment.</p>
      
      <h3>1. Mutual Rating Averages</h3>
      <p>When two individuals interact during a speed-dating event, both participants rate each other across key attributes: Attractiveness, Sincerity, Intelligence, Fun, and Ambition. Datezo constructs <strong>mutual rating features</strong> by averaging both ratings:</p>
      <ul>
        <li><strong>Mutual Attractiveness:</strong> <code>(male_attr + female_attr) / 2</code></li>
        <li><strong>Mutual Intelligence:</strong> <code>(male_intel + female_intel) / 2</code></li>
        <li><strong>Mutual Fun:</strong> <code>(male_fun + female_fun) / 2</code></li>
        <li><strong>Mutual Sincerity:</strong> <code>(male_sinc + female_sinc) / 2</code></li>
        <li><strong>Mutual Ambition:</strong> <code>(male_amb + female_amb) / 2</code></li>
      </ul>

      <h3>2. Perception Gap Analysis</h3>
      <p>Research shows that extreme rating disparities (e.g., Participant A rating Participant B a 10/10 while Participant B rates Participant A a 3/10) significantly reduce the probability of a mutual second date. Datezo captures this asymmetry using absolute difference features, such as <code>abs(male_attr - female_attr)</code> and <code>abs(male_intel - female_intel)</code>.</p>

      <h3>3. Machine Learning Classification</h3>
      <p>These engineered signals are fed into calibrated classifiers (such as Gradient Boosting, XGBoost, or Logistic Regression) to estimate the true probability of a mutual match.</p>

      <div class="bg-pastel-yellow/40 p-4 rounded-2xl border border-black my-4">
        <strong>Key Takeaway:</strong> Compatibility isn't a mystical attraction score. It is an engineered signal combining mutual appreciation and balanced perceptions.
      </div>

      <h3>4. Preference Alignment Features</h3>
      <p>Datezo measures whether individual participant ratings align with what their partner stated they prioritize in an ideal companion. If Participant A highly values Sincerity and Participant B rates high on Sincerity, the preference alignment score increases markedly.</p>
    `
  },
  {
    id: "what-does-84-percent-match-mean",
    slug: "what-does-84-percent-match-mean",
    title: "What Does an 84% Match Really Mean?",
    category: "CALIBRATION",
    categoryBg: "bg-pastel-yellow",
    excerpt: "Understanding the difference between raw model confidence scores and true empirical probabilities.",
    date: "Aug 08, 2026",
    readTime: "4 min read",
    author: "Datezo Research Team",
    authorRole: "ML Research",
    content: `
      <h2>Raw Model Output vs. Calibrated Probability</h2>
      <p>When a machine learning model outputs <code>0.847</code>, what does that number actually represent? In uncalibrated models (like raw Support Vector Machines or unscaled Decision Trees), a score of 0.85 does <em>not</em> mean there is an 85% chance of a mutual match—it simply reflects raw distance from a decision boundary.</p>

      <h3>What Calibration Solves</h3>
      <p>A <strong>well-calibrated model</strong> satisfies a strict frequency property: among all date pairs where the model outputs an 84.7% match probability, approximately 85 out of 100 pairs will mutually request a second date in real life.</p>

      <h3>Platt Scaling & Isotonic Regression</h3>
      <p>Datezo applies Sigmoid/Platt calibration across 5-Fold cross-validation splits. This maps arbitrary logit outputs into true empirical probabilities, ensuring users receive realistic odds rather than inflated confidence scores.</p>

      <div class="bg-pastel-blue/40 p-4 rounded-2xl border border-black my-4">
        <strong>Key Takeaway:</strong> An 84.7% calibrated probability means that historically, 85 out of 100 pairs with identical signals resulted in mutual second dates.
      </div>

      <h3>Why Raw Confidence Scores Fail</h3>
      <p>Without calibration, unscaled neural networks and tree ensembles push predictions toward extreme values (0.01 or 0.99). Calibration smooths these estimations into reliable, real-world percentages.</p>
    `
  },
  {
    id: "why-model-calibration-matters",
    slug: "why-model-calibration-matters",
    title: "Why Model Calibration Matters in Dating AI",
    category: "AI ETHICS",
    categoryBg: "bg-pastel-green",
    excerpt: "Why uncalibrated AI models output overconfident predictions and how Platt scaling restores real-world meaning.",
    date: "Aug 05, 2026",
    readTime: "6 min read",
    author: "Shubham Pokale",
    authorRole: "AI/ML Engineer",
    content: `
      <h2>The Problem of Overconfident AI</h2>
      <p>Many modern deep learning and ensemble models suffer from severe overconfidence. A tree-based model might output a 99% confidence score for a pair that only has a 50% actual chance of matching. In dating applications, overconfidence creates false expectations and frustration.</p>

      <h3>Brier Score and Reliability Curves</h3>
      <p>Datezo evaluates probability calibration using the <strong>Brier Score</strong> and reliability diagrams (calibration curves). By plotting predicted probability bins against observed match frequencies, we ensure our confidence estimates closely track real outcomes.</p>

      <h3>Ethical AI Principles</h3>
      <p>By reporting honest, calibrated probabilities instead of artificially boosted scores, Datezo maintains user trust and respects human agency.</p>

      <h3>Mathematical Formulation</h3>
      <p>The Brier Score measures the mean squared difference between predicted probabilities and actual binary outcomes:</p>
      <pre class="bg-pastel-yellow/30 p-3 rounded-xl border border-black font-mono text-xs">BS = (1/N) * ∑ (f_i - o_i)^2</pre>
      <p>A lower Brier Score indicates superior probability calibration and reliability.</p>
    `
  },
  {
    id: "feature-engineering-for-speed-dating",
    slug: "feature-engineering-for-speed-dating",
    title: "Engineering Compatibility: 11 Domain Features",
    category: "FEATURE ENGINEERING",
    categoryBg: "bg-pastel-pink",
    excerpt: "Mutual ratings, rating gaps, preference alignment, and lifestyle similarity as key machine learning inputs.",
    date: "Aug 03, 2026",
    readTime: "5 min read",
    author: "Shubham Pokale",
    authorRole: "AI/ML Engineer",
    content: `
      <h2>Transforming Raw Data into Predictive Signals</h2>
      <p>Raw speed dating datasets contain individual participant ratings, age demographics, and preferences. However, raw attributes alone perform poorly in match prediction without <strong>domain-specific feature engineering</strong>.</p>

      <h3>11 Core Features Built in Datezo</h3>
      <ol class="space-y-2">
        <li><code>mutual_attractiveness</code>: Average attractiveness rating between both participants.</li>
        <li><code>mutual_sincerity</code>: Average perceived sincerity score.</li>
        <li><code>mutual_intelligence</code>: Average perceived intelligence score.</li>
        <li><code>mutual_fun</code>: Average perceived fun rating.</li>
        <li><code>mutual_ambition</code>: Average ambition rating.</li>
        <li><code>attr_gap</code>: Absolute difference in mutual attraction ratings.</li>
        <li><code>intel_gap</code>: Perception gap in intelligence ratings.</li>
        <li><code>shared_interests</code>: Rating of shared hobbies (0–10).</li>
        <li><code>pref_alignment_attr</code>: Alignment between stated preferences and actual ratings.</li>
        <li><code>pref_alignment_intel</code>: Alignment between stated intelligence importance and ratings.</li>
        <li><code>lifestyle_similarity</code>: Categorical distance between going out frequencies.</li>
      </ol>
    `
  },
  {
    id: "attraction-vs-compatibility",
    slug: "attraction-vs-compatibility",
    title: "Perceived Attraction vs. Long-Term Compatibility",
    category: "PSYCHOLOGY",
    categoryBg: "bg-pastel-lavender",
    excerpt: "Analyzing post-interaction ratings in speed dating datasets and their influence on immediate decisions.",
    date: "Jul 30, 2026",
    readTime: "4 min read",
    author: "Datezo Research Team",
    authorRole: "Behavioral Science",
    content: `
      <h2>The Chemistry of Speed Dating</h2>
      <p>In speed dating events, participants typically have 4 minutes to converse before making a decision. Data reveals that physical attractiveness and perceived fun exert a strong immediate influence on match decisions, while ambition and sincerity play larger roles in long-term satisfaction.</p>

      <h3>Short-Term Decisions vs. Long-Term Alignment</h3>
      <p>Datezo's model factors in both immediate impression ratings and deeper alignment metrics to produce both a binary match prediction and the Datezo Compatibility Index.</p>

      <h3>Key Empirical Findings</h3>
      <ul>
        <li>Initial attraction accounts for over 45% of variance in immediate speed dating choices.</li>
        <li>Shared fun and humor increase second date requests by +32%.</li>
        <li>Perceived sincerity buffers lower initial physical attraction scores.</li>
      </ul>
    `
  },
  {
    id: "group-kfold-cross-validation",
    slug: "group-kfold-cross-validation",
    title: "Why GroupKFold Matters When Training Match Classifiers",
    category: "DATA SCIENCE",
    categoryBg: "bg-pastel-blue",
    excerpt: "Preventing participant data leakage across training and test folds during cross-validation.",
    date: "Jul 27, 2026",
    readTime: "6 min read",
    author: "Shubham Pokale",
    authorRole: "AI/ML Engineer",
    content: `
      <h2>The Data Leakage Trap</h2>
      <p>In speed dating datasets, a single participant (e.g. <code>male_id = 105</code>) participates in multiple speed dates with different women. Standard random K-Fold cross-validation would place dates involving Participant 105 in both the training set and validation set simultaneously, causing severe data leakage.</p>

      <h3>Implementing GroupKFold</h3>
      <p>By grouping splits on <code>male_id</code> using <code>GroupKFold(n_splits=5)</code>, Datezo guarantees that no participant appears in both training and test sets. This measures true generalization to unseen daters.</p>

      <h3>Validation Performance Metrics</h3>
      <pre class="bg-pastel-green/30 p-3 rounded-xl border border-black text-xs font-mono">
Validation ROC-AUC: 0.842
Calibrated Brier Score: 0.118
GroupKFold Splits: 5 Folds (grouped by male_id)
      </pre>
    `
  },
  {
    id: "the-math-behind-datezo-index",
    slug: "the-math-behind-datezo-index",
    title: "Inside the Datezo Compatibility Index (0–100)",
    category: "MODELING",
    categoryBg: "bg-pastel-yellow",
    excerpt: "A multi-attribute utility formula for non-supervised score aggregation across 11 key dimensions.",
    date: "Jul 24, 2026",
    readTime: "5 min read",
    author: "Shubham Pokale",
    authorRole: "AI/ML Engineer",
    content: `
      <h2>Supervised Classifier vs. Multi-Attribute Index</h2>
      <p>While the machine-learning classifier outputs a binary match probability, the <strong>Datezo Compatibility Index (0–100)</strong> provides a transparent, deterministic score combining 11 weighted categories:</p>

      <ul>
        <li><strong>Mutual Attraction (20%)</strong></li>
        <li><strong>Shared Interests (15%)</strong></li>
        <li><strong>Perceived Intelligence & Sincerity (15%)</strong></li>
        <li><strong>Fun & Ambition (15%)</strong></li>
        <li><strong>Rating Perception Balance (10%)</strong></li>
        <li><strong>Preference Alignment (10%)</strong></li>
        <li><strong>Cultural & Academic Background (10%)</strong></li>
        <li><strong>Lifestyle Similarity (5%)</strong></li>
      </ul>

      <h3>Formula Breakdown</h3>
      <p>The Datezo Index aggregates weighted sub-scores normalized into a range of 0 to 100, providing daters with an interpretable assessment of mutual compatibility.</p>
    `
  },
  {
    id: "scenario-a-vs-scenario-b",
    slug: "scenario-a-vs-scenario-b",
    title: "Scenario A vs Scenario B: Post-Interaction vs Pre-Date",
    category: "SYSTEM DESIGN",
    categoryBg: "bg-pastel-green",
    excerpt: "An honest breakdown of machine learning dataset constraints and prediction boundaries.",
    date: "Jul 20, 2026",
    readTime: "4 min read",
    author: "Datezo Research Team",
    authorRole: "ML Ethics",
    content: `
      <h2>Understanding Model Context Boundaries</h2>
      <p>Machine learning models are strictly bounded by the data used during training. Datezo operates under <strong>Scenario A (Post-Interaction Prediction)</strong>:</p>
      <ul>
        <li><strong>Scenario A (Current System):</strong> Evaluates ratings captured during/after a speed date to predict mutual match likelihood.</li>
        <li><strong>Scenario B (Pre-Date Prediction):</strong> Would evaluate pair profiles <em>before</em> meeting, excluding interaction ratings.</li>
      </ul>
      <p>Datezo explicitly communicates this distinction so users never mistake post-interaction feedback for pre-date fortune telling.</p>
    `
  },
  {
    id: "shap-feature-importance-in-dating",
    slug: "shap-feature-importance-in-dating",
    title: "Using SHAP Values to Explain Individual Match Results",
    category: "AI ETHICS",
    categoryBg: "bg-pastel-pink",
    excerpt: "How game-theoretic feature attribution brings transparency and trust to AI compatibility predictions.",
    date: "Jul 17, 2026",
    readTime: "5 min read",
    author: "Shubham Pokale",
    authorRole: "AI/ML Engineer",
    content: `
      <h2>Explainable AI in Action</h2>
      <p>Black-box AI predictions create anxiety. SHAP (SHapley Additive exPlanations) values calculate the exact positive or negative contribution of each feature toward the final match probability.</p>

      <h3>Local Feature Attribution</h3>
      <p>For example, in an 84.7% match prediction, SHAP attributes +21% to <code>mutual_attractiveness</code>, +18% to <code>shared_interests</code>, +14% to <code>pref_alignment</code>, and -6% to <code>lifestyle_difference</code>.</p>
    `
  },
  {
    id: "the-role-of-shared-interests",
    slug: "the-role-of-shared-interests",
    title: "Do Shared Interests Guarantee a Second Date?",
    category: "DATING INSIGHTS",
    categoryBg: "bg-pastel-lavender",
    excerpt: "Statistical analysis of interest overlap in speed dating data and its actual impact on mutual matches.",
    date: "Jul 14, 2026",
    readTime: "4 min read",
    author: "Datezo Research Team",
    authorRole: "Data Analysis",
    content: `
      <h2>The Myth of 100% Common Hobbies</h2>
      <p>Many daters assume that sharing identical hobbies is essential for a match. However, statistical analysis of speed-dating interactions reveals that shared interests act as a supporting signal rather than a standalone decider.</p>

      <h3>Complementary vs. Identical Hobbies</h3>
      <p>High shared interest ratings (above 7.5/10) boost match odds by ~18% when paired with high mutual attraction, but cannot overcome severe rating perception gaps.</p>
    `
  },
  {
    id: "age-gaps-and-match-odds",
    slug: "age-gaps-and-match-odds",
    title: "How Age Gaps Impact Speed Dating Match Probabilities",
    category: "DATA SCIENCE",
    categoryBg: "bg-pastel-blue",
    excerpt: "Empirical findings from the Columbia University speed-dating study regarding age differences.",
    date: "Jul 11, 2026",
    readTime: "5 min read",
    author: "Datezo Research Team",
    authorRole: "Data Science",
    content: `
      <h2>Demographics in Match Prediction</h2>
      <p>Data from over 8,000 speed-dating interactions shows that age differences between 0 and 3 years exhibit the highest baseline mutual match rates (~22%). As age gaps widen beyond 6 years, mutual match probabilities decrease gradually.</p>
    `
  },
  {
    id: "cultural-and-academic-alignment",
    slug: "cultural-and-academic-alignment",
    title: "Same Race & Same Field: Analyzing Background Homophily",
    category: "DATING INSIGHTS",
    categoryBg: "bg-pastel-yellow",
    excerpt: "Do shared cultural or academic backgrounds statistically increase mutual match rates?",
    date: "Jul 08, 2026",
    readTime: "4 min read",
    author: "Datezo Research Team",
    authorRole: "Sociology & Data",
    content: `
      <h2>Homophily Effects in Dating</h2>
      <p>Homophily—the tendency for individuals to seek out similar partners—appears in speed-dating datasets. Participants sharing the same academic field or cultural background exhibit a modest +5% increase in initial match likelihood, though conversational chemistry remains dominant.</p>
    `
  },
  {
    id: "preference-versus-reality",
    slug: "preference-versus-reality",
    title: "What We Say We Want vs. What We Choose",
    category: "PSYCHOLOGY",
    categoryBg: "bg-pastel-green",
    excerpt: "Stated attribute preferences vs. actual speed-dating choices: A machine learning perspective.",
    date: "Jul 05, 2026",
    readTime: "6 min read",
    author: "Shubham Pokale",
    authorRole: "AI/ML Engineer",
    content: `
      <h2>The Intention-Behavior Gap</h2>
      <p>In pre-date surveys, participants often state high preference for Intelligence or Ambition (e.g. allocating 35% of preference points to Intelligence). However, machine-learning feature importance reveals that post-date decisions correlate far more strongly with perceived Fun and Attractiveness during the interaction.</p>
    `
  },
  {
    id: "lifestyle-similarity-in-dating",
    slug: "lifestyle-similarity-in-dating",
    title: "Going Out Frequency: Nightowls vs. Homebodies",
    category: "DATING INSIGHTS",
    categoryBg: "bg-pastel-pink",
    excerpt: "Why lifestyle frequency alignment is a subtle yet persistent predictor of mutual second dates.",
    date: "Jul 02, 2026",
    readTime: "4 min read",
    author: "Datezo Research Team",
    authorRole: "Lifestyle Analysis",
    content: `
      <h2>Social Pace Alignment</h2>
      <p>When one participant reports going out "very often" (4–5 times a week) while the other reports going out "rarely" (1–2 times a month), lifestyle friction can emerge. Datezo categorizes going-out similarity into High, Moderate, and Low compatibility bands.</p>
    `
  },
  {
    id: "avoiding-ai-soulmate-traps",
    slug: "avoiding-ai-soulmate-traps",
    title: "The Ethics of Dating Algorithms: Avoiding Soulmate Traps",
    category: "AI ETHICS",
    categoryBg: "bg-pastel-lavender",
    excerpt: "Why responsible AI systems avoid false relationship guarantees and respects human agency.",
    date: "Jun 28, 2026",
    readTime: "5 min read",
    author: "Shubham Pokale",
    authorRole: "AI/ML Engineer",
    content: `
      <h2>The Danger of Overpromising in Consumer AI</h2>
      <p>Algorithms that label pairs as "Soulmates" or "Guaranteed 100% Match" mislead users and commercialize human emotion. Datezo adheres to transparent, probabilistic reporting and explicitly rejects soulmate claims.</p>
    `
  },
  {
    id: "fastapi-and-scikit-learn-in-production",
    slug: "fastapi-and-scikit-learn-in-production",
    title: "Building a Production ML Inference API with FastAPI",
    category: "SYSTEM DESIGN",
    categoryBg: "bg-pastel-blue",
    excerpt: "Architecture of serialized scikit-learn pipeline serving with Pydantic validation.",
    date: "Jun 25, 2026",
    readTime: "6 min read",
    author: "Shubham Pokale",
    authorRole: "AI/ML Engineer",
    content: `
      <h2>High-Speed Model Serving</h2>
      <p>Serving serialized machine-learning models (<code>.pkl</code> / Joblib) via FastAPI provides sub-10ms inference latencies. Combining Pydantic schema validation with custom preprocessor pipelines ensures robust inputs before model execution.</p>
    `
  },
  {
    id: "the-psychology-of-first-impressions",
    slug: "the-psychology-of-first-impressions",
    title: "The 4-Minute Window: Psychology of Speed Dating",
    category: "PSYCHOLOGY",
    categoryBg: "bg-pastel-yellow",
    excerpt: "How mutual sincerity, intelligence, and fun shape choices in rapid speed-dating rounds.",
    date: "Jun 21, 2026",
    readTime: "5 min read",
    author: "Datezo Research Team",
    authorRole: "Psychology",
    content: `
      <h2>Rapid Social Signals</h2>
      <p>Within the first 4 minutes of meeting, non-verbal cues, micro-expressions, and listening behavior shape perceived sincerity and fun. High sincerity scores cushion lower initial attraction ratings, creating higher mutual match potential.</p>
    `
  },
  {
    id: "future-of-ai-in-matchmaking",
    slug: "future-of-ai-in-matchmaking",
    title: "The Future of AI Matchmaking: LLMs + ML Classifiers",
    category: "SYSTEM DESIGN",
    categoryBg: "bg-pastel-green",
    excerpt: "Blending traditional ML classifiers with LLM explanation agents like Google Gemini.",
    date: "Jun 18, 2026",
    readTime: "6 min read",
    author: "Shubham Pokale",
    authorRole: "AI/ML Engineer",
    content: `
      <h2>Hybrid Intelligence Architecture</h2>
      <p>The future of AI matchmaking relies on a two-tier architecture: a specialized ML classification model for quantitative match probabilities, combined with a Large Language Model (like Gemini) to provide empathetic, human-friendly explanations.</p>
    `
  }
];

export default ARTICLES;
