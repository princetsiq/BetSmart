import React from "react";
import TeamCard from "../TeamCard";
import heat from "../../assets/image.png";
import "./FollowedPage.css";
import AnimatedButton from "../AnimatedButton";

function FollowedPage() {
  const placeholderDesc =
    "This is the card description. Your details will go here!";

  const pLink =
    "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.si.com%2Ffannation%2Fnba%2Ffastbreak%2Fex-miami-heat-star-victor-oladipo-reacts-to-tyler-herro-instagram-post&psig=AOvVaw1wcDI36aN3N39DwZ1qEn3v&ust=1721510356964000&source=images&cd=vfe&opi=89978449&ved=0CBUQjhxqFwoTCOiIlPCDtIcDFQAAAAAdAAAAABAJ";

  return (
    <div className="followedPage">
      <TeamCard
        img={heat}
        title="Miami Heat"
        description={placeholderDesc}
        link={pLink}
      />
      <TeamCard
        img={heat}
        title="Miami Heat"
        description={placeholderDesc}
        link={pLink}
      />
      <TeamCard img={heat} title="Miami Heat" description={placeholderDesc} />
      <AnimatedButton></AnimatedButton>
    </div>
  );
}

export default FollowedPage;
