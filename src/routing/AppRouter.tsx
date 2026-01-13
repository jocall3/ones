import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthContext } from '../components/AuthContext';
import { AppContext } from '../components/AppContext';
import Loading from '../components/Loading';
import LoginView from '../components/LoginView';
import { CitiAuthGate } from '../components/CitiAuthGate';
import { PlaidContext } from '../components/PlaidContext';
import { StripeDataContext } from '../components/StripeDataContext';

// Lazy load components to improve initial load time
const LandingPage = lazy(() => import('../components/LandingPage'));
const AccountsView = lazy(() => import('../components/AccountsView'));
const TransactionsView = lazy(() => import('../components/TransactionsView'));
const InvestmentsView = lazy(() => import('../components/InvestmentsView'));
const BudgetsView = lazy(() => import('../components/BudgetsView'));
const SettingsView = lazy(() => import('../components/SettingsView'));
const SecurityView = lazy(() => import('../components/SecurityView'));
const SendMoneyView = lazy(() => import('../components/SendMoneyView'));
const OpenBankingView = lazy(() => import('../components/OpenBankingView'));
const CryptoView = lazy(() => import('../components/CryptoView'));
const CreditHealthView = lazy(() => import('../components/CreditHealthView'));
const CardCustomizationView = lazy(() => import('../components/CardCustomizationView'));
const FinancialGoalsView = lazy(() => import('../components/FinancialGoalsView'));
const MarketplaceView = lazy(() => import('../components/MarketplaceView'));
const RewardsHubView = lazy(() => import('../views/personal/RewardsHubView'));
const PortfolioExplorerView = lazy(() => import('../views/personal/PortfolioExplorerView'));
const DashboardView = lazy(() => import('../views/personal/DashboardView'));

// Corporate Views
const CorporateDashboardView = lazy(() => import('../views/corporate/CorporateDashboardView'));
const ComplianceView = lazy(() => import('../views/corporate/ComplianceView'));
const CounterpartiesView = lazy(() => import('../views/corporate/CounterpartiesView'));
const InvoicesView = lazy(() => import('../views/corporate/InvoicesView'));
const PaymentOrdersView = lazy(() => import('../views/corporate/PaymentOrdersView'));
const PayrollView = lazy(() => import('../views/corporate/PayrollView'));

