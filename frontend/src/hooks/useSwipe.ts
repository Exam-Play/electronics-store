import { useRef } from 'react'
import type React from 'react'

export function useSwipe(
	onSwipeLeft: () => void,
	onSwipeRight: () => void,
	threshold = 50
) {
	const start = useRef<{ x: number; y: number } | null>(null)

	return {
		onPointerDown(e: React.PointerEvent) {
			if (e.pointerType === 'mouse') return
			start.current = { x: e.clientX, y: e.clientY }
		},

		onPointerUp(e: React.PointerEvent) {
			if (!start.current) return

			const dx = e.clientX - start.current.x
			const dy = e.clientY - start.current.y
			start.current = null

			if (Math.abs(dx) < threshold || Math.abs(dx) < Math.abs(dy)) return

			if (dx < 0) onSwipeLeft()
			else onSwipeRight()
		},

		onPointerCancel() {
			start.current = null
		},
	}
}