// PoemsPage.tsx
import React from 'react';

// Reusable Section Component, similar to what you've provided
interface SectionProps {
  title: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, children }) => (
  <div className="grid place-content-center bg-gray-800 text-white rounded-lg p-6 mb-8 w-2/5 max-w-4xl">
    <h2 className="text-2xl font-bold mb-4">{title}</h2>
    {children}
  </div>
);

const Header: React.FC = () => (
  <header className="text-white rounded-lg p-6 mb-8 w-full max-w-4xl text-center">
    <h1 className="text-3xl font-bold">Poems by Cameron Smart</h1>
    <p className="text-xl">A Pineful Collection</p>
  </header>
);

interface PoemSectionProps {
  title: string;
  poem: string;
}

const PoemSection: React.FC<PoemSectionProps> = ({ title, poem }) => (
  
  <Section title={title}>
    <pre className="whitespace-pre-wrap">{poem}</pre>
  </Section>
);

// Main Poems Page Component
export const Poetry: React.FC = () => {
  return (
    <div className="flex flex-col items-center my-8">
      <Header />
      <PoemSection title="0" poem={`
My bliss is found below a well so deep
No sound escapes as I throw a quarter.
So through silent dreams will my wish still sleep
Until joy echos past brick and mortar.
Released into the sky, spread far and wide,
So sharp the air it leaves me breathless.
I close my lips to feel heartbeats inside.
And, gasp, with that release I feel deathless.
Where did I find this great phenomenon? 
Atop high hills, perhaps, a spring bubbles,
Or from an aquifer this glee is drawn.
More like a river that smooths down troubles
  And rolls over all thoughts that block it’s route
  To flood my brain and drown all sorrow out.
      `} />
        <PoemSection title="1" poem={`
Your hands are hot, they’re strong though softly lean,
But I would like to know your fingers more.
Your mind is deep; melancholy, yet kean,
Steeped with hidden scenes I may ne’er adore.
Although I have no sight into your soul,
Upon me scleras shine and pupils sheen.
Eyebrows shall I still study to extol
The mystery shadowed behind your mien.
As short days grow so cold the wind does bite,
Your thoughts to me could keep such things away.
Your hands would heat, eyelids defuse soft light
So in pleasure our fingers would array.
  Together in this warmth we could grow close
  And learn our quirks that are less grandiose.
      `} />
        <PoemSection title="2" poem={`
The Douglas Fir grows three hundred feet tall. 
Stomata drawing water from the ground,
Needles photosynthesize then they fall
Thus leaves turn to humus without a sound. 
Trees so tall sometimes are struck by lightning.
In sappy fire they crackle and pop.
Steam explodes, like the heart’s enlightening
To glorious nature that burns nonstop.
In death the tree will give its life away;
A nitrogen footprint left in the earth.
Breath to fire to ash, this is life's way.
There is time for fury before rebirth.
  In order to view such an awesome sight
  Walk through the storm beneath the plasmic light.
      `} />
        <PoemSection title="3" poem={`
Far memories of a final embrace;
Affirmation in an uneven dream;
Intangible at a mistaken pace;
Excusable for their nostalgic theme.
Traveling in search of obscuring thoughts
That restore those times of lost completion.
Rummaging the mind for subconscious plots
To expose blocked acts of glum deletion.
Again these memories are forgotten
By those of us who cannot bare their rush,
But such warm feelings once begotten 
Are hotter felt remembered in a blush.
  As thoughts of past hours bring soft spikes of pain
  These gentle dreams I shall always retain.
    `} />
        <PoemSection title="4" poem={`
There are clouds above the clouds above me,
But light to earth is far from being dimmed. 
Tides will turn below the sea below me.
So to the wind my mainsail will be trimmed.
The sun may shift for the rain must fall
But out at sea I am already wet.
“Drop the sails!” Through the storm the mast stands tall.
And in passing the compass is reset.
Now I face the weather; my boat must beat
Silent fears of being scuttled and drowned.
Those windless days seem far less incomplete
Next to death below the waves, void of sound.
  One day the wind will blow some other way.
  I'll catch that gust and sail another day.
    `} /> 
        <PoemSection title="5" poem={`
Embellished light casts shadows from it's beam,
A timeless particle seen only now
I felt it slowly wave into a dream
To brighten thoughts I need not disallow.
Silhouetted beneath a street lamp light
Memories link directly to the heart
Those facial features obscured from my sight
Cast deeper shadows in the night time dark.
Such is life that when happiness is found,
Far fonder dreams are able to be dreamt
In which chains form from promises that bound
Away from sight the feelings I lament.
  But that particle beam shall not zoom past
  In striking me it's light forever lasts.
    `} /> 
        <PoemSection title="6" poem={`
Saplings, forest dirt, warm winds, narrow trail
To craggy cliffs where ancient trees weave spells.
Those far off hills, hazy in pollen’s veil,
Hide wonders beneath their vibrant pastels. 

Bent bows, diffused light, moss snap, further sight
Of fractal ferns where fairies like to dance.
As tall shadows flee from a fae twilight
I trek past magic in a private trance.

A silvan figure across Walden's pond
A misty face to instill waking dreams
And so we walked into a cresting dawn
And so I find myself alone it seems.
    `} /> 
        <PoemSection title="On Not Giving Her the Flowers" poem={`
Another bouquet for no one
Words written like leaves in the wind
Feelings remain rooted, unbroken
And the sun still scorches within

A vibrant melt towards vermillion
As leaves are meant to decay
Lost to time are words left unspoken
As summer passes again

Field at edge of the ocean
Salt air unseen on the breeze
Tides shall give hope with their motion
As flowers fall to the sea

Winter brings cold decisions
Relinquishing life to the ground
No flowers are picked by the smitten
When emotion first must be found

Another bright field of blossoms 
A beautiful spring in the mind
She blooms in the words yet unwritten
That light still reveals inside
    `} /> 
        <PoemSection title="To a Rat" poem={`
Wee, splatted, dusty, roadkill beastie,
Oh, how so flat is your breastie!
Thou tried to run oh so hasty,
With a quick little dart.
I am sad to walk up and find thee
Beneath a tire mark.
    
It’s pretty sad human dominion
Has really fucked up natural union,
And puts me in this situation
Where tons of rat traps,
I know are cruel, are the solution
To all the rat crap.
    `} /> 
            <PoemSection title="Smile" poem={`
A bright smile hides her thoughts unsaid,
Afflicting throbs upon my soul,
About my heart, into my head,
I wonder what those green eyes meant.
Her stylish garb, one must extol,
Upon her glance, a face goes red.
Internal zeal explains this toll,
External grace is what I dreamt.

Touching hands, they set the pace,
Spinning feet across the floor.
Turning, gliding, through the space,
Leading hope to be embraced.
Turn abroad, your cheeks restore
Warmth in waves across my face.
Gone the steps I've learned before
Worrying that I'll trip in haste.
    `} /> 
            <PoemSection title="Silence" poem={`
Silent smile and eyes that gleam
Sunlit hair breaks reverie
Siphoned notions to escape
Secretly thoughts ne’er abate

Wisely walk away from wiles
Wistful thoughts of what’s beneath
Wonder what rewards these smiles
Whisper words that seek release

Sudden smile, again entranced
Swivel from slim elegance
Sunder siphon, now a flood
Shimmer between lust and love

Forgetting feelings formed in haste
Forging friendship in their place
Figments in a confused mind
Finding prose to fill the time
    `} /> 
    </div>
  );
};
