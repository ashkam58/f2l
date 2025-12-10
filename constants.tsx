import { StepMap } from './types';

export const INITIAL_STEP_ID = 'START';

// Helper to generate placeholder URLs
const getImg = (text: string, bgColor: string, textColor: string = '000000') => 
  `https://placehold.co/600x350/${bgColor}/${textColor}/png?text=${encodeURIComponent(text)}&font=montserrat`;

export const FLOW_STEPS: StepMap = {
  [INITIAL_STEP_ID]: {
    id: INITIAL_STEP_ID,
    title: "Let's Start F2L!",
    description: "Welcome to Ashkam Intelligent Studios' guide to BrodytheCuber's F2L Flowchart. We will solve the First 2 Layers.",
    imageType: 'start',
    imageUrl: getImg('Ready to Solve?', 'FFD500'),
    tip: "Find a corner piece and an edge piece that belong together.",
    options: [
      { label: "I found a pair!", nextStepId: 'CHECK_TOP_LAYER' }
    ]
  },
  'CHECK_TOP_LAYER': {
    id: 'CHECK_TOP_LAYER',
    title: "Step 1: Position Check",
    description: "Look at your pair. Are BOTH pieces currently in the top layer?",
    imageType: 'question',
    imageUrl: getImg('Are both on top?', 'FFFFFF'),
    options: [
      { label: "Yes, both on top", nextStepId: 'CHECK_CONNECTED' },
      { label: "No", nextStepId: 'MOVE_TO_TOP', variant: 'secondary' }
    ]
  },
  'MOVE_TO_TOP': {
    id: 'MOVE_TO_TOP',
    title: "Move to Top",
    description: "Move the pieces into the top layer using this move.",
    imageType: 'action',
    imageUrl: getImg('R U\' R\'', '009CDA', 'FFFFFF'),
    algorithm: "R U' R'",
    tip: "Be careful not to mess up your solved cross!",
    options: [
      { label: "Done, they are on top", nextStepId: 'CHECK_CONNECTED' }
    ]
  },
  'CHECK_CONNECTED': {
    id: 'CHECK_CONNECTED',
    title: "Are they connected?",
    description: "Are the corner and edge pieces touching (connected), but with the WRONG colors matching?",
    imageType: 'question',
    imageUrl: getImg('Connected?', 'FFFFFF'),
    options: [
      { label: "Yes, connected wrong", nextStepId: 'SETUP_SLOT' },
      { label: "No, they are separate", nextStepId: 'CHECK_WHITE_UP' }
    ]
  },
  'SETUP_SLOT': {
    id: 'SETUP_SLOT',
    title: "Setup the Slot",
    description: "Put the pair's target slot into the FRONT-RIGHT position. Move the corner over the slot.",
    imageType: 'action',
    imageUrl: getImg('Setup Slot', '009CDA', 'FFFFFF'),
    options: [
      { label: "Ready", nextStepId: 'CHECK_SEPARATION_SIDE' }
    ]
  },
  'CHECK_SEPARATION_SIDE': {
    id: 'CHECK_SEPARATION_SIDE',
    title: "Left or Right?",
    description: "Look at the top layer. Is the edge piece to the LEFT or the RIGHT of the corner?",
    imageType: 'question',
    imageUrl: getImg('Edge Left or Right?', 'FFFFFF'),
    options: [
      { label: "To the Right", nextStepId: 'SEPARATE_RIGHT' },
      { label: "To the Left", nextStepId: 'SEPARATE_LEFT' }
    ]
  },
  'SEPARATE_RIGHT': {
    id: 'SEPARATE_RIGHT',
    title: "Separate Pieces",
    description: "Use this algorithm to separate the pieces.",
    imageType: 'action',
    imageUrl: getImg('U\' R U\' R\'', '009CDA', 'FFFFFF'),
    algorithm: "U' R U' R'",
    options: [
      { label: "Separated!", nextStepId: 'CHECK_WHITE_UP' }
    ]
  },
  'SEPARATE_LEFT': {
    id: 'SEPARATE_LEFT',
    title: "Separate Pieces",
    description: "Use this algorithm to separate the pieces.",
    imageType: 'action',
    imageUrl: getImg('y U L\' U L', '009CDA', 'FFFFFF'),
    algorithm: "y U L' U L",
    tip: "'y' means rotate the whole cube clockwise.",
    options: [
      { label: "Separated!", nextStepId: 'CHECK_WHITE_UP' }
    ]
  },
  'CHECK_WHITE_UP': {
    id: 'CHECK_WHITE_UP',
    title: "Step 2: White Sticker",
    description: "Look at the corner piece. Is the WHITE sticker facing UP?",
    imageType: 'question',
    imageUrl: getImg('White Facing Up?', 'FFFFFF'),
    options: [
      { label: "Yes, facing Up", nextStepId: 'SOLVE_WHITE_UP_1' },
      { label: "No", nextStepId: 'PREP_COLORS' }
    ]
  },
  'SOLVE_WHITE_UP_1': {
    id: 'SOLVE_WHITE_UP_1',
    title: "Match Side Color",
    description: "Move the edge so its side color matches the center color.",
    imageType: 'action',
    imageUrl: getImg('Match Edge Color', '009CDA', 'FFFFFF'),
    options: [
      { label: "Matched", nextStepId: 'SOLVE_WHITE_UP_2' }
    ]
  },
  'SOLVE_WHITE_UP_2': {
    id: 'SOLVE_WHITE_UP_2',
    title: "Move Away",
    description: "Move the edge AWAY from its slot.",
    imageType: 'action',
    imageUrl: getImg('Move Edge Away', '009CDA', 'FFFFFF'),
    options: [
      { label: "Done", nextStepId: 'SOLVE_WHITE_UP_3' }
    ]
  },
  'SOLVE_WHITE_UP_3': {
    id: 'SOLVE_WHITE_UP_3',
    title: "Pair & Insert",
    description: "Move the corner over the edge. Then move the edge back to the top layer.",
    imageType: 'success',
    imageUrl: getImg('Pair & Insert!', '009B48', 'FFFFFF'),
    algorithm: "Insert #1 Complete!",
    options: [
      { label: "Next Pair", nextStepId: 'START', variant: 'primary' }
    ]
  },
  'PREP_COLORS': {
    id: 'PREP_COLORS',
    title: "Check Top Colors",
    description: "Move the U layer until you can see the white sticker. Are the TOP colors of the corner and edge the SAME or DIFFERENT?",
    imageType: 'question',
    imageUrl: getImg('Same or Diff Colors?', 'FFFFFF'),
    options: [
      { label: "Same Colors", nextStepId: 'SOLVE_SAME_1' },
      { label: "Different Colors", nextStepId: 'SOLVE_DIFF_1' }
    ]
  },
  'SOLVE_SAME_1': {
    id: 'SOLVE_SAME_1',
    title: "Hide the Corner",
    description: "Turn the layer where the white sticker is to move the corner into the BOTTOM layer (Hide it).",
    imageType: 'action',
    imageUrl: getImg('Hide Corner', '009CDA', 'FFFFFF'),
    options: [
      { label: "Hidden", nextStepId: 'SOLVE_SAME_2' }
    ]
  },
  'SOLVE_SAME_2': {
    id: 'SOLVE_SAME_2',
    title: "Pair It",
    description: "Move the edge NEXT TO where the corner was. Then bring the corner back up.",
    imageType: 'success',
    imageUrl: getImg('Pair & Insert!', '009B48', 'FFFFFF'),
    algorithm: "Insert #1 Complete!",
    options: [
      { label: "Next Pair", nextStepId: 'START', variant: 'primary' }
    ]
  },
  'SOLVE_DIFF_1': {
    id: 'SOLVE_DIFF_1',
    title: "Hide the Corner",
    description: "Turn the layer where the white sticker is to move the corner into the BOTTOM layer (Hide it).",
    imageType: 'action',
    imageUrl: getImg('Hide Corner', '009CDA', 'FFFFFF'),
    options: [
      { label: "Hidden", nextStepId: 'SOLVE_DIFF_2' }
    ]
  },
  'SOLVE_DIFF_2': {
    id: 'SOLVE_DIFF_2',
    title: "Pair It",
    description: "Move the edge ACROSS from where the corner was. Then bring the corner back up.",
    imageType: 'success',
    imageUrl: getImg('Pair & Insert!', '009B48', 'FFFFFF'),
    algorithm: "Insert #2 Complete!",
    options: [
      { label: "Next Pair", nextStepId: 'START', variant: 'primary' }
    ]
  },
};