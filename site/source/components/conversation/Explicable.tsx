import { EngineContext } from '@/components/utils/EngineContext'
import { Markdown } from '@/components/utils/markdown'
import ButtonHelp from '@/design-system/buttons/ButtonHelp'
import { DottedName } from 'modele-social'
import { useContext } from 'react'

export function ExplicableRule<Names extends string = DottedName>({
	dottedName,
	light,
	bigPopover,
}: {
	dottedName: Names
	light?: boolean
	bigPopover?: boolean
}) {
	const engine = useContext(EngineContext)

	// Rien à expliquer ici, ce n'est pas une règle
	if (dottedName == null) {
		return null
	}
	const rule = engine.getRule(dottedName)

	if (rule.rawNode.description == null) {
		return null
	}

	// TODO montrer les variables de type 'une possibilité'

	return (
		<span className="print-hidden">
			<ButtonHelp
				key={rule.dottedName}
				type="info"
				title={rule.title}
				light={light}
				bigPopover={bigPopover}
			>
				<Markdown>{rule.rawNode.description}</Markdown>
			</ButtonHelp>
		</span>
	)
}