// MegaDashboard Views
const ApiKeysView = lazy(() => import('../views/megadashboard/developer/ApiKeysView'));
const DataCatalogView = lazy(() => import('../views/megadashboard/analytics/DataCatalogView'));
const DataLakesView = lazy(() => import('../views/megadashboard/analytics/DataLakesView'));
const PredictiveModelsView = lazy(() => import('../views/megadashboard/analytics/PredictiveModelsView'));
const RiskScoringView = lazy(() => import('../views/megadashboard/analytics/RiskScoringView'));
const SentimentAnalysisView = lazy(() => import('../views/megadashboard/analytics/SentimentAnalysisView'));
const BenchmarkingView = lazy(() => import('../views/megadashboard/business/BenchmarkingView'));
const CompetitiveIntelligenceView = lazy(() => import('../views/megadashboard/business/CompetitiveIntelligenceView'));
const GrowthInsightsView = lazy(() => import('../views/megadashboard/business/GrowthInsightsView'));
const MarketingAutomationView = lazy(() => import('../views/megadashboard/business/MarketingAutomationView'));
const SalesPipelineView = lazy(() => import('../views/megadashboard/business/SalesPipelineView'));
const CliToolsView = lazy(() => import('../views/megadashboard/developer/CliToolsView'));
const ExtensionsView = lazy(() => import('../views/megadashboard/developer/ExtensionsView'));
const SandboxView = lazy(() => import('../views/megadashboard/developer/SandboxView'));
const SdkDownloadsView = lazy(() => import('../views/megadashboard/developer/SdkDownloadsView'));
const WebhooksView = lazy(() => import('../views/megadashboard/developer/WebhooksView'));
const DaoGovernanceView = lazy(() => import('../views/megadashboard/digitalassets/DaoGovernanceView'));
const NftVaultView = lazy(() => import('../views/megadashboard/digitalassets/NftVaultView'));
const OnChainAnalyticsView = lazy(() => import('../views/megadashboard/digitalassets/OnChainAnalyticsView'));
const SmartContractsView = lazy(() => import('../views/megadashboard/digitalassets/SmartContractsView'));
const TokenIssuanceView = lazy(() => import('../views/megadashboard/digitalassets/TokenIssuanceView'));
const AffiliatesView = lazy(() => import('../views/megadashboard/ecosystem/AffiliatesView'));
const CrossBorderPaymentsView = lazy(() => import('../views/megadashboard/ecosystem/CrossBorderPaymentsView'));
const IntegrationsMarketplaceView = lazy(() => import('../views/megadashboard/ecosystem/IntegrationsMarketplaceView'));
const MultiCurrencyView = lazy(() => import('../views/megadashboard/ecosystem/MultiCurrencyView'));
const PartnerHubView = lazy(() => import('../views/megadashboard/ecosystem/PartnerHubView'));
const CardManagementView = lazy(() => import('../views/megadashboard/finance/CardManagementView'));
const InsuranceHubView = lazy(() => import('../views/megadashboard/finance/InsuranceHubView'));
const LoanApplicationsView = lazy(() => import('../views/megadashboard/finance/LoanApplicationsView'));
const MortgagesView = lazy(() => import('../views/megadashboard/finance/MortgagesView'));
const TaxCenterView = lazy(() => import('../views/megadashboard/finance/TaxCenterView'));
const ApiThrottlingView = lazy(() => import('../views/megadashboard/infra/ApiThrottlingView'));
const BackupRecoveryView = lazy(() => import('../views/megadashboard/infra/BackupRecoveryView'));
const ContainerRegistryView = lazy(() => import('../views/megadashboard/infra/ContainerRegistryView'));
const IncidentResponseView = lazy(() => import('../views/megadashboard/infra/IncidentResponseView'));
const ObservabilityView = lazy(() => import('../views/megadashboard/infra/ObservabilityView'));
const ConsentManagementView = lazy(() => import('../views/megadashboard/regulation/ConsentManagementView'));
const DisclosuresView = lazy(() => import('../views/megadashboard/regulation/DisclosuresView'));
const LegalDocsView = lazy(() => import('../views/megadashboard/regulation/LegalDocsView'));
const LicensingView = lazy(() => import('../views/megadashboard/regulation/LicensingView'));
const RegulatorySandboxView = lazy(() => import('../views/megadashboard/regulation/RegulatorySandboxView'));
const AccessControlsView = lazy(() => import('../views/megadashboard/security/AccessControlsView'));
const AuditLogsView = lazy(() => import('../views/megadashboard/security/AuditLogsView'));
const FraudDetectionView = lazy(() => import('../views/megadashboard/security/FraudDetectionView'));
const RoleManagementView = lazy(() => import('../views/megadashboard/security/RoleManagementView'));
const ThreatIntelligenceView = lazy(() => import('../views/megadashboard/security/ThreatIntelligenceView'));
const ClientOnboardingView = lazy(() => import('../views/megadashboard/userclient/ClientOnboardingView'));
const FeedbackHubView = lazy(() => import('../views/megadashboard/userclient/FeedbackHubView'));
const KycAmlView = lazy(() => import('../views/megadashboard/userclient/KycAmlView'));
const SupportDeskView = lazy(() => import('../views/megadashboard/userclient/SupportDeskView'));
const UserInsightsView = lazy(() => import('../views/megadashboard/userclient/UserInsightsView'));

// Productivity Views
const TaskMatrixView = lazy(() => import('../views/productivity/TaskMatrixView'));

