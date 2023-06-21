import { Trans, useTranslation } from 'react-i18next'
import styled from 'styled-components'

import RuleLink from '@/components/RuleLink'
import { ExternalLinkIcon } from '@/design-system/icons'
import { H2 } from '@/design-system/typography/heading'
import { StyledLink } from '@/design-system/typography/link'
import { Body } from '@/design-system/typography/paragraphs'

import { getBestOption, OptionType } from '../utils'
import { EngineComparison } from './Comparateur'

const RevenuAprèsImpot = ({
	namedEngines,
}: {
	namedEngines: EngineComparison
}) => {
	const [assimiléEngine, autoEntrepreneurEngine, indépendantEngine] =
		namedEngines
	const { t } = useTranslation()
	const options = namedEngines.map(({ engine, name }) => ({
		engine,
		name,
		value: engine.evaluate({
			valeur: 'dirigeant . rémunération . net . après impôt',
			unité: '€/mois',
		}).nodeValue,
	})) as [OptionType, OptionType, OptionType]

	const bestOption = getBestOption(options)

	return (
		<>
			<H2>
				<Trans>Revenu après impôt</Trans>
			</H2>
			{/* 
			<Grid container spacing={4}>
				<Grid item xs={12} lg={4}>
					<StatusCard
						statut={['SASU']}
						isBestOption={bestOption === 'SASU'}
						footerContent={
							<CheckList
								items={[
									{
										isChecked: assimiléEngine.evaluate({
											valeur: 'dirigeant . exonérations . ACRE',
										}).nodeValue as boolean,
										label: assimiléEngine.evaluate({
											valeur: 'dirigeant . exonérations . ACRE',
										}).nodeValue
											? t("Tient compte de l'ACRE")
											: t("Ne prend pas l'ACRE en compte"),
									},
									{
										isChecked: true,
										label: t("Choix d'imposition : impôt sur les sociétés"),
									},
								]}
							/>
						}
					>
						<span>
							<Value
								linkToRule={false}
								expression="dirigeant . rémunération . net . après impôt"
								engine={assimiléEngine}
								precision={0}
								unit="€/mois"
							/>{' '}
							<Condition
								engine={assimiléEngine}
								expression="dirigeant . exonérations . ACRE"
							>
								<WhenAlreadyDefined
									dottedName="dirigeant . rémunération . net . après impôt"
									engine={assimiléEngine}
								>
									<Trans>la première année</Trans>
								</WhenAlreadyDefined>
							</Condition>
						</span>
						<StyledRuleLink
							dottedName="dirigeant . rémunération . net . après impôt"
							engine={assimiléEngine}
							documentationPath="/simulateurs/comparaison-régimes-sociaux/SASU"
						>
							<HelpIcon />
						</StyledRuleLink>
					</StatusCard>
				</Grid>

				<Grid item xs={12} lg={4}>
					<StatusCard
						statut={['EI']}
						isBestOption={bestOption === 'ei'}
						footerContent={
							<CheckList
								items={[
									{
										isChecked: indépendantEngine.evaluate({
											valeur: 'dirigeant . exonérations . ACRE',
										}).nodeValue as boolean,
										label: indépendantEngine.evaluate({
											valeur: 'dirigeant . exonérations . ACRE',
										}).nodeValue
											? t("Tient compte de l'ACRE")
											: t("Ne prend pas l'ACRE en compte"),
									},
									{
										isChecked: true,
										label:
											indépendantEngine.evaluate({
												valeur: 'entreprise . imposition',
											}).nodeValue === 'IS'
												? t("Choix d'imposition : impôt sur les sociétés")
												: t("Choix d'imposition : impôt sur le revenu"),
									},
								]}
							/>
						}
					>
						<span>
							<Value
								linkToRule={false}
								expression="dirigeant . rémunération . net . après impôt"
								engine={indépendantEngine}
								precision={0}
								unit="€/mois"
							/>{' '}
							<Condition
								engine={indépendantEngine}
								expression="dirigeant . exonérations . ACRE"
							>
								<WhenAlreadyDefined
									dottedName="dirigeant . rémunération . net . après impôt"
									engine={indépendantEngine}
								>
									<Trans>la première année</Trans>
								</WhenAlreadyDefined>
							</Condition>
						</span>
						<StyledRuleLink
							dottedName="dirigeant . rémunération . net . après impôt"
							engine={indépendantEngine}
							documentationPath="/simulateurs/comparaison-régimes-sociaux/EI"
						>
							<HelpIcon />
						</StyledRuleLink>
					</StatusCard>{' '}
				</Grid>

				<Grid item xs={12} lg={4}>
					<StatusCard
						statut={['AE']}
						isBestOption={bestOption === 'ae'}
						footerContent={
							<CheckList
								items={[
									{
										isChecked: autoEntrepreneurEngine.evaluate({
											valeur: 'dirigeant . exonérations . ACRE',
										}).nodeValue as boolean,
										label: (
											<Trans i18nKey="revenu_après_impots.acre">
												<span>
													ACRE sous{' '}
													<BlackColoredLink href="https://www.urssaf.fr/portail/home/independant/je-beneficie-dexonerations/accre.html">
														certaines conditions
														<StyledExternalLinkIcon />
													</BlackColoredLink>
												</span>
											</Trans>
										),
									},
									{
										isChecked: autoEntrepreneurEngine.evaluate({
											valeur:
												'dirigeant . auto-entrepreneur . impôt . versement libératoire',
										}).nodeValue as boolean,
										label: t("Versement libératoire de l'impôt sur le revenu"),
									},
								]}
							/>
						}
					>
						<Value
							linkToRule={false}
							expression="dirigeant . rémunération . net . après impôt"
							engine={autoEntrepreneurEngine}
							precision={0}
							unit="€/mois"
						/>
						<Condition
							engine={autoEntrepreneurEngine}
							expression="dirigeant . exonérations . ACRE"
						>
							<WhenAlreadyDefined
								dottedName="dirigeant . rémunération . net . après impôt"
								engine={assimiléEngine}
							>
								<span
									css={`
										margin-left: 0.25rem;
									`}
								>
									<Trans>la première année</Trans>
								</span>
							</WhenAlreadyDefined>
						</Condition>
						<StyledRuleLink
							dottedName="dirigeant . rémunération . net . après impôt"
							engine={autoEntrepreneurEngine}
							documentationPath="/simulateurs/comparaison-régimes-sociaux/auto-entrepreneur"
						>
							<HelpIcon />
						</StyledRuleLink>
						<Condition
							engine={autoEntrepreneurEngine}
							expression="entreprise . chiffre d'affaires . seuil micro . dépassé"
						>
							<WarningTooltip
								tooltip={
									<StyledBody id="warning-ae-tooltip">
										<Trans>
											Vous allez dépasser le plafond de la micro-entreprise
										</Trans>{' '}
										<span>
											(
											<Value
												linkToRule={false}
												displayedUnit="€"
												expression={
													String(
														autoEntrepreneurEngine.evaluate(
															'entreprise . activité . nature'
														).nodeValue
													) === 'libérale'
														? "entreprise . chiffre d'affaires . seuil micro . libérale"
														: "entreprise . chiffre d'affaires . seuil micro . total"
												}
											/>{' '}
											<Trans>de chiffre d’affaires</Trans>).
										</span>
									</StyledBody>
								}
								id="tooltip-ae"
							/>
						</Condition>
					</StatusCard>
				</Grid>
			</Grid>
			<DivAlignRight>
				<AllerPlusLoinRevenus engines={engines} />
			</DivAlignRight> */}
		</>
	)
}

export default RevenuAprèsImpot

const StyledRuleLink = styled(RuleLink)`
	display: inline-flex;
	margin-left: 0.15rem;
	&:hover {
		opacity: 0.8;
	}
`

const StyledExternalLinkIcon = styled(ExternalLinkIcon)`
	margin-left: 0.25rem;
`

const BlackColoredLink = styled(StyledLink)`
	color: ${({ theme }) => theme.colors.extended.grey[800]};
`

const DivAlignRight = styled.div`
	margin-top: ${({ theme }) => theme.spacings.lg};
	text-align: right;
`

const StyledBody = styled(Body)`
	color: ${({ theme }) => theme.colors.extended.grey[100]}!important;
`
