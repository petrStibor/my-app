import { useMemo } from 'react'
import { Entity } from '../types'

type ChartData = {
    textCount: { name: string; value: number }[]
    confidenceScores: { name: string; value: number }[]
    relevanceScores: { name: string; value: number }[]
}

const useChartData = (entities: Entity[], selectedEntity: Entity | null): ChartData => {
    return useMemo(() => {
        if (selectedEntity) {
            const { matchedText } = selectedEntity
            if (!matchedText) {
                return {
                    textCount: [],
                    confidenceScores: [],
                    relevanceScores: [],
                }
            }

            const filteredData = entities.filter((e) => e.matchedText === matchedText)

            return {
                textCount: [
                    {
                        name: matchedText,
                        value: filteredData.length,
                    },
                ],
                confidenceScores: filteredData.map((item) => ({
                    name: item.matchedText || 'Unknown',
                    value: item.confidenceScore || 0,
                })),
                relevanceScores: filteredData.map((item) => ({
                    name: item.matchedText || 'Unknown',
                    value: item.relevanceScore || 0,
                })),
            }
        }
        return {
            textCount: [],
            confidenceScores: [],
            relevanceScores: [],
        }
    }, [selectedEntity, entities])
}

export default useChartData