// Blueprint Views
const AdaptiveUITailorView = lazy(() => import('../views/blueprints/AdaptiveUITailorView'));
const AestheticEngineView = lazy(() => import('../views/blueprints/AestheticEngineView'));
const AutonomousScientistView = lazy(() => import('../views/blueprints/AutonomousScientistView'));
const CareerTrajectoryView = lazy(() => import('../views/blueprints/CareerTrajectoryView'));
const ChaosTheoristView = lazy(() => import('../views/blueprints/ChaosTheoristView'));
const CodeArcheologistView = lazy(() => import('../views/blueprints/CodeArcheologistView'));
const CognitiveLoadBalancerView = lazy(() => import('../views/blueprints/CognitiveLoadBalancerView'));
const CrisisAIManagerView = lazy(() => import('../views/blueprints/CrisisAIManagerView'));
const CulturalAssimilationAdvisorView = lazy(() => import('../views/blueprints/CulturalAssimilationAdvisorView'));
const DebateAdversaryView = lazy(() => import('../views/blueprints/DebateAdversaryView'));
const DynamicSoundscapeGeneratorView = lazy(() => import('../views/blueprints/DynamicSoundscapeGeneratorView'));
const EmergentStrategyWargamerView = lazy(() => import('../views/blueprints/EmergentStrategyWargamerView'));
const EtherealMarketplaceView = lazy(() => import('../views/blueprints/EtherealMarketplaceView'));
const EthicalGovernorView = lazy(() => import('../views/blueprints/EthicalGovernorView'));
const GenerativeJurisprudenceView = lazy(() => import('../views/blueprints/GenerativeJurisprudenceView'));
const HolographicMeetingScribeView = lazy(() => import('../views/blueprints/HolographicMeetingScribeView'));
const HypothesisEngineView = lazy(() => import('../views/blueprints/HypothesisEngineView'));
const LexiconClarifierView = lazy(() => import('../views/blueprints/LexiconClarifierView'));
const LinguisticFossilFinderView = lazy(() => import('../views/blueprints/LinguisticFossilFinderView'));
const LudicBalancerView = lazy(() => import('../views/blueprints/LudicBalancerView'));
const NarrativeForgeView = lazy(() => import('../views/blueprints/NarrativeForgeView'));
const PersonalHistorianAIView = lazy(() => import('../views/blueprints/PersonalHistorianAIView'));
const QuantumEntanglementDebuggerView = lazy(() => import('../views/blueprints/QuantumEntanglementDebuggerView'));
const QuantumProofEncryptorView = lazy(() => import('../views/blueprints/QuantumProofEncryptorView'));
const SelfRewritingCodebaseView = lazy(() => import('../views/blueprints/SelfRewritingCodebaseView'));
const SonicAlchemyView = lazy(() => import('../views/blueprints/SonicAlchemyView'));
const UrbanSymphonyPlannerView = lazy(() => import('../views/blueprints/UrbanSymphonyPlannerView'));
const WorldBuilderView = lazy(() => import('../views/blueprints/WorldBuilderView'));
const ZeitgeistEngineView = lazy(() => import('../views/blueprints/ZeitgeistEngineView'));

const AppRouter: React.FC = () => {
    return (
        <Router>
            <AuthContext.Consumer>
                {({ isLoggedIn }) => (
                    <AppContext.Consumer>
                        {({ apiKey }) => (
                            <PlaidContext.Consumer>
                                {() => (
                                    <StripeDataContext.Consumer>
                                        {() => (
                                            <Suspense fallback={<Loading />}>
                                                <Routes>
                                                    {/* Public Route */}
                                                    <Route path="/login" element={!isLoggedIn ? <LoginView /> : <Navigate to="/" />} />

                                                    {/* Private Routes - Requires Login */}
                                                    <Route path="/" element={isLoggedIn ? <LandingPage /> : <Navigate to="/login" />} />
                                                    <Route path="/accounts" element={isLoggedIn ? <AccountsView /> : <Navigate to="/login" />} />
                                                    <Route path="/transactions" element={isLoggedIn ? <TransactionsView /> : <Navigate to="/login" />} />
                                                    <Route path="/investments" element={isLoggedIn ? <InvestmentsView /> : <Navigate to="/login" />} />
                                                    <Route path="/budgets" element={isLoggedIn ? <BudgetsView /> : <Navigate to="/login" />} />
                                                    <Route path="/settings" element={isLoggedIn ? <SettingsView /> : <Navigate to="/login" />} />
                                                    <Route path="/security" element={isLoggedIn ? <SecurityView /> : <Navigate to="/login" />} />
                                                    <Route path="/sendmoney" element={isLoggedIn ? <SendMoneyView /> : <Navigate to="/login" />} />
                                                    <Route path="/openbanking" element={isLoggedIn ? <OpenBankingView /> : <Navigate to="/login" />} />
                                                    <Route path="/crypto" element={isLoggedIn ? <CryptoView /> : <Navigate to="/login" />} />
                                                    <Route path="/credithealth" element={isLoggedIn ? <CreditHealthView /> : <Navigate to="/login" />} />
                                                    <Route path="/cardcustomization" element={isLoggedIn ? <CardCustomizationView /> : <Navigate to="/login" />} />
                                                    <Route path="/financialgoals" element={isLoggedIn ? <FinancialGoalsView /> : <Navigate to="/login" />} />
                                                    <Route path="/marketplace" element={isLoggedIn ? <MarketplaceView /> : <Navigate to="/login" />} />
                                                    <Route path="/rewardshub" element={isLoggedIn ? <RewardsHubView /> : <Navigate to="/login" />} />
                                                    <Route path="/portfolioexplorer" element={isLoggedIn ? <PortfolioExplorerView /> : <Navigate to="/login" />} />
                                                    <Route path="/dashboard" element={isLoggedIn ? <DashboardView /> : <Navigate to="/login" />} />

                                                    {/* Corporate Views - Requires Login */}
                                                    <Route path="/corporate/dashboard" element={isLoggedIn ? <CorporateDashboardView /> : <Navigate to="/login" />} />
                                                    <Route path="/corporate/compliance" element={isLoggedIn ? <ComplianceView /> : <Navigate to="/login" />} />
                                                    <Route path="/corporate/counterparties" element={isLoggedIn ? <CounterpartiesView /> : <Navigate to="/login" />} />
                                                    <Route path="/corporate/invoices" element={isLoggedIn ? <InvoicesView /> : <Navigate to="/login" />} />
                                                    <Route path="/corporate/paymentorders" element={isLoggedIn ? <PaymentOrdersView /> : <Navigate to="/login" />} />
                                                    <Route path="/corporate/payroll" element={isLoggedIn ? <PayrollView /> : <Navigate to="/login" />} />

                                                    {/* MegaDashboard Views - Requires Login */}
                                                    <Route path="/megadashboard/developer/apikeys" element={isLoggedIn ? <ApiKeysView /> : <Navigate to="/login" />} />
                                                    <Route path="/megadashboard/analytics/datacatalog" element={isLoggedIn ? <DataCatalogView /> : <Navigate to="/login" />} />
                                                    <Route path="/megadashboard/analytics/datalakes" element={isLoggedIn ? <DataLakesView /> : <Navigate to="/login" />} />
                                                    <Route path="/megadashboard/analytics/predictivemodels" element={isLoggedIn ? <PredictiveModelsView /> : <Navigate to="/login" />} />
                                                    <Route path="/megadashboard/analytics/riskscoring" element={isLoggedIn ? <RiskScoringView /> : <Navigate to="/login" />} />
                                                    <Route path="/megadashboard/analytics/sentimentanalysis" element={isLoggedIn ? <SentimentAnalysisView /> : <Navigate to="/login" />} />
                                                    <Route path="/megadashboard/business/benchmarking" element={isLoggedIn ? <BenchmarkingView /> : <Navigate to="/login" />} />
                                                    <Route path="/megadashboard/business/competitiveintelligence" element={isLoggedIn ? <CompetitiveIntelligenceView /> : <Navigate to="/login" />} />
                                                    <Route path="/megadashboard/business/growthinsights" element={isLoggedIn ? <GrowthInsightsView /> : <Navigate to="/login" />} />
                                                    <Route path="/megadashboard/business/marketingautomation" element={isLoggedIn ? <MarketingAutomationView /> : <Navigate to="/login" />} />
                                                    <Route path="/megadashboard/business/salespipeline" element={isLoggedIn ? <SalesPipelineView /> : <Navigate to="/login" />} />
                                                    <Route path="/megadashboard/developer/clitools" element={isLoggedIn ? <CliToolsView /> : <Navigate to="/login" />} />
                                                    <Route path="/megadashboard/developer/extensions" element={isLoggedIn ? <ExtensionsView /> : <Navigate to="/login" />} />
                                                    <Route path="/megadashboard/developer/sandbox" element={isLoggedIn ? <SandboxView /> : <Navigate to="/login" />} />
                                                    <Route path="/megadashboard/developer/sdkdownloads" element={isLoggedIn ? <SdkDownloadsView /> : <Navigate to="/login" />} />
                                                    <Route path="/megadashboard/developer/webhooks" element={isLoggedIn ? <WebhooksView /> : <Navigate to="/login" />} />
                                                    <Route path="/megadashboard/digitalassets/daogovernance" element={isLoggedIn ? <DaoGovernanceView /> : <Navigate to="/login" />} />
                                                    <Route path="/megadashboard/digitalassets/nftvault" element={isLoggedIn ? <NftVaultView /> : <Navigate to="/login" />} />
                                                    <Route path="/megadashboard/digitalassets/onchainanalytics" element={isLoggedIn ? <OnChainAnalyticsView /> : <Navigate to="/login" />} />
                                                    <Route path="/megadashboard/digitalassets/smartcontracts" element={isLoggedIn ? <SmartContractsView /> : <Navigate to="/login" />} />
                                                    <Route path="/megadashboard/digitalassets/tokenissuance" element={isLoggedIn ? <TokenIssuanceView /> : <Navigate to="/login" />} />
                                                    <Route path="/megadashboard/ecosystem/affiliates" element={isLoggedIn ? <AffiliatesView /> : <Navigate to="/login" />} />
                                                    <Route path="/megadashboard/ecosystem/crossborderpayments" element={isLoggedIn ? <CrossBorderPaymentsView /> : <Navigate to="/login" />} />
                                                    <Route path="/megadashboard/ecosystem/integrationsmarketplace" element={isLoggedIn ? <IntegrationsMarketplaceView /> : <Navigate to="/login" />} />
                                                    <Route path="/megadashboard/ecosystem/multicurrency" element={isLoggedIn ? <MultiCurrencyView /> : <Navigate to="/login" />} />
                                                    <Route path="/megadashboard/ecosystem/partnerhub" element={isLoggedIn ? <PartnerHubView /> : <Navigate to="/login" />} />
                                                    <Route path="/megadashboard/finance/cardmanagement" element={isLoggedIn ? <CardManagementView /> : <Navigate to="/login" />} />
                                                    <Route path="/megadashboard/finance/insurancehub" element={isLoggedIn ? <InsuranceHubView /> : <Navigate to="/login" />} />
                                                    <Route path="/megadashboard/finance/loanapplications" element={isLoggedIn ? <LoanApplicationsView /> : <Navigate to="/login" />} />
                                                    <Route path="/megadashboard/finance/mortgages" element={isLoggedIn ? <MortgagesView /> : <Navigate to="/login" />} />
                                                    <Route path="/megadashboard/finance/taxcenter" element={isLoggedIn ? <TaxCenterView /> : <Navigate to="/login" />} />
                                                    <Route path="/megadashboard/infra/apithrottling" element={isLoggedIn ? <ApiThrottlingView /> : <Navigate to="/login" />} />
                                                    <Route path="/megadashboard/infra/backuprecovery" element={isLoggedIn ? <BackupRecoveryView /> : <Navigate to="/login" />} />
                                                    <Route path="/megadashboard/infra/containerregistry" element={isLoggedIn ? <ContainerRegistryView /> : <Navigate to="/login" />} />
                                                    <Route path="/megadashboard/infra/incidentresponse" element={isLoggedIn ? <IncidentResponseView /> : <Navigate to="/login" />} />
                                                    <Route path="/megadashboard/infra/observability" element={isLoggedIn ? <ObservabilityView /> : <Navigate to="/login" />} />
                                                    <Route path="/megadashboard/regulation/consentmanagement" element={isLoggedIn ? <ConsentManagementView /> : <Navigate to="/login" />} />
                                                    <Route path="/megadashboard/regulation/disclosures" element={isLoggedIn ? <DisclosuresView /> : <Navigate to="/login" />} />
                                                    <Route path="/megadashboard/regulation/legaldocs" element={isLoggedIn ? <LegalDocsView /> : <Navigate to="/login" />} />
                                                    <Route path="/megadashboard/regulation/licensing" element={isLoggedIn ? <LicensingView /> : <Navigate to="/login" />} />
                                                    <Route path="/megadashboard/regulation/regulatorysandbox" element={isLoggedIn ? <RegulatorySandboxView /> : <Navigate to="/login" />} />
                                                    <Route path="/megadashboard/security/accesscontrols" element={isLoggedIn ? <AccessControlsView /> : <Navigate to="/login" />} />
                                                    <Route path="/megadashboard/security/auditlogs" element={isLoggedIn ? <AuditLogsView /> : <Navigate to="/login" />} />
                                                    <Route path="/megadashboard/security/frauddetection" element={isLoggedIn ? <FraudDetectionView /> : <Navigate to="/login" />} />
                                                    <Route path="/megadashboard/security/rolemanagement" element={isLoggedIn ? <RoleManagementView /> : <Navigate to="/login" />} />
                                                    <Route path="/megadashboard/security/threatintelligence" element={isLoggedIn ? <ThreatIntelligenceView /> : <Navigate to="/login" />} />
                                                    <Route path="/megadashboard/userclient/clientonboarding" element={isLoggedIn ? <ClientOnboardingView /> : <Navigate to="/login" />} />
                                                    <Route path="/megadashboard/userclient/feedbackhub" element={isLoggedIn ? <FeedbackHubView /> : <Navigate to="/login" />} />
                                                    <Route path="/megadashboard/userclient/kycaml" element={isLoggedIn ? <KycAmlView /> : <Navigate to="/login" />} />
                                                    <Route path="/megadashboard/userclient/supportdesk" element={isLoggedIn ? <SupportDeskView /> : <Navigate to="/login" />} />
                                                    <Route path="/megadashboard/userclient/userinsights" element={isLoggedIn ? <UserInsightsView /> : <Navigate to="/login" />} />

                                                    {/* Productivity Views - Requires Login */}
                                                    <Route path="/productivity/taskmatrix" element={isLoggedIn ? <TaskMatrixView /> : <Navigate to="/login" />} />

                                                    {/* Blueprint Views - Requires Login */}
                                                    <Route path="/blueprints/adaptiveuitailor" element={isLoggedIn ? <AdaptiveUITailorView /> : <Navigate to="/login" />} />
                                                    <Route path="/blueprints/aestheticengine" element={isLoggedIn ? <AestheticEngineView /> : <Navigate to="/login" />} />
                                                    <Route path="/blueprints/autonomousscientist" element={isLoggedIn ? <AutonomousScientistView /> : <Navigate to="/login" />} />
                                                    <Route path="/blueprints/careertrajectory" element={isLoggedIn ? <CareerTrajectoryView /> : <Navigate to="/login" />} />
                                                    <Route path="/blueprints/chaostheorist" element={isLoggedIn ? <ChaosTheoristView /> : <Navigate to="/login" />} />
                                                    <Route path="/blueprints/codearcheologist" element={isLoggedIn ? <CodeArcheologistView /> : <Navigate to="/login" />} />
                                                    <Route path="/blueprints/cognitiveloadbalancer" element={isLoggedIn ? <CognitiveLoadBalancerView /> : <Navigate to="/login" />} />
                                                    <Route path="/blueprints/crisaisimanager" element={isLoggedIn ? <CrisisAIManagerView /> : <Navigate to="/login" />} />
                                                    <Route path="/blueprints/culturalassimilationadvisor" element={isLoggedIn ? <CulturalAssimilationAdvisorView /> : <Navigate to="/login" />} />
                                                    <Route path="/blueprints/debateadversary" element={isLoggedIn ? <DebateAdversaryView /> : <Navigate to="/login" />} />
                                                    <Route path="/blueprints/dynamicsoundscapegenerator" element={isLoggedIn ? <DynamicSoundscapeGeneratorView /> : <Navigate to="/login" />} />
                                                    <Route path="/blueprints/emergentstrategywargamer" element={isLoggedIn ? <EmergentStrategyWargamerView /> : <Navigate to="/login" />} />
                                                    <Route path="/blueprints/etherealmarketplace" element={isLoggedIn ? <EtherealMarketplaceView /> : <Navigate to="/login" />} />
                                                    <Route path="/blueprints/ethicalgovernor" element={isLoggedIn ? <EthicalGovernorView /> : <Navigate to="/login" />} />
                                                    <Route path="/blueprints/generativejurisprudence" element={isLoggedIn ? <GenerativeJurisprudenceView /> : <Navigate to="/login" />} />
                                                    <Route path="/blueprints/holographicmeetingscribe" element={isLoggedIn ? <HolographicMeetingScribeView /> : <Navigate to="/login" />} />
                                                    <Route path="/blueprints/hypothesisengine" element={isLoggedIn ? <HypothesisEngineView /> : <Navigate to="/login" />} />
                                                    <Route path="/blueprints/lexiconclarifier" element={isLoggedIn ? <LexiconClarifierView /> : <Navigate to="/login" />} />
                                                    <Route path="/blueprints/linguisticfossilfinder" element={isLoggedIn ? <LinguisticFossilFinderView /> : <Navigate to="/login" />} />
                                                    <Route path="/blueprints/ludicbalancer" element={isLoggedIn ? <LudicBalancerView /> : <Navigate to="/login" />} />
                                                    <Route path="/blueprints/narrativeforge" element={isLoggedIn ? <NarrativeForgeView /> : <Navigate to="/login" />} />
                                                    <Route path="/blueprints/personalhistorianai" element={isLoggedIn ? <PersonalHistorianAIView /> : <Navigate to="/login" />} />
                                                    <Route path="/blueprints/quantumentanglementdebugger" element={isLoggedIn ? <QuantumEntanglementDebuggerView /> : <Navigate to="/login" />} />
                                                    <Route path="/blueprints/quantumproofencryptor" element={isLoggedIn ? <QuantumProofEncryptorView /> : <Navigate to="/login" />} />
                                                    <Route path="/blueprints/selfrewritingcodebase" element={isLoggedIn ? <SelfRewritingCodebaseView /> : <Navigate to="/login" />} />
                                                    <Route path="/blueprints/sonicalchemy" element={isLoggedIn ? <SonicAlchemyView /> : <Navigate to="/login" />} />
                                                    <Route path="/blueprints/urbansymphonyplanner" element={isLoggedIn ? <UrbanSymphonyPlannerView /> : <Navigate to="/login" />} />
                                                    <Route path="/blueprints/worldbuilder" element={isLoggedIn ? <WorldBuilderView /> : <Navigate to="/login" />} />
                                                    <Route path="/blueprints/zeitgeistengine" element={isLoggedIn ? <ZeitgeistEngineView /> : <Navigate to="/login" />} />

                                                </Routes>
                                            </Suspense>
                                        )}
                                    </StripeDataContext.Consumer>
                                )}
                            </PlaidContext.Consumer>
                        )}
                    </AppContext.Consumer>
                )}
            </AuthContext.Consumer>
        </Router>
    );
};

export default AppRouter;